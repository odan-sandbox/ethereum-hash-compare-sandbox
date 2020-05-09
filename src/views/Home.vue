<script lang="ts">
import { ref, computed } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
import { useSha3, usePrefix } from '@/hooks/sha3'
import { useAccount } from '@/hooks/account'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  setup () {
    const message = ref('')
    const hash = useSha3(message)
    const messageWithPrefix = usePrefix(message)
    const hashWithPrefix = useSha3(messageWithPrefix)

    const { account, replacePrivateKey } = useAccount()
    const address = computed(() => account.address.value.toString())

    return { message, hash, hashWithPrefix, messageWithPrefix, address, replacePrivateKey }
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
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>
