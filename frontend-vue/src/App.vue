<template>
  <div class="container py-4 bg-light-gray">
    <PageHeader v-if="isUserLoggedIn" />

    <div class="p-4">
      <RouterView />
    </div>
  </div>
</template>

<script>
import { RouterView } from 'vue-router';
import PageHeader from '@/components/PageHeader.vue';
import { useAuthStore } from '@/stores/useAuthStore'; 

export default {
  components: {
    PageHeader,
    RouterView,
  },
  data() {
    return {
      authStore: useAuthStore(), 
    };
  },
  computed: {
    // vérifie l'état de l'utilisateur
    isUserLoggedIn() {
      return !!this.authStore.user;
    },
  },
  async mounted() {
    try {
      const datas = await this.$http.get('/expenseReports');
      console.log(datas);
    } catch (error) {
      console.error('Erreur lors de la récupération des notes de frais !', error);
    }
  },
};
</script>

<style scoped>
.bg-light-gray {
  background-color: #f8f9fa;
}
</style>
