import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router/index.js'

import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    currentUser: {
      userId: localStorage.getItem('userId') || null,
      type: localStorage.getItem('userType') || null, // Este campo se crea porque la Api no devuelve que tipo de usuario
      status: localStorage.getItem('access_token') ? true : false,
      data: {}
    },
    token: localStorage.getItem('access_token') || null,
    headerName: localStorage.getItem('headerName') || null, // Este campo se crea para guardar el nombre del administrador
    users: [],
    loading: false,
    formError: '' // Para el manejo de errores en login y register
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUser(state, data) {
      // Asignamos datos al state
      state.currentUser.status = data.status
      state.currentUser.data = data.dataUser
      state.currentUser.type = data.userType

      if(data.userId) {
        state.currentUser.userId = data.userId
      }
      
      // Verificamos si la respuesta viene con una clave users para guardarlos en el state
      if(data.users) {
        state.users = data.users
      }

      // Verificamos si la respuesta viene con una clave nameAdmin para guardarlos en el state
      if(data.headerName) {
        state.headerName = data.headerName
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
      // Limpia los datos del state
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
        url: '/users/signup',
      };

      // Petición de registro
      axios(options).then(() => {
        // Muestra el loading
        state.commit('setLoading', false)

        // Redirección final
        router.push('/registered')
      }).catch(error => {
        // Agregamos el error de error
        if(error.message === 'Request failed with status code 422') {

          let errorMessage = 'El correo electrónico ya está registrado'

          // Envía el mensaje de error
          state.commit('setErrorFormMessage', errorMessage)
        }
        // Cambiamos el valor del loading a false
        state.commit('setLoading', false)
      })

    },
    login(state, credentials) {

      // Limpiamos el error anterior
      state.commit('setErrorFormMessage', '')

      // Mostramos el botón cargando
      state.commit('setLoading', true)

      let data =  {
        email: credentials.email,
        password: credentials.password
      }

      let config = {
        method: 'POST',
        url: '/users/signin',
        data,
      }

      // Petición login
      axios(config)
        .then(function (response) {
          // let user = {}
          let token = '',
          data = {}

          // Si la respuesta fue exitosa
          // Asignamos el token
          token = response.data.token

          // Guarda el access_token en localStorage
         localStorage.setItem('access_token', token)

         // Verifiacmos si la respuesta trae un user o admin
         if(response.data.admin) {
           
           data = {
             status: true,
             dataUser: response.data.admin,
             users: response.data.users,
             userType: response.data.admin.type,
             headerName: response.data.admin.name,
           }

           // Guarda el id del usuario autenticado para realizar peticiones posteriores
           localStorage.setItem('userId', data.dataUser.iduser)

           // Aquí asignamos el valor que viene en la api como tipo de usuario como referencia para posteriores condiciones
           localStorage.setItem('userType', data.dataUser.type)

           // Guardamos el nombre del admin
           localStorage.setItem('headerName', data.headerName)

         } else {

           data = {
             userId: response.data.user.iduser,
             status: true,
             dataUser: response.data.user,
             userType: 2,
             headerName: response.data.user.name,
           }

           // Guarda el id del usuario autenticado para realizar peticiones posteriores
           localStorage.setItem('userId', data.dataUser.iduser)

           // Aquí asignamos 2 como tipo de usuario como referencia para posteriores condiciones
           localStorage.setItem('userType', 2)

           // Guardamos el nombre del admin
           localStorage.setItem('headerName', data.headerName)
         }

         // Autorización por token
         axios.defaults.headers.common['Authorization'] = token

         state.commit('setToken', token)

         state.commit('setUser', data)

         // Cambia el valor de loading
         state.commit('setLoading', false)

         router.push('/dashboard')
        })
        .catch(function (error) {
          // Cambiamos el valor del loading a false
          state.commit('setLoading', false)

          // Agregamos el error de login
          if(error.message === 'Request failed with status code 409') {

            let errorMessage = 'Correo electrónico o contraseña incorrecto'

            // Envía el mensaje de error
            state.commit('setErrorFormMessage', errorMessage)
          } else if(error.message === 'Request failed with status code 404') {
            let errorMessage = 'La cuenta no existe'

            // Envía el mensaje de error
            state.commit('setErrorFormMessage', errorMessage)
          } else if(error.message === 'Network Error') {
            let errorMessage = 'Error con tu red de internet, inténtalo nuevamente.'

            // Envía el mensaje de error
            state.commit('setErrorFormMessage', errorMessage)
          }
          
        });
    },
    logout(state) {
      return new Promise((resolve) => {

          // Limpiamos local storage
          localStorage.removeItem('access_token')
          localStorage.removeItem('userId')
          localStorage.removeItem('userType')
          localStorage.removeItem('headerName')

          // remove the axios default header
          delete axios.defaults.headers.common['Authorization']

          // Envía confirmación para limpiar datos del state
          state.commit('clearData')
          
          // Cancela el loading
          state.commit('setLoading', false)

          router.push('/login')
          
          resolve()
      })
    }
  }
})