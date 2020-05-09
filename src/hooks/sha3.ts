import { Ref, computed } from 'vue'

import createHash from 'keccak'

export function useSha3 (message: Ref<string>) {
  const keccak256 = computed(() => {
    return createHash('keccak256').update(message.value).digest()
  })
  return { keccak256 }
}

export function usePrefix (message: Ref<string>) {
  const length = computed(() => Buffer.from(message.value).length)
  const messageWithPrefix = computed(() => `\x19Ethereum Signed Message:\n${length.value}${message.value}`)
  return messageWithPrefix
}
