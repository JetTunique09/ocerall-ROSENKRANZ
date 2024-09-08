<template>
  <div>
    <div class="row border-bottom pb-3 mb-3 mt-4">
      <div class="col">
        <h1 class="h3">Ajouter un nouveau user</h1>
      </div>
      <div class="col text-end">
        <button @click="goBack()" class="btn btn-outline-secondary ms-2">
          <i class="fa-solid fa-chevron-left me-2" />Retour
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="form-floating mb-3">
          <input
            type="text"
            v-model="user.firstName"
            class="form-control"
            placeholder="Prénom"
            :class="{ 'is-invalid': !user.firstName }"
          />
          <label for="firstName" class="form-label">Prénom</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            name="site"
            id="site"
            v-model="user.site"
            class="form-control"
            placeholder="Site"
            :class="{ 'is-invalid': !user.site }"
          />
          <label for="site" class="form-label">Site</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            name="email"
            id="email"
            class="form-control"
            placeholder="Email"
            v-model="user.email"
            :class="{ 'is-invalid': !user.email }"
          />
          <label for="email" class="form-label">Email</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            name="serviceName"
            id="serviceName"
            class="form-control"
            placeholder="Service"
            v-model="user.serviceName"
            :class="{ 'is-invalid': !user.serviceName }"
          />
          <label for="serviceName" class="form-label">Service</label>
        </div>
        <h3>Ou ?</h3>
        <div class="form-floating mb-3">
          <input
            type="text"
            name="street"
            id="street"
            v-model="user.address.street"
            class="form-control"
            placeholder="Rue"
          />
          <label for="street" class="form-label">Rue</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            name="city"
            id="city"
            v-model="user.address.city"
            class="form-control"
            placeholder="Ville"
          />
          <label for="city" class="form-label">Ville</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            name="zipCode"
            id="zipCode"
            v-model="user.address.zipCode"
            class="form-control"
            placeholder="Code Postal"
          />
          <label for="zipCode" class="form-label">Code Postal</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            name="country"
            id="country"
            v-model="user.address.country"
            class="form-control"
            placeholder="Pays"
          />
          <label for="country" class="form-label">Pays</label>
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-floating mb-3">
          <input
            type="text"
            name="lastName"
            id="lastName"
            v-model="user.lastName"
            class="form-control"
            placeholder="Nom"
            :class="{ 'is-invalid': !user.lastName }"
          />
          <label for="lastName" class="form-label">Nom</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            name="phone"
            id="phone"
            v-model="user.phone"
            class="form-control"
            placeholder="Téléphone"
            :class="{ 'is-invalid': !user.phone }"
          />
          <label for="phone" class="form-label">Téléphone</label>
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-floating mb-3">
          <input
            type="date"
            name="addDate"
            id="addDate"
            class="form-control"
            placeholder="Date d'ajout"
            format="yyyy-MM-dd"
            v-model="user.addDate"
          />
          <label for="addDate" class="form-label">Ajouté le </label>
        </div>
      </div>
    </div>
    <div v-if="user">
      <p class="text-end">
        <button
          @click="submitForm"
          :disabled="formInvalid"
          class="btn btn-outline-primary btn-lg px-5"
        >
          <i class="fa-solid fa-save me-2"></i>
          Enregistrer
        </button>
      </p>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/users.js'
import { users } from '@/seeds/users.js'
import { mapActions } from 'pinia'

export default {
  components: {},
  data() {
    return {
      users,
      user: {
        iduser: -1,
        firstName: '',
        lastName: '',
        serviceName: '',
        addDate: '',
        email: '',
        phone: '',
        site: '',
        address: {
          street: '',
          city: '',
          zipCode: '',
          country: ''
        }
      }
    }
  },
  computed: {
    userName() {
      return this.user.firstName + ' ' + this.user.lastName
    },
    formInvalid() {
      return !this.user.lastName || !this.user.email || !this.user.phone
    }
  },
  methods: {
    ...mapActions(useUserStore, ['onAddUser', 'onUpdateUser']),
    submitForm() {
      this.formSubmitted = true
      if (!this.formInvalid) {
        if (!this.user.addDate) {
          this.user.addDate = new Date().toISOString().substr(0, 10)
          //Si la date n'a pas été renseignée, on lui donne la date d'aujourd'hui
          //proposé par tabnine mais j'ai compris comment ça marche
          //https://www.tabnine.com/code/javascript/site/builtins/String/toISOString
        }
        this.onAddUser(this.user)
        console.log('enregistrement depuis createuservue')
        this.$router.push({ path: '/users' })
      }
    },
    goBack() {
      this.$router.push({ path: '/users' })
    }
  }
}
</script>

<style scoped>
.form-floating .form-label {
  pointer-events: none;
  margin-left: 0.75rem;
}
</style>
