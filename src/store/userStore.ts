import { defineStore } from 'pinia';
import axios from 'axios';

interface State {
  userList: User[];
  loading: boolean;
  showModal: boolean;
}

export const useUserStore = defineStore('user', {
  state: (): State => {
    return {
      userList: [],
      loading: false,
      showModal: false,
    };
  },
  actions: {
    async fetchUsers() {
      this.loading = true;
      try {
        const response = await axios.get('https://66fdbeb369936930895615b6.mockapi.io/api/users/list');
        this.userList = response.data;
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
      await axios.put(`https://66fdbeb369936930895615b6.mockapi.io/api/users/list/${user.id}`, user);
    },

    async deleteUser(id: number) {
      this.userList = this.userList.filter(user => user.id !== id);

      await axios.delete(`https://66fdbeb369936930895615b6.mockapi.io/api/users/list/${id}`);
    },

    async createUser(user: User) {
      this.userList = [...this.userList, user];
      await axios.post(`https://66fdbeb369936930895615b6.mockapi.io/api/users/list`, user);
    },

    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
});

interface User {
  id: number;
  name: string;
  email: string;
  age?: number;
}
