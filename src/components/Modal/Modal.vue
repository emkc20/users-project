<template>
  <div class="modal">
    <div class="modal-header">
      <div class="modal-header-title">
        <div class="modal-header-title-logo">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.69466 11.9233L13.548 5.07C14.0687 4.54933 14.0687 3.70534 13.548 3.18467L12.8 2.436C12.2793 1.91534 11.4353 1.91534 10.9147 2.436L4.06066 9.29C3.96333 9.38734 3.882 9.49934 3.81866 9.62134L2.06533 13.0187C1.768 13.5953 2.386 14.214 2.96266 13.9173L6.362 12.1667C6.48533 12.1027 6.59733 12.0213 6.69466 11.9233Z"
              stroke="#323232"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path d="M3.93994 9.46001L6.52661 12.0467" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 14H2.69336" stroke="#323232" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <div class="modal-header-title-topic">
          <h1 class="text-xl">Edit User</h1>
          <p>Description</p>
        </div>
      </div>
      <div @click="closeModal" class="modal-header-exit">X</div>
    </div>
    <div class="modal-content">
      <h1>Form Oluşturma</h1>
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useUserStore } from '@/store/userStore';
import UserForm from '@/components/UserForm/UserForm.vue';

export default defineComponent({
  name: 'ModalView',
  components: {
    UserForm,
  },

  emits: ['clicked', 'handleUser'],

  setup() {
    const store = useUserStore();

    const closeModal = () => {
      store.closeModal();
      history.replaceState(null, '', '/');
    };

    return {
      closeModal,
    };
  },
});
</script>
<style lang="scss" src="./Modal.scss"></style>
