<template>
  <div>
    <div>home</div>
    <div @click="goToUserPage()">User</div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';
import { defineComponent, onMounted } from 'vue';
//import axios from 'axios';

export default defineComponent({
  name: 'HomeView',

  setup() {
    //const route = useRoute();
    const router = useRouter();

    const goToUserPage = () => {
      router.push({ path: '/user' });
    };

    const fetchData = async () => {
      //const response = await axios.get(
      //  'https://66fdbeb369936930895615b6.mockapi.io/api/users/list'
      //);
      //console.log('response', response.data);
    };

    onMounted(() => {
      fetchData();
    });

    return {
      goToUserPage,
    };
  },
});
</script>
