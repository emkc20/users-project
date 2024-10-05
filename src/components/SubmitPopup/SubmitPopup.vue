<template>
  <div class="submit-popup">
    <p>Değişiklikler Kaydedilsin mi?</p>
    <div class="submit-popup-content">
      <button class="submit-popup-content-button" @click="setSubmit">Evet</button>
      <button class="submit-popup-content-button" @click="cancelSubmit">Hayır</button>
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
      emit('setSubmit');
    };
    const cancelSubmit = () => {
      emit('cancelSubmit');
    };

    return { setSubmit, cancelSubmit };
  },
});
</script>

<style src="./SubmitPopup.scss" lang="scss"></style>
