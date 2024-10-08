<template>
  <div class="user-form">
    <form @submit.prevent="handleSubmit">
      <div class="form-item">
        <label for="name">Name</label>
        <input type="text" id="name" v-model="form.name" required :placeholder="userInfo.name" :class="{ 'error-input': nameError }" />
        <span v-if="nameError" class="error">{{ nameError }}</span>
      </div>

      <div class="form-item">
        <label for="email">Email </label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          @blur="validateEmail"
          required
          :placeholder="userInfo.email"
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
          :placeholder="userInfo.age"
          :class="{ 'error-input': ageError }"
        />
        <span v-if="ageError" class="error">{{ ageError }}</span>
      </div>

      <div class="submit">
        <button class="submit-button" type="submit">Send</button>
      </div>
    </form>
    <div v-if="isSubmit" class="form-popup">
      <UserActionPopup question="Saving changes?" @set-submit="setSubmit" @cancel-submit="cancelSubmit" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import UserActionPopup from '@/components/UserActionPopup/UserActionPopup.vue';

interface Form {
  email: string;
  age: number | null;
  name: string;
}

export default defineComponent({
  name: 'FormView',
  components: { UserActionPopup },

  props: {
    userInfo: {
      type: Object,
      require: false,
      default: () => ({}),
    },
  },

  emits: ['submit'],

  setup(props, { emit }) {
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
      //email kontrolu yapılıyor
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      emailError.value = form.value.email && !emailPattern.test(form.value.email) ? 'Geçersiz email formatı.' : '';
    };

    const validateName = () => {
      //name kontrolu yapılıyor
      const namePattern = /^[A-Za-zğüşöçİĞÜŞÖÇ\s]+$/;
      nameError.value = form.value.name && !namePattern.test(form.value.name) ? 'İsim yalnızca harflerden oluşmalıdır.' : '';
    };

    const validateAge = () => {
      //yaş kontrolu yapılıyor
      const agePattern = /^[0-9]*$/;
      if (form.value.age !== null && !agePattern.test(form.value.age.toString())) {
        ageError.value = 'Yaş yalnızca sayılardan oluşmalıdır.';
      } else if (form.value.age !== null && (form.value.age < 0 || form.value.age > 120)) {
        ageError.value = 'Yaş 0 ile 120 arasında olmalıdır.';
      } else {
        ageError.value = '';
      }
    };

    const handleSubmit = () => {
      //send butonuna tıklanıldığında validasyon işlmeleri çalışır
      //hata varsa hata mesajı döner, yoksa user objesinin içi doldurulur
      validateEmail();
      validateAge();
      validateName();

      if (!emailError.value && !ageError.value && !nameError.value) {
        user.value = {
          id: props.userInfo.id || new Date().getMilliseconds(),
          ...form.value,
        };
        isSubmit.value = true;
      }
    };

    const setSubmit = () => {
      //user bilgileri üst component'e gönderilir
      isSubmit.value = false;

      emit('submit', user.value);
    };

    const cancelSubmit = () => {
      //form.value'nun içi boşaltılır

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
      validateName,
      handleSubmit,
      isSubmit,
      setSubmit,
      cancelSubmit,
    };
  },
});
</script>
<style lang="scss" src="./UserForm.scss"></style>
