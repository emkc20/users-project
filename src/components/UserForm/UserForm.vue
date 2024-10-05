<template>
  <div class="user-form">
    <form @submit.prevent="handleSubmit">
      <div class="form-item">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="form.name" required :placeholder="changeUser.name" :class="{ 'error-input': nameError }" />
        <span v-if="nameError" class="error">{{ nameError }}</span>
      </div>

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

      <div class="submit">
        <button class="submit-button" type="submit">Gönder</button>
      </div>
    </form>
    <div v-if="isSubmit" class="form-popup">
      <SubmitPopup @set-submit="setSubmit" @cancel-submit="cancelSubmit" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useUserStore } from '@/store/userStore';
import SubmitPopup from '@/components/SubmitPopup/SubmitPopup.vue';

interface Form {
  email: string;
  age: number | null;
  name: string;
}

export default defineComponent({
  name: 'FormView',
  components: { SubmitPopup },

  props: {
    changeUser: {
      type: Object,
      require: false,
      default: () => ({}),
    },
  },

  emits: ['submit'],

  setup(props, { emit }) {
    const store = useUserStore();
    const form = ref<Form>({
      email: '',
      age: null,
      name: '',
    });
    const emailError = ref<string>('');
    const ageError = ref<string>('');
    const nameError = ref<string>('');
    const user = ref<object>({});
    const isSubmit = ref<boolean>(false);
    const validateEmail = () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      emailError.value = form.value.email && !emailPattern.test(form.value.email) ? 'Geçersiz email formatı.' : '';
    };

    const validateAge = () => {
      ageError.value = form.value.age !== null && (form.value.age < 0 || form.value.age > 120) ? 'Yaş 0 ile 120 arasında olmalıdır.' : '';
    };

    const validateFields = () => {
      nameError.value = form.value.name ? '' : 'İsim alanı boş olamaz.';
    };

    const validateNameInput = () => {
      const namePattern = /^[A-Za-zğüşöçİĞÜŞÖÇ\s]+$/;
      nameError.value = form.value.name && !namePattern.test(form.value.name) ? 'İsim yalnızca harflerden oluşmalıdır.' : '';
    };

    const validateAgeInput = () => {
      const agePattern = /^[0-9]*$/;
      if (form.value.age !== null && !agePattern.test(form.value.age.toString())) {
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
        user.value = {
          id: props.changeUser.id || new Date().getMilliseconds(),
          ...form.value,
        };
        isSubmit.value = true;
      }
    };

    const setSubmit = () => {
      isSubmit.value = false;

      emit('submit', user.value);
    };

    const cancelSubmit = () => {
      form.value.email = '';
      form.value.age = null;
      form.value.name = '';
      isSubmit.value = false;
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
      isSubmit,
      setSubmit,
      cancelSubmit,
    };
  },
});
</script>
<style lang="scss" src="./UserForm.scss"></style>
