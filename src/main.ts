import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import './assets/tailwind.css';

const pinia = createPinia();
const app = createApp(App).use(createPinia());

app.use(pinia);
app.mount('#app');
