import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router/index.js'

import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.use(Vuex)



export const store = new Vuex.Store({
  state: {
    currentUser: {
      status: localStorage.getItem('access_token') ? true : false,
      data: {}
    },
    token: localStorage.getItem('access_token') || null,
    userId: localStorage.getItem('userId') || null,
    userType: localStorage.getItem('userType') || null,
    nameAdmin: localStorage.getItem('nameAdmin') || null,
    users: [],
    loading: false,
    formError: ''
  },
  mutations: {
    createUser(state, user) {
      state.users.push(user)
    },
    setToken(state, token) {
      state.token = token
    },
    setUser(state, data) {
      state.currentUser.status = data.status
      state.currentUser.data = data.dataUser
      state.userType = data.userType
      
      // Verificamos si la respuesta viene con una clave users para guardarlos en el state
      if(data.users) {
        state.users = data.users
      }

      if(data.nameAdmin) {
        state.nameAdmin = data.nameAdmin
      }
    },
    setLoading(state, status) {
      state.loading = status
    },
    setErrorFormMessage(state, message) {
      state.formError = message
    },
    clearData(state) {
      state.currentUser.status = false
      state.currentUser.data = {}
    }
  },
  actions: {
    register(state, formData) {
      // Limpiamos el error anterior
      state.commit('setErrorFormMessage', '')

      // Mostramos el botón cargando
      state.commit('setLoading', true)

      const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: formData,
        url: 'http://174.138.39.59/form-api/api/v1/users/signup',
      };

      // Petición de registro
      axios(options).then(res => {
        if(res.statusText === 'Created'){
          // Muestra el loading
          state.commit('setLoading', false)

          // Redirección final
          router.push('/registered')
        }
      }).catch(() => {
        // Cambiamos el valor del loading a false
        state.commit('setLoading', false)
      })

    },
    login(state, credentials) {

      // Limpiamos el error anterior
      state.commit('setErrorFormMessage', '')

      // Mostramos el botón cargando
      state.commit('setLoading', true)

      // Petición login
      axios.post('http://174.138.39.59/form-api/api/v1/users/signin', {
        email: credentials.email,
        password: credentials.password
      })
        .then(function (response) {
          // let user = {}
          let token = ''
          let data = {}

          if (response.statusText === 'OK') {

            if(response.data.admin) {
              
              let dataAdmin = {
                status: true,
                dataUser: response.data.admin,
                users: response.data.users,
              }

              data = dataAdmin

            } else {
              data = {
                status: true,
                dataUser: response.data
              }
            }

            // user = response.data.user
            token = response.data.token

            // Guarda el access_token en localStorage
            localStorage.setItem('access_token', token)

            if(response.data.admin) {
              localStorage.setItem('userId', data.dataUser.iduser)
              // Aquí asignamos el valor que viene en la api como tipo de usuario como referencia para posteriores condiciones
              localStorage.setItem('userType', data.dataUser.type)
              data.userType = data.dataUser.type

              // Guardamos el nombre del admin
              localStorage.setItem('nameAdmin', data.dataUser.name)
              data.nameAdmin = data.dataUser.name
            } else {
              localStorage.setItem('userId', data.dataUser.user.iduser)

              // Aquí asignamos 2 como tipo de usuario como referencia para posteriores condiciones
              localStorage.setItem('userType', 2)
              data.userType = 2
            }
            
            // Add the following line:
            axios.defaults.headers.common['Authorization'] = token

            state.commit('setToken', token)
            state.commit('setUser', data)
            state.commit('setLoading', false)

            router.push('/dashboard')
          }

          // this.$router.push({name: 'Dashboard'})
        })
        .catch(function (error) {

          // Cambiamos el valor del loading a false
          state.commit('setLoading', false)

          // Agregamos el error de login
          let errorMessage = ''

          if(error.message === 'Request failed with status code 409') {
            errorMessage = 'Correo electrónico o contraseña incorrecto'
            state.commit('setErrorFormMessage', errorMessage)
          }
          
        });
    },
    logout(state) {
      return new Promise((resolve) => {
          localStorage.removeItem('access_token')
          localStorage.removeItem('userId')
          localStorage.removeItem('userType')
          localStorage.removeItem('nameAdmin')

          // remove the axios default header
          // delete axios.defaults.headers.common['Authorization']

          state.commit('clearData')
          
          state.commit('setLoading', false)

          router.push('/login')

          resolve()
      })
    }
  },
  modules: {
  }
})

// Recuperamos datos cuando el usuario recargue la página
/* if(store.state.userId) {
  console.log('Existe usuario')

  let userId = store.state.userId,
  url = `http://174.138.39.59/form-api/api/v1/users/${userId}`

  const config = {
      headers: { Authorization: `Bearer ${store.state.token}` }
  };

  axios.get(url, config)
  .then(res => {
    console.log(res)
  }).catch(error => {
    console.log(error)
  })

} else {
  console.log('No existe usuario')
} */