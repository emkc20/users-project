import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home/index.vue';
import User from '../pages/User/index.vue';

const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/add-user', component: User },
  { path: '/edit-user/:id', component: User },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
