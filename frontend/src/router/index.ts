import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import axios from 'axios';

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

async function getUser(): Promise<string> {
  const token = localStorage.getItem('token');
  try{
    const res = (await axios.get("http://localhost:3000/users/token/" + token)).data
    return res.username;
  } catch (err) {
    console.log("ERR: " + err)
    return "";
  }
}

async function isTokenValid(): Promise<Boolean> {
  const user = localStorage.getItem('user');

  const decoded = await getUser();
    
  return decoded == user;
}

router.beforeEach(async function (to, from) {
  //console.log('beforeEach', to.path + ' - Auth: ' + localStorage.getItem('token'))
  if ((to.path !== '/login' && to.path !== 'login') && !isTokenValid()) {
    return { path: '/login' }

  } else if ((to.path === '/login' || to.path === 'login') && await isTokenValid()) {
    return { path: '/' }

  } else {
    return true
  }
})

export default router
