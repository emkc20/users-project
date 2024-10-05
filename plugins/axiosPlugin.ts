import { App } from 'vue';
import axios from 'axios';

const axiosPlugin = {
  install(app: App, options: { baseURL: string }) {
    const axiosInstance = axios.create({
      baseURL: options.baseURL,
    });

    app.config.globalProperties.$axios = axiosInstance;
  },
};

export default axiosPlugin;
