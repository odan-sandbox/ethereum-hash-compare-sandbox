const { randomBytes } = require('crypto')
const secp256k1 = require('secp256k1')
// or require('secp256k1/elliptic')
//   if you want to use pure js implementation in node

// generate message to sign
// message should have 32-byte length, if you have some other length you can hash message
// for example `msg = sha256(rawMessage)`
const msg = Buffer.from('c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470', 'hex')

// generate privKey
let privKey
do {
  privKey = randomBytes(32)
} while (!secp256k1.privateKeyVerify(privKey))

// get the public key in a compressed format
const pubKey = secp256k1.publicKeyCreate(privKey, false)
console.log(pubKey)

// sign the message
const sigObj = secp256k1.ecdsaSign(msg, privKey)

// verify the signature
console.log(secp256k1.ecdsaRecover(sigObj.signature, sigObj.recid, msg, false))
// => true
