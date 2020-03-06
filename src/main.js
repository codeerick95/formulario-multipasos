import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

// import Vuelidate from 'vuelidate'
// Vue.use(Vuelidate)

// Vee validate
import { ValidationProvider, extend, configure } from 'vee-validate';
import { required, email, numeric} from 'vee-validate/dist/rules';

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})

extend('required', {
  ...required,
  message: 'Este campo es requerido'
});

extend('email', {
  ...email,
  message: 'Debe proporcionar un email válido'
});

extend('numeric', {
  ...numeric,
  message: 'Debe ingresar un número válido'
});

extend('min', {
  validate(value, { length }) {
    return value.length >= length;
  },
  params: ['length'],
  message: 'El campo debe tener mínimo {length} números'
});

// Register it globally
Vue.component('ValidationProvider', ValidationProvider);

import 'bootstrap/dist/css/bootstrap.css'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
