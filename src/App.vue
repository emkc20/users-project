<template>
  <MainLayout>
    <router-view />
  </MainLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MainLayout from './layouts/MainLayout/index.vue';

export default defineComponent({
  name: 'App',
  components: {
    MainLayout,
  },
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
