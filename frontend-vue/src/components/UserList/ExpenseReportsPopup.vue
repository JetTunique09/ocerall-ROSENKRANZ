<template>
    <div v-if="visible" class="popup-overlay">
      <div class="popup-content">
        <button @click="closePopup" class="btn-close">×</button>
        <h2>Notes de frais pour {{ userName }}</h2>
        <TableList>
          <ExpenseReportTableRow
            v-for="expenseReport in userExpenseReports"
            :key="expenseReport.id"
            :expenseReport="expenseReport"
            @edit="onEdit(expenseReport)"
            @delete="onDelete(expenseReport)"
          />
        </TableList>
      </div>
    </div>
  </template>
  
  <script>
  import TableList from '@/components/TableList/TableList.vue'
  import ExpenseReportTableRow from '@/components/TableList/ExpenseReportTableRow.vue'
  
  export default {
    components: {
      TableList,
      ExpenseReportTableRow
    },
    props: {
      user: {
        type: Object,
        required: true
      },
      expenseReports: {
        type: Array,
        required: true
      },
      visible: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      userName() {
        return this.user.firstName + ' ' + this.user.lastName
      },
      userExpenseReports() {
        return this.expenseReports.filter(report => report.user.iduser === this.user.iduser)
      }
    },
    methods: {
      closePopup() {
        this.$emit('close')
      },
      onEdit(expenseReport) {
        this.$emit('edit', expenseReport)
      },
      onDelete(expenseReport) {
        this.$emit('delete', expenseReport)
      }
    }
  }
  </script>
  
  <style scoped>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .popup-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 600px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    position: relative;
  }
  
  .btn-close {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
  </style>
  