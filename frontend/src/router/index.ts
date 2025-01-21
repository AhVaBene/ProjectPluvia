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

async function isTokenValid(): Promise<Boolean> {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if(token == '' || user == '') {
    return false;
  }

  const decoded: string = await axios.get("http://localhost:3000/users/token/" + token).then(res => {
    return res.data;
  }).catch(e => {
    console.log(e)
    return '';
  });
  
  return decoded == user;
}

router.beforeEach(async function (to, from) {
  const auth: Boolean = await isTokenValid();
  console.log('beforeEach', "from: " + from.path + ", to: " + to.path + 
    ' - Auth: ' + localStorage.getItem('token') + " for user " + localStorage.getItem('user') + " => " + auth)
  if ((to.path !== '/login' && to.path !== 'login') && !auth) {
    return { path: '/login' }

  } else if ((to.path === '/login' || to.path === 'login') && auth) {
    return { path: '/' }

  } else {
    return true
  }
})

export default router
