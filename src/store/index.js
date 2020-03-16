import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: {
      status: localStorage.getItem('access_token') ? true : false,
      data: {}
    },
    token: localStorage.getItem('access_token') || null,
    users: [
      {
        id: 1,
        status: 'Revisando',
        typeDocument: 'DNI',
        typeDocumentField: '71397374',
        name: 'Erick',
        lastname1: 'H',
        lastname2: 'L',
        date: '1995-09-12',
        email: 'erick@test.com',
        secondaryEmail: 'erick2@test.com',
        phone: '1234567',
        WorkPhone: '1234567',
        mobile: '981647313',
        business: 'Estudio Z',
        position: 'Programador',
        address: 'Sagrada Familia',
        city: 'Lima',
        province: 'Lima',
        country: 'Perú',
        observations: 'Observación',
        typeCourse: 'Presencial',
        course: 'CP010 - Preparación y Certificación SCRUM PRODUCT OWNER',
        payment: 'Total',
        currency: 'Dólares',
        amount: 1000,
        typePayment: 'transferencia',
        nroOperation: 1,
        datePayment: '1995-09-12',
        voucher: 'https://solucionestpv.mx/wp-content/uploads/2018/11/ticket-santander.jpg',
        bank: 'BCP'
      },
      {
        id: 2,
        status: 'Pendiente',
        typeDocument: 'DNI',
        typeDocumentField: '47874578',
        name: 'User 1',
        lastname1: 'last1',
        lastname2: 'last2',
        date: '1995-09-12',
        email: 'user1@test.com',
        secondaryEmail: 'user1@test.com',
        phone: '44551144',
        WorkPhone: '7555544',
        mobile: '981647315',
        business: 'Google',
        position: 'Programador',
        address: 'Address',
        city: 'Lima',
        province: 'Lima',
        country: 'Perú',
        observations: 'Observación',
        typeCourse: 'Virtual',
        course: 'CV010 - Digital Marketing Professional Certificate (DMPC)',
        payment: 'Total',
        currency: 'Dólares',
        amount: 1000,
        typePayment: 'transferencia',
        nroOperation: 1,
        datePayment: '1995-09-12',
        voucher: 'https://solucionestpv.mx/wp-content/uploads/2018/11/ticket-santander.jpg',
        bank: 'BCP'
      },
      {
        id: 3,
        status: 'Pendiente',
        typeDocument: 'DNI',
        typeDocumentField: '47874578',
        name: 'User 2',
        lastname1: 'last1',
        lastname2: 'last2',
        date: '1995-09-12',
        email: 'user2@test.com',
        secondaryEmail: 'user2@test.com',
        phone: '7456547',
        WorkPhone: '7444578',
        mobile: '981647317',
        business: 'Facebook',
        position: 'Ingeniero',
        address: 'Address',
        city: 'Lima',
        province: 'Lima',
        country: 'Perú',
        observations: 'Observación',
        typeCourse: 'Presencial',
        course: 'CP010 - Preparación y Certificación SCRUM PRODUCT OWNER',
        payment: 'Total',
        currency: 'Dólares',
        amount: 1000,
        typePayment: 'transferencia',
        nroOperation: 1,
        datePayment: '1995-09-12',
        voucher: 'https://solucionestpv.mx/wp-content/uploads/2018/11/ticket-santander.jpg',
        bank: 'BCP'
      },
      {
        id: 4,
        status: 'Pendiente',
        typeDocument: 'DNI',
        typeDocumentField: '47874578',
        name: 'User 3',
        lastname1: 'last1',
        lastname2: 'last2',
        date: '1995-09-12',
        email: 'user3@test.com',
        secondaryEmail: 'user3@test.com',
        phone: '1144778',
        WorkPhone: '1148784',
        mobile: '981647319',
        business: 'La agencia',
        position: 'Administrador',
        address: 'Address',
        city: 'Lima',
        province: 'Lima',
        country: 'Perú',
        observations: 'Observación',
        typeCourse: 'Presencial',
        course: 'CP010 - Preparación y Certificación SCRUM PRODUCT OWNER',
        payment: 'Total',
        currency: 'Dólares',
        amount: 1000,
        typePayment: 'transferencia',
        nroOperation: 1,
        datePayment: '1995-09-12',
        voucher: 'https://solucionestpv.mx/wp-content/uploads/2018/11/ticket-santander.jpg',
        bank: 'BCP'
      },
      {
        id: 5,
        status: 'Pendiente',
        typeDocument: 'DNI',
        typeDocumentField: '47874578',
        name: 'User 4',
        lastname1: 'last1',
        lastname2: 'last2',
        date: '1995-09-12',
        email: 'user4@test.com',
        secondaryEmail: 'user4@test.com',
        phone: '7498747',
        WorkPhone: '1457877',
        mobile: '987478747',
        business: 'Gobierno del Perú',
        position: 'Diseñador',
        address: 'Address',
        city: 'Lima',
        province: 'Lima',
        country: 'Perú',
        observations: 'Observación',
        typeCourse: 'Presencial',
        course: 'CP010 - Preparación y Certificación SCRUM PRODUCT OWNER',
        payment: 'Total',
        currency: 'Dólares',
        amount: 1000,
        typePayment: 'transferencia',
        nroOperation: 1,
        datePayment: '1995-09-12',
        voucher: 'https://solucionestpv.mx/wp-content/uploads/2018/11/ticket-santander.jpg',
        bank: 'BCP'
      }
    ]
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
    }
  },
  actions: {
    login(state, credentials) {
      axios.post('http://174.138.39.59/form-api/api/v1/users/signin', {
        email: credentials.email,
        password: credentials.password
      })
        .then(function (response) {
          // let user = {}
          let token = '',
          data = {
            status: true,
            dataUser: response.data.user
          }

          if (response.statusText === 'OK') {
            // user = response.data.user
            token = response.data.token

            localStorage.setItem('access_token', token)

            // Add the following line:
            axios.defaults.headers.common['Authorization'] = token

            state.commit('setToken', token)
            state.commit('setUser', data)

            router.push('/dashboard')
          }

          // this.$router.push({name: 'Dashboard'})
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    logout({state}) {
      return new Promise((resolve) => {
          localStorage.removeItem('access_token')

          // remove the axios default header
          delete axios.defaults.headers.common['Authorization']

          state.currentUser.status = false

          resolve()
      })
    }
  },
  modules: {
  }
})
