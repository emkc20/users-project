<template>
  <div class="main-layout">
    <router-view />
  </div>
</template>

<script lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const router = useRouter();
    const route = useRoute();

    console.log('route', route.path);

    onMounted(() => {
      if (route.path === '/user') console.log('girdi');
    });

    const goToBack = () => {
      router.push({ path: '/' });
    };

    return { goToBack };
  },
});
</script>
<style lang="scss" src="./mainLayout.scss"></style>
