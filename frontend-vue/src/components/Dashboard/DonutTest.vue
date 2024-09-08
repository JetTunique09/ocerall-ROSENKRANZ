<!-- installation -> npm install chart.js vue-chartjs 
   docs : https://vue-chartjs.org/guide/
        https://www.chartjs.org/docs/latest/samples/other-charts/doughnut.html -->

<template>
  <div>
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Tooltip, ArcElement } from 'chart.js'
import { useExpenseReportStore } from '@/stores/expenseReport.js'
import { mapState } from 'pinia'

ChartJS.register(Tooltip, ArcElement)
//le module tooltip affiche les infos au survol du donut
//repris du sample car utilise pour faire la forme arc

export default {
  components: {
    //composant vue-chartjs
    Doughnut
  },
  props: {
    categoryData: {
      type: Object,
      required: true
    }
  },
  computed: {
    //utilisation des données du store
    chartData() {
      // Utilise `categoryData` avec les labels et pourcentages mis à jour
      return {
        labels: this.categoryData.categories || [],
        datasets: [
          {
            backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745', '#17a2b8', '#6c757d'],
            data: this.categoryData.percentages || []
          }
        ]
      };
    },
    chartOptions() {
      return {
        responsive: true
      }
    }
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  margin: auto;
  height: 200px;
  width: 200px;
}
</style>
