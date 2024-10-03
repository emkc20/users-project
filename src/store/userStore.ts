import axios from 'axios';
import { defineStore } from 'pinia';

interface State {
  userList: User[];
  loading: boolean;
  initalUserList: [];
}

export const useUserStore = defineStore('user', {
  state: (): State => {
    return {
      userList: [],
      loading: false,
      initalUserList: [],
    };
  },
  actions: {
    async fetchUsers() {
      if (this.userList.length > 0) return;
      this.loading = true;

      try {
        const response = await axios.get(
          'https://66fdbeb369936930895615b6.mockapi.io/api/users/list'
        );
        this.userList = response.data;
      } catch (err) {
        console.log((err) => err);
      } finally {
        this.loading = false;
      }
    },

    updateUser(user: User) {
      const index = this.userList.findIndex((user) => user.id === user.id);
      if (index !== -1) {
        this.userList[index] = user;
      }
    },

    deleteUser(id) {
      this.userList = this.userList.filter((user) => user.id !== id);
    },
  },
});

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}
