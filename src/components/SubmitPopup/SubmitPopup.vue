<template>
  <div class="submit-popup">
    <p>Save the changes?</p>
    <div class="submit-popup-content">
      <button class="submit-popup-content-button" @click="setSubmit">Yes</button>
      <button class="submit-popup-content-button" @click="cancelSubmit">No</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SubmitPopView',

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

<style src="./SubmitPopup.scss" lang="scss"></style>
