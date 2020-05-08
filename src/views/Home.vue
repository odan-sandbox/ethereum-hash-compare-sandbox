<template>
  <div class="home">
    <input type="text" name="" id="" v-model="message">
    <div>{{hash}}</div>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import { ref } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'
import { useSha3 } from '@/hooks/sha3'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  setup () {
    const message = ref('')
    const hash = useSha3(message)

    return { message, hash }
  }
}
</script>
