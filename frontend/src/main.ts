import './assets/main.css'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap"
import 'mdb-vue-ui-kit/css/mdb.min.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueCryptojs from 'vue-cryptojs'
import App from './App.vue'
import router from './router'

createApp(App)
    .use(router)
    .use(createPinia())
    .use(VueCryptojs)
    .mount('#app')
