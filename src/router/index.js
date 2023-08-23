import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/Homepage/HomePage.vue'
import NewHabit from '../views/CreateHabit/CreateHabit.vue'
import ManageHabits from '../views/ManageHabits.vue'
import store from '../components/Store.Js'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/',
      name: 'HomeInitial',
      component: HomePage },
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

router.beforeEach((to, from, next) => {
  // Check if the user is navigating to the root path ("/")
  if (to.path === '/') {
    next(`/date/${store.today}`);
  } else {
    // Allow navigation to proceed for other routes
    next();
  }
});

export default router
