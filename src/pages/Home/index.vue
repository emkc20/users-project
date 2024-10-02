<template>
  <div>
    <div>home</div>
    <div @click="goToUserPage()">User</div>
  </div>
</template>

<script lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HomeView',

  setup() {
    const route = useRoute();
    const router = useRouter();

    console.log('route', route);

    const goToUserPage = () => {
      router.push({ path: '/user' });
    };

    return {
      goToUserPage,
    };
  },
});
</script>
