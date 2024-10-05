<template>
  <div class="home-page">
    <div class="table-container overflow-x-auto">
      <table class="table">
        <thead>
          <tr class="table-header">
            <th class="text-sm">Name</th>
            <th class="text-sm">Email</th>
            <th class="text-sm">Age</th>
            <th class="table-cell text-sm">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in userList" :key="user.id" class="table-row">
            <td>{{ user.name }}</td>
            <td class="flex items-center">
              <span class="status-indicator"></span>
              {{ user.email }}
            </td>
            <td>{{ user.age }}</td>
            <td>
              <div class="flex justify-end space-x-2">
                <button class="action-button" @click="editUser(user)">Edit</button>
                <button class="action-button" @click="deleteUser(user.id)">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="showModal" class="modal-overlay">
        <Modal @on-close="closeModal()">
          <UserForm :change-user="addUserPathName ? {} : changeUser" @submit="submitUser"></UserForm>
        </Modal>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useUserStore } from '@/store/userStore';
import Modal from '../../components/Modal/Modal.vue';
import UserForm from '@/components/UserForm/UserForm.vue';
import { useRouter, useRoute } from 'vue-router';

interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

export default defineComponent({
  name: 'HomeView',
  components: {
    UserForm,
    Modal,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useUserStore();
    const showModal = computed(() => store.showModal);
    const userList = computed(() => store.userList);
    const changeUser = ref({});
    const addUserPathName = computed(() => window.location.pathname.includes('/add-user'));

    onMounted(async () => {
      await store.fetchUsers();
    });

    const deleteUser = (id: number) => {
      store.deleteUser(id);
    };

    const editUser = (user: User) => {
      changeUser.value = user;
      store.openModal();
      const uri = `/edit-user/${user?.id}`;
      window.history.pushState(null, '', uri);
    };

    const submitUser = (user: User) => {
      if (addUserPathName.value) {
        store.createUser(user);
      } else {
        console.log('sub');
        store.updateUser(user);
      }

      store.closeModal();
      window.history.replaceState(null, '', '/');
    };

    return {
      userList,
      deleteUser,
      editUser,
      showModal,
      changeUser,
      submitUser,
      addUserPathName,
    };
  },
});
</script>
<style lang="scss" src="./Home.page.scss"></style>
