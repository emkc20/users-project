<template>
  <div @click="goToBack()">User</div>
</template>

<script lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'UserView',

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
