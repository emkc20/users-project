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
      //bütün user bilgileri api'den çekilir
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
      //user edit yapıldığında localede ki liste güncellenir ve api'ye istek atılır

      const index = this.userList.findIndex(item => item.id === user.id);
      if (index !== -1) {
        this.userList[index] = user;
      }
      await axios.put(`${this.baseURL}/list/${user.id}`, user);
    },

    async deleteUser(id: number) {
      //user delete yapıldığında localeden silinir ve api'ye istek atılır

      this.userList = this.userList.filter(user => user.id !== id);

      await axios.delete(`${this.baseURL}/list/${id}`);
    },

    async createUser(user: User) {
      //yeni user eklendiğinde locele güncellenir ve api'ye istek atılır

      this.userList = [user, ...this.userList];
      await axios.post(`${this.baseURL}/list`, user);
    },

    openModal() {
      //modal açılır
      this.showModal = true;
    },
    closeModal() {
      //modal kapatılır
      this.showModal = false;
    },
  },
});
