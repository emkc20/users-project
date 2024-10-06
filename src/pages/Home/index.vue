<template>
  <div class="home-page">
    <div class="table-container overflow-x-auto">
      <table class="table">
        <thead>
          <tr class="table-header">
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Age</th>
            <th scope="col" class="table-cell">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in userList" :key="user.id" class="table-row" scope="row">
            <td data-label="Name">{{ user.name }}</td>
            <td data-label="Email">
              <span class="status-indicator"></span>
              {{ user.email }}
            </td>
            <td data-label="Age">{{ user.age }}</td>
            <td data-label="Action">
              <div class="flex justify-end space-x-2">
                <button class="action-button" @click="editUser(user)">Edit</button>
                <button class="action-button" @click="deleteUser(user.id)">Delete</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="showModal" class="modal-overlay">
        <Modal :modal-title="modalTitle">
          <UserForm :user-info="userPathName ? {} : userInfo" @submit="submitUser"></UserForm>
        </Modal>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useUserStore } from '@/store/userStore';
import Modal from '@/components/Modal/Modal.vue';
import UserForm from '@/components/UserForm/UserForm.vue';

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
    const store = useUserStore();
    const userInfo = ref<object>({});
    const showModal = computed<boolean>(() => store.showModal);
    const userList = computed<object>(() => store.userList);
    const userPathName = computed<boolean>(() => window.location.pathname.includes('/add-user'));
    const modalTitle = computed<string>(() => (userPathName.value ? 'Add User' : 'Edit User'));

    onMounted(async () => {
      //sayfa mount olduğunda kullanıcılır yüklenir
      await store.fetchUsers();
    });

    const editUser = (user: User) => {
      //edit butonuna tıklanıldığında alınan aksiyonlar
      userInfo.value = user;
      store.openModal();
      const uri = `/edit-user/${user?.id}`;
      window.history.pushState(null, '', uri);
    };

    const submitUser = (user: User) => {
      //submit işlemi yapıldığında alınan asksiyonlar
      //userPathName ile hangi sayfada olunduğu kontrolü yapılır

      if (userPathName.value) {
        store.createUser(user);
      } else {
        store.updateUser(user);
      }

      store.closeModal();
      window.history.pushState(null, '', '/');
    };

    const deleteUser = (id: number) => {
      //delete butonuna tıklanıldığında alınan aksiyonlar

      store.deleteUser(id);
    };

    return {
      userList,
      deleteUser,
      editUser,
      showModal,
      userInfo,
      submitUser,
      userPathName,
      modalTitle,
    };
  },
});
</script>
<style lang="scss" src="./Home.page.scss"></style>
