import { users } from '@/seeds/users.js'
import { defineStore } from 'pinia'
//libraries uuid avec npm install uuid
// import { v4 as uuidv4 } from 'uuid'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    user: null
  }),
  getters: {},
  actions: {
    // récupère les données depuis l'API : renvoie la liste des users
    async getAllUsers() {
      const response = await this.$http.get('/users')
      this.users = response.data
    },
    //recup du profil user avec l'id dans le store au moment de l'édition
    async setUser(iduser) {
      const response = await this.$http.get('/users/' + iduser)
      this.user = response.data
    },
    // suppression du profil user en fonction de l'id, recharge la liste des users
    async onDeleteUser(user) {
      const response = await this.$http.delete('/users/' + user.iduser)
      console.log(response.data)
      await this.getAllUsers()
    },
    //recherche le profil user correspondant dans le store, et enregistre les modifications
    async onUpdateUser(user) {
      const response = await this.$http.patch('/users/' + user.iduser, user)
      console.log(response.data)
      this.user = null
      await this.getAllUsers()
    },
    //ajouter un nouveau user
    async onAddUser(user) {
      // this.users.push({ ...user, iduser: uuidv4() })
      const response = await this.$http.post('/users', user)
      console.log(response.data)
      await this.getAllUsers()
    }
  }
})

// != signifie "différent de en valeur "
// == signifie "égal à en valeur "
// === signifie "égal à en valeur et en type "
