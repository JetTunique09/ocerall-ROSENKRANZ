<!-- le modèle utiliser pour chaque ligne -->
<template>
  <!-- tr pour tableau row donc 1 ligne  -->
  <tr>
    <!-- sur cette ligne cette tr on aura plusieurs infos, respectivement dans l'ordre des en tete crée  -->
    <td class="align-middle"><i class="fa-regular fa-file me-2"></i>{{ expenseReport.date }}</td>
    <td class="align-middle">{{ userName }}</td>
    <td v-if="!isHomeView" class="align-middle">{{ expenseReport.category }}</td>
    <td class="align-middle text-end">{{ expenseReport.totalTTC.toFixed(2) }} €</td>
    <td v-if="!isHomeView"  class="align-middle text-end">
      <i
        :class="getStatusIcon(expenseReport.statut)"
      ></i>
    </td>
    <td class="align-middle d-flex gap-2 justify-content-end align-items-center">
      <!-- on a un bouton permettant la modification et la suppression de chaque expenseReport -->
      <button v-if="!isHomeView" @click="$emit('delete', expenseReport)" class="btn btn-outline-danger">
        <i class="fa-solid fa-trash"></i>
      </button>
      <button @click="$emit('edit', expenseReport)" class="btn btn-outline-info">
        <i class="fa-solid fa-pen"></i>
      </button>
    </td>
  </tr>
</template>

<script>

export default {
  // définition des propriétés attendues pour ce composant ainsi que les éventements qu'il émet
  //expenseReport est un objet contenant les informations d'une note de frais à chaque fois, c'est le constructeur de chaque ligne de la table
  props: {
    expenseReport: {
      type: Object,
      required: true
    },
    showStatus: {
      type: Boolean,
      default: true
    }
  },
  emits: ['delete', 'edit'],
  // création d'une propriété calculée en fonction du nom et prenom de la note de frais,
  //renvoie le nom du user après assemblage
  computed: {
    userName() {
      return this.expenseReport.user.firstName + ' ' + this.expenseReport.user.lastName
    },
    isHomeView() {
      return this.$route.name === 'home'
    }
  },
  methods: {
    getStatusIcon(status) {
      switch (status) {
        case 'Validé':
          return 'fa-solid fa-circle-check text-success';
        case 'Refusé':
          return 'fa-solid fa-circle-xmark text-danger';
        default:
          return 'fa-solid fa-question text-warning';
      }
    }
  }
}
</script>

<style scoped>
.fa-hourglass-half {
  color: #fd7e14;
}
</style>
