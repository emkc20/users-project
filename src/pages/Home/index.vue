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
                <button class="action-button" @click="openDeleteModal(user.id)">Delete</button>
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
      <div v-if="showDeleteModal" class="modal-overlay">
        <UserActionPopup
          @set-submit="deleteUser"
          @cancel-submit="showDeleteModal = false"
          question="Are you sure you want to delete this user?"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useUserStore } from '@/store/userStore';
import Modal from '@/components/Modal/Modal.vue';
import UserForm from '@/components/UserForm/UserForm.vue';
import UserActionPopup from '@/components/UserActionPopup/UserActionPopup.vue';

interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

export default defineComponent({
  name: 'HomeView',
  components: {
    UserActionPopup,
    UserForm,
    Modal,
  },

  setup() {
    const store = useUserStore();
    const userInfo = ref<object>({});
    const showModal = computed<boolean>(() => store.showModal);
    const showDeleteModal = ref<boolean>(false);
    const userId = ref<number | null>(null);
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

    const openDeleteModal = (id: number) => {
      //delete butonuna tıklanıldığında modal açılır
      userId.value = id;
      showDeleteModal.value = true;
    };

    const deleteUser = () => {
      //delete işlemi gerçekleşir
      if (userId.value !== null) {
        store.deleteUser(userId.value);
      }
      showDeleteModal.value = false;
    };

    return {
      userList,
      openDeleteModal,
      editUser,
      showModal,
      userInfo,
      submitUser,
      userPathName,
      modalTitle,
      showDeleteModal,
      userId,
      deleteUser,
    };
  },
});
</script>
<style lang="scss" src="./Home.page.scss"></style>
