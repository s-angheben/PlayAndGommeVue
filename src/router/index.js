import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import AppointmentsView from '../views/Appointments/AppointmentsView.vue'
import DetailsApp from '../views/Appointments/DetailsApp.vue'

import TiresView from '../views/Tires/TiresView.vue'
import DetailsTire from '../views/Tires/DetailsTire.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/appointments',
      name: 'appointments',
      component: AppointmentsView
    },
    {
      path: '/tires',
      name: 'tires',
      component: TiresView
    },
    {
      path: '/appointments/:id',
      name: 'DetailsApp',
      component: DetailsApp,
      props: true
    },
    {
      path: '/tires/:id',
      name: 'DetailsTire',
      component: DetailsTire,
      props: true
    }
  ]
})

export default router
