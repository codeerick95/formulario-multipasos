import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [
    {
        id: 1,
        status: 'Validado',
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
        course: 'Javascript'
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
        typeCourse: 'Online',
        course: 'Marketing'
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
        typeCourse: 'Online',
        course: 'Programación'
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
        typeCourse: 'Online',
        course: 'Programación'
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
        course: 'Inglés'
    }
    ]
  },
  mutations: {
    createUser (state, user) {
        state.users.push(user)
    }
  },
  actions: {
  },
  modules: {
  }
})
