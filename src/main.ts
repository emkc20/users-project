import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './assets/tailwind.css';
import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';

const routes = [
  { path: '/', component: Home }, // Home bileşenini tanımlayın
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const pinia = createPinia();
const app = createApp(App).use(createPinia());

app.use(pinia);
app.use(router);
app.mount('#app');
