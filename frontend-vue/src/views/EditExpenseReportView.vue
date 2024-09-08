<template>
  <div v-if="expenseReport">
    <!-- titre et bouton ajouter -->
    <div class="row pb-3 mb-3 mt-4">
      <div class="col">
        <h1 class="h3">
          Modifier la note de frais de {{ userName }}
        </h1>
      </div>
      <div class="col text-end">
        <button @click="deleteExpenseReport(expenseReport)" class="btn btn-outline-danger">
          <i class="fa-solid fa-trash me-2" />
          Supprimer la note
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
            name="expenseReportnum"
            id="expenseReportnum"
            v-model="expenseReport.expenseReportnum"
            class="form-control"
            placeholder="note de frais N°"
            disabled
            :class="{ 'is-invalid': !expenseReport.expenseReportnum }"
          />
          <label for="expenseReportnum" class="form-label">note de frais N°</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="date"
            name="date"
            id="date"
            class="form-control"
            placeholder="Date"
            format="yyyy-MM-dd"
            v-model="expenseReport.date"
            disabled
            :class="{ 'is-invalid': !expenseReport.date }"
          />
          <label for="date" class="form-label">Émise le</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="text"
            name="userName"
            id="userName"
            class="form-control"
            placeholder="Nom du user"
            :value="userName"
          />
          <label for="userName" class="form-label">Employé</label>
        </div>
      </div>
      <div class="col-md-4">
        <div class="form-floating mb-3">
          <input
            type="text"
            name="description"
            id="description"
            class="form-control"
            placeholder="Description"
            v-model="expenseReport.description"
          />
          <label for="description" class="form-label">Description</label>
        </div>
            <div class="form-floating mb-3">
              <select
                v-model="expenseReport.category"
                class="form-control"
                :class="{ 'is-invalid': !expenseReport.category }"
              >
                <option value="">Sélectionnez une catégorie</option>
                <option value="parking">Parking</option>
                <option value="transport">Transport</option>
                <option value="essence">Essence</option>
                <option value="restauration">Restauration</option>
                <option value="achat">Achat</option>
                <option value="hotel">Hôtel</option>
              </select>
              <label class="form-label">Catégorie</label>
            </div>
      </div>
      <div class="col-md-4">
        <div class="form-floating">
            <input
              type="number"
              min="0"
              step="1"
              name="grand-total-ttc"
              id="grand-total-ttc"
              class="form-control"
              v-model="expenseReport.totalTTC"
              placeholder="grand-total-ttc"
            />
            <label for="grand-total-ttc" class="form-label">Total TTC</label>
          </div>
          <div class="row mt-3">
              <div class="form-floating">
                <select v-model="expenseReport.statut" class="form-control">
                  <option value="En attente">En attente</option>
                  <option value="Validé">Validé</option>
                  <option value="Refusé">Refusé</option>
                </select>
                <label for="status" class="form-label">Statut</label>
              </div>
            </div>
       </div>
      <!-- <pre>{{ expenseReport.statut }}</pre> -->
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
    <!-- <pre>{{ expenseReport }}</pre> -->
  </div>
</template>

<script>
// import PrestationTableRow from '@/components/TableList/PrestationTableRow.vue'
import TableList from '@/components/TableList/TableList.vue'
import { useUserStore } from '@/stores/users.js'
import { useExpenseReportStore } from '@/stores/expenseReport.js'
// on importe les actions de pinia
import { mapActions, mapWritableState, mapState } from 'pinia'

const prestationInterface = {
  description: '',
  price: 0,
  qty: 1
}

export default {
  components: {
    // PrestationTableRow,
    TableList
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState(useUserStore, ['users']),
    ...mapWritableState(useExpenseReportStore, ['expenseReport']),
    formInvalid() {
      return (
        !this.expenseReport ||
        !this.expenseReport.user ||
        !this.expenseReport.expenseReportnum ||
        !this.expenseReport.date ||
        !this.expenseReport.statut 
      )
    },
    userName() {
      return this.expenseReport.user.firstName + ' ' + this.expenseReport.user.lastName
    }
  },
  mounted() {
    // charge les données de la note à éditer
    this.setExpenseReport(this.id)
  },
  methods: {
    // on déclare l'action ou les actions du store que l'on souhaite utiliser
    ...mapActions(useExpenseReportStore, ['onDeleteExpenseReport', 'onUpdateExpenseReport', 'setExpenseReport']),
    ...mapActions(useUserStore, ['getAllUsers']),

    // soumission du formulaire d'édition
    submitForm() {
      // j'appelle la fonction pour mettre à jour une note de frais depuis le store
      this.onUpdateExpenseReport(this.expenseReport)
      // puis je redirige l'utilisateur vers la page de liste
      this.$router.push({ path: '/expenseReports' })
    },

    // suppression de la expenseReport
    deleteExpenseReport(expenseReport) {
      // j'appelle la fonction qui vient du store stores/expenseReports.js onDeleteExpenseReport() déclarée dans les actions du store
      this.onDeleteExpenseReport(expenseReport)
      // puis je redirige l'utilisateur vers la page de liste
      this.$router.push({ path: '/expenseReports' })
    },
    goBack() {
      this.$router.push({ path: '/expenseReports' })
    }
  },
  created() {
    this.getAllUsers() // recupère la liste des users
  }
}
</script>

<style scoped>
.form-floating .form-label {
  pointer-events: none;
  margin-left: 0.75rem;
}

.form-check-input {
  height: 20px;
  width: 40px;
}

.btn-true {
  color: #fff;
  background-color: #28a745;
  border-color: #28a745;
}
</style>
