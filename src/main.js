import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'

import axios from 'axios'

// URL base de Api
axios.defaults.baseURL = 'https://apiformulario.josejollja.com/public/api/v1';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// Bootstrap
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

import './scss/main.scss'

import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
