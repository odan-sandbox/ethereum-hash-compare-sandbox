<script lang="ts">
import { ref, computed } from 'vue'
import { useSha3, usePrefix } from '@/hooks/sha3'
import { useAccount } from '@/hooks/account'

export default {
  name: 'Home',
  setup () {
    const message = ref('')
    const hash = useSha3(message)
    const messageWithPrefix = usePrefix(message)
    const hashWithPrefix = useSha3(messageWithPrefix)

    const { account, replacePrivateKey, sign, recover } = useAccount()
    const address = computed(() => account.address.value.toString())
    const signature = computed(() => sign(hash.keccak256.value).value.toString('hex'))
    const recoveredAddress = computed(() => recover(hash.keccak256.value, Buffer.from(signature.value, 'hex')).value.toString('hex'))

    return { message, hash, hashWithPrefix, messageWithPrefix, address, replacePrivateKey, signature, recoveredAddress }
  }
}
</script>

<template>
  <div class="home">
    <input
      id=""
      v-model="message"
      type="text"
      name=""
    >
    <div>{{ hash }}</div>
    <div>{{ messageWithPrefix }}</div>
    <div>{{ hashWithPrefix }}</div>
    <div>address: {{ address }}</div>
    <button @click="replacePrivateKey">
      click
    </button>
    <div>signature: {{ signature }}</div>
    <div>recoveredAddress: {{ recoveredAddress }}</div>

    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >
  </div>
</template>
