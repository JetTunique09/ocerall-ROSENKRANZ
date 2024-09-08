<template>
  <div>
    <div class="row pb-3 mb-3 mt-4">
      <div class="col">
        <h1 class="h3">Créer une nouvelle note de frais</h1>
      </div>
      <div class="col text-end">
        <button @click="goBack()" class="btn btn-outline-secondary ms-2">
          <i class="fa-solid fa-chevron-left me-2" />Retour
        </button>
      </div>
    </div>

    <div v-if="expenseReport">
      <div class="row">
        <div class="col-md-4">
          <div class="form-floating mb-3">
            <input type="date" v-model="expenseReport.date" class="form-control" placeholder="Date" />
            <label class="form-label">Date</label>
          </div>
          <div class="form-floating mb-3">
            <select
              v-model="expenseReport.user"
              class="form-control"
              :class="{ 'is-invalid': !expenseReport.user }"
            >
              <option value="">Veuillez choisir un employé</option>
              <option v-for="user in users" :key="user.iduser" :value="user">
                {{ user.firstName }} {{ user.lastName }}
              </option>
            </select>
            <label class="form-label">Employé</label>
          </div>
        </div>
        <div class="col-md-4">
          <div class="form-floating mb-3">
            <input
              type="text"
              v-model="expenseReport.description"
              class="form-control"
              placeholder="Description"
            />
            <label class="form-label">Description</label>
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
                v-model="expenseReport.totalTTC"
                class="form-control"
                placeholder="grand-total-ttc"
                :class="{ 'is-invalid': !expenseReport.totalTTC }"
              />
              <label for="grand-total-ttc" class="form-label">Total TTC</label>
            </div>
            <div class="row mt-3">
              <div class="form-floating">
                <select 
                v-model="expenseReport.statut" 
                class="form-control" 
                :class="{ 'is-invalid': !expenseReport.statut }"
                >
                  <option value="">Sélectionnez le statut</option>
                  <option value="En attente">En attente</option>
                  <option value="Validé">Validé</option>
                  <option value="Refusé">Refusé</option>
                </select>
                <label class="form-label">Statut</label>
              </div>
            </div>
        </div>         
      </div>
      

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
  <!-- test utilisation d'une action du store user fonctionne -->
  <!-- <pre> {{ users }}</pre> -->
  <!-- <pre>{{ expenseReport }}</pre> -->

</template>

<script>
import { useExpenseReportStore } from '@/stores/expenseReport.js'
import { useUserStore } from '@/stores/users.js'
import { mapActions, mapState } from 'pinia'

export default {
  components: {
  },
  data() {
    return {
      expenseReport: {
        id: -1,
        expenseReportnum: '',
        description: '',
        date: '',
        user: '',
        category: '',
        statut: '',
        totalTTC: 0
      },
      formSubmitted: false
    }
  },
  computed: {
    ...mapState(useExpenseReportStore, ['lastExpenseReportNum']),
    ...mapState(useUserStore, ['users']),
    formInvalid() {
      return (
        !this.expenseReport ||
        !this.expenseReport.user ||
        !this.expenseReport.category ||
        !this.expenseReport.statut ||
        !this.expenseReport.totalTTC
      )
    },
  },
  methods: {
    ...mapActions(useExpenseReportStore, ['onUpdateExpenseReport', 'onAddExpenseReport', 'getLastExpenseReportNum']),
    ...mapActions(useUserStore, ['getAllUsers']),
    submitForm() {
      this.formSubmitted = true
      if (!this.formInvalid) {
        if (!this.expenseReport.date) {
          this.expenseReport.date = new Date().toISOString().substr(0, 10)
        }
        this.onAddExpenseReport(this.expenseReport)
        this.$router.push({ path: '/expenseReports' })
      }
    },
    goBack() {
      this.$router.push({ path: '/expenseReports' })
    }
  },
  created() {
    this.getAllUsers(); 
    this.getLastExpenseReportNum().then(response => {
      // initialise le numéro de la nouvelle note de frais avec le dernier numéro + 1
      this.expenseReport.expenseReportnum = Number(response.lastnum) + 1;
    });
  },
}
</script>

<style scoped>
.form-floating .form-label {
  pointer-events: none;
  margin-left: 0.75rem;
}

</style>
