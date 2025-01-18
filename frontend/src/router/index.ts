import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    }
  ],
})

router.beforeEach(function (to, from, next) {
  console.log('beforeEach', to.path + ' - Auth: ' + localStorage.getItem('token'))
  if ((to.path !== '/login' && to.path !== 'login') && !localStorage.getItem('token')) {
    next({ path: '/login' })
  } else if ((to.path === '/login' || to.path === 'login') && localStorage.getItem('token')) {
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
