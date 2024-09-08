<template>
  <tr>
    <!-- sur cette ligne cette tr on aura plusieurs infos, respectivement dans l'ordre des en tete crée  -->
    <td class="align-middle"><i class="fa-regular fa-user me-2"></i>{{ userName }}</td>
    <td class="align-middle">{{ user.site }}</td>
    <td class="align-middle">{{ user.serviceName }}</td>      
    <td class="align-middle d-flex gap-2 justify-content-end align-items-center">
      <button @click="$emit('show-expenses', user)" class="btn btn-outline-primary">
        <i class="fa-solid fa-file-invoice me-2"></i>Notes de frais
      </button>
      <button @click="$emit('delete', user)" class="btn btn-outline-danger">
        <i class="fa-solid fa-trash me-2"></i>Supprimer
      </button>
      <button @click="$emit('edit', user)" class="btn btn-outline-info">
        <i class="fa-solid fa-pen me-2"></i>Editer
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  // définition des propriétés attendues pour ce composant ainsi que les événements qu'il émet
  //user est un objet contenant les informations d'un user à chaque fois, c'est le constructeur de chaque ligne de la table
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  emits: ['delete', 'edit','show-expenses'],
  data() {
    return {}
  },
  computed: {
    userName() {
      return this.user.firstName + ' ' + this.user.lastName
    },
  },
  methods: {
    formatDate(date) {
      const options = { day: '2-digit', month: 'long', year: 'numeric' }
      return date.toLocaleDateString('fr-FR', options)
    }
  }
}
</script>

<style scoped></style>
