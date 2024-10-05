<template>
  <div class="user-page">
    <UserForm :change-user="user" @submit="submitUser"></UserForm>
  </div>
</template>

<script lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { defineComponent, onMounted, computed, ref } from 'vue';
import { useUserStore } from '@/store/userStore';
import Modal from '../../components/Modal/Modal.vue';
import axios from 'axios';
import UserForm from '@/components/UserForm/UserForm.vue';

export default defineComponent({
  name: 'UserView',
  components: {
    UserForm,
    Modal,
  },

  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useUserStore();
    const routeParams = computed(() => route.params.id);
    const user = ref({});

    onMounted(async () => {
      if (routeParams.value) {
        const response = await axios.get(`https://66fdbeb369936930895615b6.mockapi.io/api/users/list/${routeParams.value}`);
        user.value = response.data;
      }
    });

    const submitUser = async user => {
      console.log('log');
      if (routeParams.value) {
        await axios.put(`https://66fdbeb369936930895615b6.mockapi.io/api/users/list/${user.id}`, user);
      } else {
        await axios.post(`https://66fdbeb369936930895615b6.mockapi.io/api/users/list`, user);
      }
      router.push({ path: '/' });
    };

    return {
      user,
      submitUser,
    };
  },
});
</script>
<style lang="scss" src="./User.scss"></style>
