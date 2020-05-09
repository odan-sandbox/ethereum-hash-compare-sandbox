import { ref, computed, reactive, toRefs } from 'vue'

import { Account, Address } from '@/domain/account'
import { Signature } from '@/domain/signature'

export function useAccount () {
  const accountInstance = ref(new Account())
  const account = reactive({
    address: computed(() => accountInstance.value.address),
    publicKey: computed(() => accountInstance.value.publicKey),
    privateKey: computed(() => accountInstance.value.privateKey)
  })
  function replacePrivateKey () {
    accountInstance.value = new Account()
  }
  function sign (digest: Buffer) {
    const signature = accountInstance.value.sign(digest)
    return ref(signature.buffer)
  }
  function recover (digest: Buffer, signature: Buffer) {
    const publicKey = Account.recover(digest, new Signature(signature))
    return ref(Address.fromPublicKey(publicKey).buffer)
  }
  return { account: toRefs(account), replacePrivateKey, sign, recover }
}
