<template>
  <div class="modal">
    <div class="modal-header">
      <div class="modal-header-title">
        <div class="modal-header-title-logo">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.69466 11.9233L13.548 5.07C14.0687 4.54933 14.0687 3.70534 13.548 3.18467L12.8 2.436C12.2793 1.91534 11.4353 1.91534 10.9147 2.436L4.06066 9.29C3.96333 9.38734 3.882 9.49934 3.81866 9.62134L2.06533 13.0187C1.768 13.5953 2.386 14.214 2.96266 13.9173L6.362 12.1667C6.48533 12.1027 6.59733 12.0213 6.69466 11.9233Z"
              stroke="#323232"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3.93994 9.46001L6.52661 12.0467"
              stroke="#323232"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 14H2.69336"
              stroke="#323232"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="modal-header-title-topic">
          <h1 class="text-xl">Edit User</h1>
          <p>Description</p>
        </div>
      </div>
      <div class="modal-header-exit">X</div>
    </div>
    <div class="modal-content">
      <h1>Form Oluşturma</h1>
      <form @submit.prevent="handleSubmit">
        <div class="form-item">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            @blur="validateEmail"
            required
            :placeholder="changeUser.email"
            :class="{ 'error-input': emailError }"
          />
          <span v-if="emailError" class="error">{{ emailError }}</span>
        </div>

        <div class="form-item">
          <label for="age">Age</label>
          <input
            type="number"
            id="age"
            v-model="form.age"
            @blur="validateAge"
            required
            :placeholder="changeUser.age"
            :class="{ 'error-input': ageError }"
          />
          <span v-if="ageError" class="error">{{ ageError }}</span>
        </div>

        <div class="form-item">
          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            required
            :placeholder="changeUser.name"
            :class="{ 'error-input': nameError }"
          />
          <span v-if="nameError" class="error">{{ nameError }}</span>
        </div>

        <div class="submit">
          <button class="submit-button" type="submit">Gönder</button>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useUserStore } from '../../store/userStore';

interface Form {
  email: string;
  age: number | null;
  name: string;
}

export default defineComponent({
  name: 'ModalView',

  props: {
    changeUser: {
      type: Object,
      required: true,
    },
  },

  setup(props) {
    const store = useUserStore();
    const form = ref<Form>({
      email: '',
      age: null,
      name: '',
    });
    const emailError = ref<string>('');
    const ageError = ref<string>('');
    const nameError = ref<string>('');

    const validateEmail = () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      emailError.value =
        form.value.email && !emailPattern.test(form.value.email)
          ? 'Geçersiz email formatı.'
          : '';
    };

    console.log('props', props.changeUser);

    const validateAge = () => {
      ageError.value =
        form.value.age !== null && (form.value.age < 0 || form.value.age > 120)
          ? 'Yaş 0 ile 120 arasında olmalıdır.'
          : '';
    };

    const validateFields = () => {
      nameError.value = form.value.name ? '' : 'İsim alanı boş olamaz.';
    };

    const validateNameInput = () => {
      const namePattern = /^[A-Za-zğüşöçİĞÜŞÖÇ\s]+$/;
      nameError.value =
        form.value.name && !namePattern.test(form.value.name)
          ? 'İsim yalnızca harflerden oluşmalıdır.'
          : '';
    };

    const validateAgeInput = () => {
      const agePattern = /^[0-9]*$/;
      if (
        form.value.age !== null &&
        !agePattern.test(form.value.age.toString())
      ) {
        ageError.value = 'Yaş yalnızca sayılardan oluşmalıdır.';
      } else {
        ageError.value = '';
      }
    };

    const handleSubmit = () => {
      validateEmail();
      validateAge();
      validateFields();
      validateNameInput();
      validateAgeInput();

      if (!emailError.value && !ageError.value && !nameError.value) {
        const user = {
          id: props.changeUser.id,
          ...form.value,
        };

        store.updateUser(user);
      }
    };

    return {
      form,
      emailError,
      ageError,
      nameError,
      validateEmail,
      validateAge,
      validateFields,
      handleSubmit,
    };
  },
});
</script>
<style lang="scss" src="./Modal.scss"></style>
