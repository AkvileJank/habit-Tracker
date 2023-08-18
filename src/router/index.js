import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import NewHabit from '../components/CreateHabit.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/new-habit',
      name: 'NewHabit',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //   component: () => import('../views/AboutView.vue')
      component: NewHabit
    }
  ]
})

export default router
