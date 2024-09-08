<template>
  <header class="bg-light-gray">
    <nav class="navbar navbar-expand-lg bg-light-gray">
      <div class="container-fluid bg-light-gray">
        <RouterLink
          class="navbar-brand"
          style="font-size: 60px"
          exactActiveClass=""
          to="/"
        >
          OCERALL
        </RouterLink>

        <ul class="navbar-nav ms-auto">
          <li class="nav-item ms-3">
            <RouterLink class="nav-link" to="/">
              <i class="fa-solid fa-house me-2"></i>Accueil
            </RouterLink>
          </li>
          <li class="nav-item ms-3">
            <RouterLink class="nav-link" to="/expenseReports">
              <i class="fa-solid fa-file me-2"></i>Notes de frais
            </RouterLink>
          </li>
          <li class="nav-item ms-3">
            <RouterLink class="nav-link" to="/users">
              <i class="fa-solid fa-users me-2"></i>Utilisateurs
            </RouterLink>
          </li>
          <li class="nav-item ms-3">
            <button @click="logout" class="btn btn-link nav-link">
              <i class="fa-solid fa-sign-out-alt me-2"></i>Déconnexion
            </button>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/useAuthStore'; 

const authStore = useAuthStore();

const logout = async () => {
  await authStore.logout();
};
</script>

<style scoped>
.bg-light-gray {
  background-color: #f8f9fa;
}

.nav-link,
.navbar-brand {
  color: #000000 !important;
}

.router-link-active,
.router-link-exact-active {
  color: #5DB7DE !important;
}

.router-link-active i,
.router-link-exact-active i {
  color: #5DB7DE !important;
}

.nav-link:hover,
.navbar-brand:hover {
  color: #5DB7DE !important;
}
</style>
