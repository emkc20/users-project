import { defineStore } from 'pinia';
import axios from 'axios';

interface State {
  userList: User[];
  loading: boolean;
  showModal: boolean;
  baseURL: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}

export const useUserStore = defineStore('user', {
  state: (): State => {
    return {
      userList: [],
      loading: false,
      showModal: false,
      baseURL: process.env.VUE_APP_BASE_URL,
    };
  },
  actions: {
    async fetchUsers() {
      console.log('baseURL', process.env.VUE_APP_BASE_URL);
      this.loading = true;
      try {
        const response = await axios.get(`${this.baseURL}/list`);
        this.userList = response.data.reverse();
      } catch (err) {
        console.log(err => err);
      } finally {
        this.loading = false;
      }
    },

    async updateUser(user: User) {
      const index = this.userList.findIndex(item => item.id === user.id);
      if (index !== -1) {
        this.userList[index] = user;
      }
      await axios.put(`${this.baseURL}/list/${user.id}`, user);
    },

    async deleteUser(id: number) {
      this.userList = this.userList.filter(user => user.id !== id);

      await axios.delete(`${this.baseURL}/list/${id}`);
    },

    async createUser(user: User) {
      this.userList = [user, ...this.userList];
      await axios.post(`${this.baseURL}/list`, user);
    },

    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
});
