import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import NewHabit from '../components/CreateHabit.vue'
import ManageHabits from '../components/ManageHabits.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/new-habit',
      name: 'NewHabit',
      component: NewHabit
    },
    {
      path: '/date/:selectedDate',
      name: 'Homepage',
      component: HomePage
    },
    {
      path: '/date/:selectedDate/edit',
      name: 'Edit',
      component: ManageHabits
    }
  ]
})

export default router
