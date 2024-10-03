<template>
  <div class="home-page">
    <div class="table-container">
      <table class="table">
        <thead>
          <tr class="table-header">
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th class="table-cell">Action</th>
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
                <button class="action-button" @click="editUser(user)">
                  Edit
                </button>
                <button class="action-button" @click="deleteUser(user.id)">
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="showModal" class="modal-overlay">
        <Modal :changeUser="changeUser" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useUserStore } from '../../store/userStore';
import Modal from '../../components/Modal/Modal.vue';

export default defineComponent({
  name: 'HomeView',
  components: {
    Modal,
  },
  setup() {
    const store = useUserStore();
    const showModal = ref(false);
    const userList = computed(() => store.userList);
    const changeUser = ref({});

    onMounted(async () => {
      await store.fetchUsers();
    });

    const deleteUser = (id: number) => {
      store.deleteUser(id);
    };

    const editUser = (user: Object) => {
      changeUser.value = user;
      showModal.value = true;
      //document.body.style.backgroundColor = '#0000001F';
    };

    return {
      userList,
      deleteUser,
      editUser,
      showModal,
      changeUser,
    };
  },
});
</script>
<style lang="scss" src="./Home.page.scss"></style>
