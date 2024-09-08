<template>
  <div>
    <!-- titre et bouton ajouter -->
    <div class="row pb-3 mb-3 mt-4">
      <div class="col text-end">
        <router-link to="/create-user" class="btn btn-outline-primary">
          <i class="fa-solid fa-plus-circle me-2"></i>
          Ajouter un employé
        </router-link>
      </div>
    </div>

    <div v-if="showUsers" class="tableauList bg-white">
      <h2 class="h3 mt-2 mb-4 mx-2"><strong>Listes des employés</strong></h2>
      <TableauList>
        <UserTableRow
          v-for="user in users"
          :key="user.iduser"
          :user="user"
          @edit="onEditUser($event)"
          @delete="onDeleteUser($event)"
          @show-expenses="showUserExpenses($event)"
        />
      </TableauList>
    </div>
    <ExpenseReportsPopup
      :user="selectedUser"
      :expenseReports="expenseReports"
      :visible="showPopup"
      @close="showPopup = false"
      @edit="onEditExpenseReport"
      @delete="onDeleteExpenseReport"
    />
  </div>
</template>

<script>
import UserTableRow from '@/components/UserList/UserTableRow.vue'
import TableauList from '@/components/UserList/TableauList.vue'
import ExpenseReportsPopup from '@/components/UserList/ExpenseReportsPopup.vue'

// Import du store
import { useUserStore } from '@/stores/users.js'
import { useExpenseReportStore } from '@/stores/expenseReport.js'
// Import du mapState, mapActions et mapWritableState du plugin Pinia
import { mapActions, mapState } from 'pinia'

export default {
  components: {
    TableauList,
    UserTableRow,
    ExpenseReportsPopup
  },
  data() {
    return {
      showUsers: true,
      showPopup: false,
      selectedUser: null
    }
  },
  computed: {
    ...mapState(useUserStore, ['users']),
    ...mapState(useExpenseReportStore, ['expenseReports'])
  },
  async mounted() {
    await this.getAllUsers()
    await this.getAllExpenseReports()
  },
  methods: {
    ...mapActions(useUserStore, ['onDeleteUser', 'setUser', 'getAllUsers']),
    ...mapActions(useExpenseReportStore, ['getAllExpenseReports', 'onDeleteExpenseReport']),
    onEditUser(user) {
      console.log('edit user with id: ', user.iduser)
      //this.setUser(user.iduser)
      this.$router.push({
        name: 'edit-user',
        params: {
          id: user.iduser
        }
      })
    },
    showUserExpenses(user) {
      this.selectedUser = user
      this.showPopup = true
    },
    onEditExpenseReport(expenseReport) {
      console.log('edit expenseReport with id: ', expenseReport.id)
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
