import 'leaflet/dist/leaflet.css';
import 'vue-map-ui/dist/normalize.css';
import 'vue-map-ui/dist/style.css';
import 'vue-map-ui/dist/theme-all.css';


import './assets/main.css'
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap"
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'mdb-vue-ui-kit/css/mdb.min.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import VueCryptojs from 'vue-cryptojs'
import App from './App.vue'
import router from './router'

createApp(App)
    .use(router)
    .use(createPinia())
    .use(VueCryptojs)
    .use(VueGoogleMaps, {
    load: {
      key: "AIzaSyBp0zuqne1wsZMqJzo8cxpG8GLvGpg7_W8",
      libraries: "places"
    }
  })
    .mount('#app')
