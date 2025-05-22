import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// Arquivo para a configuração e configuração das rotas
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/editclass',
      name: 'editclass',
      component: () => import('../views/EditClass.vue'),
    },
    {
      path: '/listadealunos',
      name: 'listadealunos',
      component: () => import('../views/ListStudents.vue'),
    },
  ],
})

export default router
