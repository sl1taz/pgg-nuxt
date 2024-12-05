import { defineStore } from 'pinia'
import type { User } from '~/types/User'

export const useUserStore = defineStore('users', {
  state: () => ({
    users: [] as User[]
  }),
  actions: {
    initializeStore() {
      const storedUsers = localStorage.getItem('users')
      if (storedUsers) {
        this.users = JSON.parse(storedUsers)
      }
    },
    addUser(user: User) {
      const newUser = { ...user, id: this.users.length + 1 }
      this.users.push(newUser)
      this.saveToLocalStorage()
    },
    updateUser(updatedUser: User) {
      const index = this.users.findIndex(u => u.id === updatedUser.id)
      if (index !== -1) {
        this.users[index] = updatedUser
        this.saveToLocalStorage()
      }
    },
    deleteUser(userId: number) {
      this.users = this.users.filter(u => u.id !== userId)
      this.saveToLocalStorage()
    },
    saveToLocalStorage() {
      localStorage.setItem('users', JSON.stringify(this.users))
    }
  },
  getters: {
    getUserById: (state) => {
      return (userId: number) => state.users.find(u => u.id === userId)
    }
  }
})