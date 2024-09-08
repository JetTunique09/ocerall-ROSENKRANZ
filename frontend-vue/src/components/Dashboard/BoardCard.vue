<template>
  <div class="card bg-white">
    <div class="card-header">
      <h4>
        <span class="nb me-2">{{ nbExpenseReports }} </span>
        <span class="title me-4">Notes de frais <strong> ce mois-ci</strong></span>
        <span class="nb2 ms-5 me-2">{{ nbExpenseReports2 }} </span>
        <span class="title2 justify-content-end">Notes de frais <strong>cette année</strong></span>
      </h4>
    </div>
    <div class="card-body pt-0">
      <div class="row">
        <div class="col-6 d-flex flex-column align-items-center">
          <DonutTest class="size-donut" :categoryData="categoryData" />
          <div class="sommeExpenseReports mt-2">
            <span>{{ somExpenseReports }} €</span>
          </div>
        </div>
        <div class="col-6 d-flex flex-column align-items-center">
          <DonutTest class="size-donut" :categoryData="categoryData2" />
          <div class="sommeExpenseReports mt-2">
            <span>{{ somExpenseReports2 }} €</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <div class="legend-container">
        <!-- légende du MOIS -->
        <div class="legend-col">
          <h5 class="legend-title">Mois</h5>
          <div v-for="(percentage, category) in categoryLegend" :key="category" class="legend-item">
            <div :class="['color-box', category]"></div>
            <span>{{ category }}: {{ percentage }}%</span>
          </div>
        </div>
        <!-- légende de ANNEE-->
        <div class="legend-col">
          <h5 class="legend-title">Année</h5>
          <div v-for="(percentage, category) in categoryLegend2" :key="category" class="legend-item">
            <div :class="['color-box', category]"></div>
            <span>{{ category }}: {{ percentage }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useExpenseReportStore } from '@/stores/expenseReport.js';
import { mapActions, mapState } from 'pinia';
import DonutTest from '@/components/Dashboard/DonutTest.vue';

