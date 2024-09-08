<template>
  <div v-if="user">
    <!-- titre et bouton ajouter -->
    <div class="row border-bottom pb-3 mb-3 mt-4">
      <div class="col">
        <h1 class="h3"><i class="fa-solid fa-angle-down me-2" />Modifier le profil</h1>
      </div>
      <div class="col text-end">
        <button @click="deleteUser" class="btn btn-outline-danger">
          <i class="fa-solid fa-trash me-2" />
          Supprimer le user
        </button>
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
            name="firstName"
            id="firstName"
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
          <button @click="copyEmail" class="btn btn-outline-secondary copy-btn" type="button">
            <i class="fa-regular fa-copy"></i>
          </button>
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
        <br />
        <h3>Coordonnées :</h3>
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
          <button @click="copyNum" class="btn btn-outline-secondary copy-btn" type="button">
            <i class="fa-regular fa-copy"></i>
          </button>
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
            :class="{ 'is-invalid': !user.addDate }"
          />
          <label for="addDate" class="form-label">Ajouté le </label>
        </div>
      </div>
    </div>

    <p class="text-end">
      <button
        @click="submitForm()"
        :disabled="formInvalid"
        class="btn btn-outline-primary btn-lg px-5"
      >
        <i class="fa-solid fa-save me-2" />Enregistrer
      </button>
    </p>
  </div>
</template>

<script>
import { users } from '@/seeds/users.js'
// on importe le store
import { useUserStore } from '@/stores/users.js'
// on importe les actions de pinia
import { mapActions, mapWritableState } from 'pinia'

export default {
  components: {},
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      users
    }
  },
  computed: {
    ...mapWritableState(useUserStore, ['user']),
    formInvalid() {
      return !this.user || !this.user.lastName || !this.user.email || !this.user.phone
    }
  },
  mounted() {
    // charge les données du profil à éditer
    this.setUser(this.id)
  },
  methods: {
    // on déclare l'action ou les actions du store que l'on souhaite utiliser
    ...mapActions(useUserStore, ['onDeleteUser', 'onUpdateUser', 'setUser']),

    // soumission du formulaire d'édition
    submitForm() {
      // j'appelle la fonction pour mettre à jour une note de frais depuis le store
      this.onUpdateUser(this.user)
      // puis je redirige l'utilisateur vers la page de liste
      this.$router.push({ path: '/users' })
    },

    // suppression de la user
    deleteUser() {
      // j'appelle la fonction qui vient du store stores/users.js onDeleteuser() déclarée dans les actions du store
      this.onDeleteUser(this.user)
      // puis je redirige l'utilisateur vers la page de liste
      this.$router.push({ path: '/users' })
    },
    goBack() {
      this.$router.push({ path: '/users' })
    },
    //tuto pour la method copy
    //https://youtu.be/PKnr2uNAlMk?feature=shared
    copyEmail() {
      navigator.clipboard.writeText(this.user.email)
    },
    copyNum() {
      navigator.clipboard.writeText(this.user.phone)
    }
  }
}
</script>

<style scoped>
.copy-btn {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  z-index: 2;
}
</style>
