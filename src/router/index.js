import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppointmentsView from '../views/AppointmentsView.vue'
import TiresView from '../views/TiresView.vue'
import DetailsView from '../views/DetailsView.vue'

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
      name: 'manageAppointments',
      component: AppointmentsView
    },
    {
      path: '/tires',
      name: 'tires',
      component: TiresView
    },
    {
      path: '/appointments/:id',
      name: 'Details',
      component: DetailsView,
      props: true
    }
  ]
})

export default router
