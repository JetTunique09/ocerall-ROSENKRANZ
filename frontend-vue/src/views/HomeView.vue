<template>
  <main class="bg-light-gray">
    <div class="row pb-2 mb-2 mt-4">
      <div class="col-7">
      </div>
      <div class="col-3 text-end mx-0 px-0">
        <router-link to="/create-expenseReport" class="btn btn-outline-primary">
          <i class="fa-solid fa-plus-circle me-2"></i>
          Ajouter une note de frais
        </router-link>
      </div>
      <div class="col-2 text-end px-0">
        <router-link to="/create-user" class="btn btn-outline-primary">
          <i class="fa-solid fa-plus-circle me-2"></i>
          Ajouter un employé
        </router-link>
      </div>
    </div>

    <div class="pt-2 mt-4">
      <div class="row">
        <div class="col-6">
          <BoardCard> </BoardCard>
        </div>
        <div class="col-6 mx-0 tableauList bg-white">
          <h2 class="h3 mt-2 mb-4 mx-2"><strong>En attente de traitement</strong></h2>
          <TableList>
            <ExpenseReportTableRow
              v-for="expenseReport in enCoursExpenseReports"
              :key="expenseReport.id"
              :expenseReport="expenseReport"
              @edit="onEditExpenseReport($event)"
            />
          </TableList>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { useCounterStore } from '@/stores/counter.js'
import { useExpenseReportStore } from '@/stores/expenseReport.js'
import { mapState, mapActions } from 'pinia'
import BoardCard from '@/components/Dashboard/BoardCard.vue'
import ExpenseReportTableRow from '@/components/TableList/ExpenseReportTableRow.vue'
import TableList from '@/components/TableList/TableList.vue'

export default {
  components: {
    BoardCard,
    TableList,
    ExpenseReportTableRow
  },
  data() {
    return {
    }
  },
  //recupère en lecture la donnée et l'injecte dans le composant avec le même nom de la variable dans le store
  computed: {
    ...mapState(useExpenseReportStore, ['expenseReports']),
    pendingExpenseReports() {
      return this.expenseReports.filter((report) => report.statut === 'En attente');
    },
    // filtrer les notes de frais du mois actuel
    currentMonthExpenseReports() {
      const currentMonth = new Date().getMonth() + 1; 
      const currentYear = new Date().getFullYear();
      
      return this.expenseReports.filter(expenseReport => {
        const expenseDate = new Date(expenseReport.date);
        return (
          expenseDate.getMonth() + 1 === currentMonth &&
          expenseDate.getFullYear() === currentYear
        );
      });
    },

    // calcul le nombre de notes de frais par catégorie pour le mois en cours
    categoryData() {
      const categories = ['restauration', 'transport', 'hébergement', 'divers', 'fournitures', 'parking'];
      const data = {};

      categories.forEach(category => {
        data[category] = this.currentMonthExpenseReports.filter(expenseReport => expenseReport.category === category).length;
      });

      const totalExpenseReports = this.currentMonthExpenseReports.length;

      // convertir en pourcentage
      const percentages = categories.map(category => {
        return ((data[category] / totalExpenseReports) * 100).toFixed(1);
      });

      return {
        categories,
        percentages
      };
    },

    enCoursExpenseReports() {
      return this.expenseReports.filter((expenseReport) => !expenseReport.statut || expenseReport.statut === 'En attente');
    }
  },
  methods: {
    ...mapActions(useCounterStore, ['increment']),
    ...mapActions(useExpenseReportStore, ['onDeleteExpenseReport', 'getAllExpenseReports']),
    onEditExpenseReport(expenseReport) {
      console.log('edit expenseReport with id: ', expenseReport.id)
      //  l'expense report dans être définie dans le store
      //this.setExpenseReport(expenseReport.id); 

      //redirection de page
      this.$router.push({
        name: 'edit-expenseReport',
        params: {
          id: expenseReport.id
        }
      })
    }
  },
}
</script>

<style scoped>
.bg-light-gray {
    background-color: #f8F9fa; 
  }

.tableauList {
  border-radius: 10px;
  border: 1px solid rgb(214, 214, 214);
  padding: 10px;
}

.h3 {
  font-family: Roboto;
}
</style>
