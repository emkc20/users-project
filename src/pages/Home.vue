<template>
  <div>home</div>
  <HelloWorld></HelloWorld>
</template>

<script>
import HelloWorld from '@/components/HelloWorld/index.vue';
import { useRoute } from 'vue-router';
export default {
  name: 'HomeView',
  components: {
    HelloWorld,
  },

  setup() {
    const route = useRoute();
    console.log('route', route.value);
  },
};
</script>
