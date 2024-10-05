<template>
  <div class="user-page">
    <UserForm :user-info="user" @submit="submitUser"></UserForm>
  </div>
</template>

<script lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { defineComponent, onMounted, computed, ref } from 'vue';
import Modal from '@/components/Modal/Modal.vue';
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
    const routeParams = computed(() => route.params.id);
    const user = ref<object>({});
    const baseUrl = process.env.VUE_APP_BASE_URL;

    onMounted(async () => {
      if (routeParams.value) {
        const response = await axios.get(`${baseUrl}/list/${routeParams.value}`);
        user.value = response.data;
      }
    });

    const submitUser = async user => {
      if (routeParams.value) {
        await axios.put(`${baseUrl}/list/${user.id}`, user);
      } else {
        await axios.post(`${baseUrl}/list`, user);
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
