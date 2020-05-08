<script lang="ts">
import { ref } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
import { useSha3, usePrefix } from '@/hooks/sha3'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  filters: { poyo (v) { return v.toLowerCase() } },
  setup () {
    const message = ref('')
    const hash = useSha3(message)
    const messageWithPrefix = usePrefix(message)
    const hashWithPrefix = useSha3(messageWithPrefix)

    return { message, hash, hashWithPrefix, messageWithPrefix }
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
    <img
      alt="Vue logo"
      src="../assets/logo.png"
    >
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>