export default {
  components: {
    DonutTest,
  },
  data() {
    return {
      nbExpenseReports: 0,
      nbExpenseReports2: 0,
      categoryData: {
        categories: [],
        percentages: [],
      },
      categoryData2: {
        categories: [],
        percentages: [],
      },
      categoryColors: {
        parking: '#007bff',
        transport: '#dc3545',
        essence: '#ffc107',
        restauration: '#28a745',
        achat: '#17a2b8',
        hotel: '#6c757d',
      },
    };
  },
  computed: {
    ...mapState(useExpenseReportStore, ['expenseReports']),

    somExpenseReports() {
      const currentMonth = new Date().getMonth() + 1; 
      const currentYear = new Date().getFullYear();

      // filtre les dépenses MOIS
      const currentMonthExpenses = this.expenseReports.filter((expenseReport) => {
        const expenseDate = new Date(expenseReport.date);
        return expenseDate.getMonth() + 1 === currentMonth && expenseDate.getFullYear() === currentYear;
      });

      // calcule la somme des dépenses MOIS
      const total = currentMonthExpenses.reduce((acc, expenseReport) => acc + expenseReport.totalTTC, 0);
      return total.toFixed(2);
    },
    somExpenseReports2() {
      const currentYear = new Date().getFullYear(); 

      // filtre les dépenses de ANNEE
      const currentYearExpenses = this.expenseReports.filter((expenseReport) => {
        const expenseDate = new Date(expenseReport.date);
        return expenseDate.getFullYear() === currentYear;
      });

      // calculer la somme des dépenses ANNEE
      const total = currentYearExpenses.reduce((acc, expenseReport) => acc + expenseReport.totalTTC, 0);
      return total.toFixed(2);
    },
    categoryLegend() {
      // pourcentages pour chaque catégorie MOIS
      const legend = {};
      this.categoryData.categories.forEach((category, index) => {
        legend[category] = this.categoryData.percentages[index];
      });
      return legend;
    },
    categoryLegend2() {
      // pourcentages pour chaque catégorie ANNEE
      const legend = {};
      this.categoryData2.categories.forEach((category, index) => {
        legend[category] = this.categoryData2.percentages[index];
      });
      return legend;
    },
  },
  async mounted() {
    // récupération ds données de l'API
    await this.getAllExpenseReports();
  },
  methods: {
    ...mapActions(useExpenseReportStore, ['getAllExpenseReports']),
    getNbExpenseReports() {
      this.nbExpenseReports = this.expenseReports.length;
      this.calculateCategoryData();
      this.calculateCategoryData2();
    },

    // MOIS
    calculateCategoryData() {
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear(); 

      // filtre les notes de frais
      const currentMonthExpenses = this.expenseReports.filter((expenseReport) => {
        const expenseDate = new Date(expenseReport.date);
        return expenseDate.getMonth() + 1 === currentMonth && expenseDate.getFullYear() === currentYear;
      });

      this.nbExpenseReports = currentMonthExpenses.length;

      if (this.nbExpenseReports === 0) {
        this.categoryData = { categories: [], percentages: [] };
        return;
      }

      const categories = ['parking', 'transport', 'essence', 'restauration', 'achat', 'hotel'];

      // calcul le nombre de notes de frais de chaque catégorie
      const counts = categories.map((category) =>
        currentMonthExpenses.filter((exp) => exp.category === category).length
      );

      // conversion
      const percentages = counts.map((count) => ((count / this.nbExpenseReports) * 100).toFixed(1));

      // maj des données pour donut
      this.categoryData = {
        categories,
        percentages,
      };
    },


    // meme que mois j'ai ajouté 2
    calculateCategoryData2() {
      const currentYear = new Date().getFullYear();

      // filtre les notes de frais
      const currentYearExpenses = this.expenseReports.filter((expenseReport) => {
        const expenseDate = new Date(expenseReport.date);
        return expenseDate.getFullYear() === currentYear;
      });

      this.nbExpenseReports2 = currentYearExpenses.length;

      if (this.nbExpenseReports2 === 0) {
        this.categoryData2 = { categories: [], percentages: [] };
        return;
      }

      const categories = ['parking', 'transport', 'essence', 'restauration', 'achat', 'hotel'];

      // calcule le nombre de notes de frais de chaque catégorie
      const counts2 = categories.map((category) =>
        currentYearExpenses.filter((exp) => exp.category === category).length
      );

      // conversion en pourcentage
      const percentages2 = counts2.map((count) => ((count / this.nbExpenseReports2) * 100).toFixed(1));

      this.categoryData2 = {
        categories,
        percentages: percentages2,
      };
    },
  },
  watch: {
    // appel à chaque fois qu'il y a un changement pourn maj
    expenseReports() {
      this.getNbExpenseReports();
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

.card {
  font-family: 'Roboto', sans-serif;
  width: 600px;
  display: flex;
  flex-direction: column;
}

/* HEADER DE LA CARD */
.card-header {
  background-color: white;
  border-bottom: none;
}
.nb {
  font-size: 28px;
  font-weight: bold;
}
.nb2 {
  font-size: 28px;
  font-weight: bold;
}

.title {
  font-size: 16px;
}

.title2 {
  font-size: 16px;
}

/* BODY DE LA CARD */
.sommeExpenseReports {
  font-weight: bold;
  font-size: larger;
  color: rgb(9, 9, 92);
}

.size-donut {
  width: 150px;
  height: 150px;
}

/* FOOTER DE LA CARD */
.card-footer {
  background-color: white;
  border-top: none;
}

.legend-container {
  display: flex;
  justify-content: space-between;
}

.legend-col {
  flex: 1;
  margin: 0 10px;
}

.legend-title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.color-box {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
}
.parking {
  background-color: #007bff;
}
.transport {
  background-color: #dc3545;
}
.essence {
  background-color: #ffc107;
}
.restauration {
  background-color: #28a745;
}
.achat {
  background-color: #17a2b8;
}
.hotel {
  background-color: #6c757d;
}
</style>
