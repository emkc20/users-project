<template>
  <MainLayout>
    <router-view />
  </MainLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainLayout from '@/layouts/MainLayout/MainLayout.vue';

export default defineComponent({
  name: 'App',
  components: {
    MainLayout,
  },
});
</script>
