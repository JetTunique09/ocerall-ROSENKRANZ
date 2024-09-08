<template>
  <div>
    <!-- titre et bouton ajouter -->
    <div class="row pb-3 mb-3 mt-4">  
      <div class="col text-end">
        <router-link to="/create-expenseReport" class="btn btn-outline-primary">
          <i class="fa-solid fa-plus-circle me-2"></i>
          Ajouter une note de frais
        </router-link>
      </div>
    </div>

    <div class="tableauList bg-white">
      <h2 class="h3 mt-2 mb-4 mx-2"><strong>Historique</strong></h2>
      <TableList>
        <ExpenseReportTableRow
          v-for="expenseReport in expenseReports"
          :key="expenseReport.id"
          :expenseReport="expenseReport"
          @edit="onEditExpenseReport($event)"
          @delete="onDeleteExpenseReport($event)"
        />
      </TableList>
    </div>
  </div>
  <!-- <pre> {{ expenseReports }}</pre> -->
</template>

<script>
import ExpenseReportTableRow from '@/components/TableList/ExpenseReportTableRow.vue'
import TableList from '@/components/TableList/TableList.vue'
// Import du store
import { useExpenseReportStore } from '@/stores/expenseReport.js'
// Import du mapState, mapActions et mapWritableState du plugin Pinia
import { mapActions, mapState } from 'pinia'

export default {
  components: {
    TableList,
    ExpenseReportTableRow
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState(useExpenseReportStore, ['expenseReports'])
    //...mapWritableState(useExpenseReportStore, ['expenseReport']),
    //...mapStores(useExpenseReportStore)
  },
  async mounted() {
    //récupère les données de l'API
    await this.getAllExpenseReports()
  },
  methods: {
    ...mapActions(useExpenseReportStore, ['onDeleteExpenseReport', 'getAllExpenseReports']),
    onEditExpenseReport(expenseReport) {
      console.log('edit expenseReport with id: ', expenseReport.id)
      //redirection de page
      this.$router.push({
        name: 'edit-expenseReport',
        params: {
          id: expenseReport.id
        }
      })
    },
  }
}
</script>

<style scoped>
.tableauList {
  border-radius: 10px;
  border: 1px solid rgb(214, 214, 214);
  padding: 10px;
}

.h3 {
  font-family: Roboto;
}
</style>
