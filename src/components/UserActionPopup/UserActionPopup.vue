<template>
  <div class="submit-popup">
    <p class="text-center">{{ question }}</p>
    <div class="submit-popup-content">
      <button class="submit-popup-content-button" @click="setSubmit">Yes</button>
      <button class="submit-popup-content-button" @click="cancelSubmit">No</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserActionPopup',
  props: {
    question: {
      type: String,
      required: true,
      default: '',
    },
  },

  emits: ['setSubmit', 'cancelSubmit'],

  setup(props, { emit }) {
    const setSubmit = () => {
      //user bilgilerini kaydetmek için üst componente emit fırlatır
      emit('setSubmit');
    };
    const cancelSubmit = () => {
      //modala dönmek için üst componente emit fırlatır
      emit('cancelSubmit');
    };

    return { setSubmit, cancelSubmit };
  },
});
</script>

<style src="./UserActionPopup.scss" lang="scss"></style>
