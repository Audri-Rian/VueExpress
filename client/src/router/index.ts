import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// Arquivo para a configuração e configuração das rotas
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/login/index.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/auth/register/index.vue')
    },
    {
      path: '/configuracoes',
      name: 'configuracoes',
      component: () => import('../views/Settings.vue')
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/editclass',
      name: 'editclass',
      component: () => import('../views/EditClass.vue')
    },
    {
      path: '/listadealunos',
      name: 'listadealunos',
      component: () => import('../views/ListStudents.vue')
    },
    {
      path: '/createcurse',
      name: 'createcurse',
      component: () => import('../views/CreateCurse.vue')
    },
    {
      path: '/notas',
      name: 'notas',
      component: () => import('../views/EditNotes.vue')
    },
    {
      path: '/frequencia',
      name: 'frequencia',
      component: () => import('../views/EditFrequency.vue')
    }
  ]
})

export default router
