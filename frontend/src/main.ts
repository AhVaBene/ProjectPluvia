import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

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

createApp(App)
    .use(router)
    .use(createPinia())
    .mount('#app')
