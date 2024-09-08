<!-- Composant de l'en tête -->
<template>
  <table class="table">
    <thead>
      <tr>
        <!-- pour personnaliser éventuellement l'entête du tableau, on pourra utiliser le slot thead avec <template #thead></template> -->
        <slot name="thead">
          <th>Nom</th>
          <th>Site</th>
          <th>Service</th>
          <th class="text-end">Actions</th>
        </slot>
      </tr>
    </thead>
    <tbody>
      <!-- affichage des lignes de tableau APPEL de ExpenseReportTableRow.vue dans composant parents -->
      <!-- Ce slot permet au composant parent (ExpenseReportsView.vue) d'insérer les lignes de note de fraiss (ExpenseReportTableRow)
         directement dans le tableau. -->
      <slot />
    </tbody>
  </table>
</template>

<script>
export default {}
</script>

<style scoped></style>
