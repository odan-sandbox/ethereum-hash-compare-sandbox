import { Ref, computed, reactive } from 'vue'

import createHash from 'keccak'

export function useSha3 (message: Ref<string>) {
  const keccak256 = computed(() => {
    return createHash('keccak256').update(message.value).digest('hex')
  })
  const value = reactive([
    { type: 'keccak256', value: keccak256 }
  ])
  return value
}
