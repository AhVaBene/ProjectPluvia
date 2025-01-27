import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import axios from 'axios';
import ProfileView from '@/views/ProfileView.vue';
import MapView from '@/views/MapView.vue';
import CreateView from '@/views/CreateView.vue';
import NotificationsView from '@/views/NotificationsView.vue';
import SearchView from '@/views/SearchView.vue';
import NotFound from '@/views/NotFound.vue';

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
    },
    {
      path: "/profile",
      name: "Profile",
      component: ProfileView,
    },
    {
      path: "/map/:latlngzoom",
      name: "Map",
      component: MapView,
    },
    {
      path: "/createReport",
      name: "CreateReport",
      component: CreateView,
    },
    {
      path: "/search",
      name: "Search",
      component: SearchView,
    },
    {
      path: "/notifications",
      name: "Notifications",
      component: NotificationsView,
    },
    { path: '/:pathMatch(.*)*', component: NotFound }
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
    ' - Auth: ' + localStorage.getItem('user') + " => " + auth)
  if ((to.path !== '/login' && to.path !== 'login') && !auth) {
    return { path: '/login' }

  } else if ((to.path === '/login' || to.path === 'login') && auth) {
    return { path: '/' }

  } else {
    return true
  }
})

export default router
