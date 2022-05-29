import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import AppointmentsView from '../views/Appointments/AppointmentsView.vue'
import DetailsApp from '../views/Appointments/DetailsApp.vue'
import AddApp from '../views/Appointments/AddApp.vue'

import TiresView from '../views/Tires/TiresView.vue'
import DetailsTire from '../views/Tires/DetailsTire.vue'
import AddTire from '../views/Tires/AddTire.vue'

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
    },
    {
      path: '/appointments/add',
      name: 'AddApp',
      component: AddApp,
      props: true
    },
    {
      path: '/tires/add',
      name: 'AddTire',
      component: AddTire,
      props: true
    }
  ]
})

export default router
