import { ref, computed, reactive, toRefs } from 'vue'

import { Account } from '@/domain/account'

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
  return { account: toRefs(account), replacePrivateKey }
}
