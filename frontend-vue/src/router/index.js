import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores/useAuthStore'; 

const router = createRouter({
  linkActiveClass: 'active text-primary border-bottom border-primary',
  linkExactActiveClass: 'active text-primary border-bottom border-primary border-3',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },

    },
    // l'unique route public
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/expenseReports',
      name: 'expenseReports',
      component: () => import('../views/ExpenseReportsView.vue'),
      meta: { requiresAuth: true },
    },
    // l'ordre de déclaration des routes est important,
    // car c'est l'ordre dans lequel les routes sont testées
    // il faut toujours déclarer les routes les plus générales en premier, et de plus en plus précis
    {
      path: '/edit-expenseReport',
      redirect: '/create-expenseReport'
    },
    // ici on déclare une route dynamique avec un paramètre :id
    {
      path: '/edit-expenseReport/:id',
      props: true, //sert à récupérer les paramètres sous la forme de props dans le composant de la vue
      name: 'edit-expenseReport',
      component: () => import('../views/EditExpenseReportView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/create-expenseReport/',
      name: 'create-expenseReport',
      component: () => import('../views/CreateExpenseReportView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/users/',
      name: 'users',
      component: () => import('../views/UsersView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/edit-user',
      redirect: '/create-user'
    },
    {
      path: '/edit-user/:id',
      props: true, //sert à récupérer les paramètres sous la forme de props dans le composant de la vue
      name: 'edit-user',
      component: () => import('../views/EditUserView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/create-user/',
      name: 'create-user',
      component: () => import('../views/CreateUserView.vue'),
      meta: { requiresAuth: true },

    },

    // redirection en cas d'url inconnu
    {
      path: '/:pathMatch(.*)*',redirect: '/'
    }
  ]
})

// protection des routes nécessitant l'authentification
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.user) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router
