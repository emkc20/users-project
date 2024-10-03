<template>
  <div class="navbar">
    <div class="navbar-left">
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
          d="M13.228 5.53267L9.228 2.42133C8.506 1.85933 7.49467 1.85933 6.772 2.42133L2.772 5.53267C2.28467 5.91133 2 6.494 2 7.11133V12C2 13.1047 2.89533 14 4 14H12C13.1047 14 14 13.1047 14 12V7.11133C14 6.494 13.7153 5.91133 13.228 5.53267Z"
          stroke="#1E293B"
          stroke-width="1.5"
        />
        <path
          d="M6 11.3333H10"
          stroke="#1E293B"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <span> / Users {{ breadcrumbName }}</span>
    </div>
    <div class="navbar-right">
      <button @click="goToPage()">{{ buttonTitle }}</button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, watch, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  name: 'NavbarView',

  setup() {
    const router = useRouter();
    const route = useRoute();
    const breadcrumbName = ref('');
    const buttonTitle = ref('');

    onMounted(() => {
      getBreadCrumbName();
    });

    watch(
      () => route.path,
      () => {
        getBreadCrumbName();
      }
    );

    const getBreadCrumbName = () => {
      if (route.path === '/user') {
        breadcrumbName.value = ' / Create User';
        buttonTitle.value = 'Back';
      } else {
        breadcrumbName.value = '';
        buttonTitle.value = 'Add User';
      }
    };

    const goToPage = () => {
      if (route.path === '/user') {
        router.go(-1);
      }
      router.push({ path: '/user' });
    };

    return { goToPage, buttonTitle, breadcrumbName };
  },
});
</script>
<style lang="scss" src="./Navbar.scss"></style>
