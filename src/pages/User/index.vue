<template>
  <div @click="goToBack()">User</div>
</template>

<script lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { defineComponent, onMounted, computed } from 'vue';
import { useUserStore } from '../../store/userStore';

export default defineComponent({
  name: 'UserView',

  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useUserStore();
    const userList = computed(() => store.userList);

    console.log('sss', userList.value);

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
