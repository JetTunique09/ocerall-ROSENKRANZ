import { defineStore } from 'pinia'
//libraries uuid avec npm install uuid
// import { v4 as uuidv4 } from 'uuid'

export const useExpenseReportStore = defineStore('expenseReport', {
  state: () => ({
    expenseReports: [],
    expenseReport: null,
    lastExpenseReportNum: 0, 
  }),
  getters: {},
  actions: {
    // récupère les données depuis l'API : fonction asynchrone
    async getAllExpenseReports() {
      const response = await this.$http.get('/expenseReports')
      this.expenseReports = response.data
    },
    // recuperer le dernier numero d'expenseReport
    async getLastExpenseReportNum() {
      const response = await this.$http.get('/expenseReports/lastnum');
      this.lastExpenseReportNum = response.data.num || 0;
    },
    //recup une note de frais dans le store au moment de l'édition
    async setExpenseReport(id) {
      // this.expenseReport = this.expenseReports.find((b) => b.id == parseInt(id))
      // si je modifie une expenseReport, je fais un appel à l"API pour récupérer les données :
      const response = await this.$http.get('/expenseReports/' + id)
      this.expenseReport = response.data
    },
    async onDeleteExpenseReport(expenseReport) {
      // on recherche l'index de la note de frais à supprimer, et on retourne un nouveau tableau de expenseReports sans celle-ci
      // this.expenseReports = this.expenseReports.filter((b) => b.id != expenseReport.id)
      const response = await this.$http.delete('/expenseReports/' + expenseReport.id)
      console.log(response.data)
      await this.getAllExpenseReports()
    },
    // recherche la note de frais correspondante dans le store, et enregistre les modifications
    async onUpdateExpenseReport(expenseReport) {
      const response = await this.$http.patch('/expenseReports/' + expenseReport.id, expenseReport)
      console.log(response.data)
      // je vidange la donnée d'édition d'une expenseReport
      this.expenseReport = null
      await this.getAllExpenseReports()
    },
    // ceée une nouvelle note de frais
    async onAddExpenseReport(expenseReport) {
      const response = await this.$http.post('/expenseReports', expenseReport)
      console.log(response.data)
      await this.getAllExpenseReports()
    },
  }
})

// != signifie "différent de en valeur "
// == signifie "égal à en valeur "
// === signifie "égal à en valeur et en type "
