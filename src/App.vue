<template>
  <main>
    <RouterView />
  </main>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const message = ref<string>('Merhaba TypeScript!');

    const changeMessage = () => {
      message.value = 'Mesaj değiştirildi!';
    };

    return {
      message,
      changeMessage,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
