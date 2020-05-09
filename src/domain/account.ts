import { privateKeyVerify, publicKeyCreate, ecdsaSign, ecdsaRecover, ecdsaVerify } from 'secp256k1'
import { randomBytes } from 'crypto'

import createHash from 'keccak'

import { Signature } from './signature'

export class Address {
  public readonly buffer: Buffer;
  constructor (buffer: Buffer) {
    this.buffer = buffer
  }

  static fromPublicKey (publicKey: Buffer): Address {
    return new Address(createHash('keccak256').update(publicKey).digest())
  }

  toString () {
    return this.buffer.toString('hex')
  }
}

export class Account {
  public readonly privateKey: Buffer;
  constructor () {
    this.privateKey = this.generatePrivateKey()
  }

  public get publicKey () {
    return Buffer.from(publicKeyCreate(this.privateKey, false)).slice(1)
  }

  public get address () {
    return Address.fromPublicKey(this.publicKey)
  }

  public sign (digest: Buffer): Signature {
    const { signature, recid } = ecdsaSign(Uint8Array.from(digest), Uint8Array.from(this.privateKey))
    return Signature.fromRSV(
      Buffer.from(signature).slice(0, 32),
      Buffer.from(signature).slice(32),
      recid + 27
    )
  }

  public static recover (digest: Buffer, signature: Signature): Buffer {
    const buf = Buffer.concat([signature.r, signature.s])
    const publicKey = ecdsaRecover(Uint8Array.from(buf), (signature.v + 1) % 2, Uint8Array.from(digest), false).slice(1)

    return Buffer.from(publicKey)
  }

  private generatePrivateKey () {
    // TODO: promise 化
    let privateKey: Buffer
    do {
      privateKey = randomBytes(32)
    } while (!privateKeyVerify(privateKey))

    return privateKey
  }
}
