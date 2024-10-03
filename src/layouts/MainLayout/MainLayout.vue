<template>
  <div class="main-layout">
    <header>
      <Navbar />
    </header>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Navbar from '../../components/Navbar/Navbar.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    Navbar,
  },

  setup() {
    return {};
  },
});
</script>
<style lang="scss" src="./mainLayout.scss"></style>
