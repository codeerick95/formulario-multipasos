<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-3">
        <img src="@/assets/logo.png" alt="Logo JB Enterprise Group" class="img-fluid w-75">
      </div>
    </div>
    <div class="row justify-content-center">
      <div :class="classColumns">
        <validation-observer v-slot="{ handleSubmit }">
          <form action="" @submit.prevent="handleSubmit(submit)">
            

            <div class="card">
              <div class="card-body">
                <h2 class="title">Registro de usuario</h2>
            <div class="controls mt-3">
              <!-- paso 1 -->
              <div class="custom-control custom-control-inline custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="step1" :disabled="step1.disabled" v-model="step1.value">
                <label class="custom-control-label" for="step1" @click="setCheck(1)"></label>
              </div>

              <!-- paso 2 -->
              <div class="custom-control custom-control-inline custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="step2" :disabled="step2.disabled" v-model="step2.value">
                <label class="custom-control-label" for="step2" @click="setCheck(2)"></label>
              </div>

              <!-- paso 3 -->
              <div class="custom-control custom-control-inline custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="step3" :disabled="step3.disabled" v-model="step3.value">
                <label class="custom-control-label" for="step3" @click="setCheck(3)"></label>
              </div>

              <!-- paso 4 -->
              <div class="custom-control custom-control-inline custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="step4" :disabled="step4.disabled" v-model="step4.value">
                <label class="custom-control-label" for="step4" @click="setCheck(4)"></label>
              </div>

              <!-- paso 5 -->
              <div class="custom-control custom-control-inline custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="step5" :disabled="step5.disabled" v-model="step5.value" checked="true">
                <label class="custom-control-label" for="step5" @click="setCheck(5)"></label>
              </div>
            </div>

            <!-- Campos de formulario -->
            <h3 class="lead my-4 text-muted">{{ setSubtitle }}</h3>

            <!-- Paso 1 -->
            <div class="step1" v-if="currentView === 1">
              <div class="form-row">

                <!-- Select tipo de documento -->
                <div class="col-md-6">
                  <div class="form-group">
                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <select class="custom-select" v-model="step1.typeDocument" @change="changeInputDocument()">
                        <option value="">Tipo de documento</option>
                        <option value="DNI">DNI</option>
                        <option value="PASAPORTE">Pasaporte</option>
                        <option value="CE">C.E.</option>
                      </select>
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>
                <!----------------->

                <!-- Campo tipo de documento -->
                <div class="col-md-6">
                  <div class="form-group">
                    <ValidationProvider rules="required|numeric|min:8" v-slot="{ errors }" v-if="step1.selectTypeDocument === 'DNI' ">
                      <input v-model=" step1.typeDocumentField" type="number" placeholder="DNI" class="form-control">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <ValidationProvider rules="required|numeric|min:10" v-slot="{ errors }" v-if="step1.selectTypeDocument === 'PT' ">
                      <input v-model=" step1.typeDocumentField" type="number" placeholder="Pasaporte" class="form-control">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                    <ValidationProvider rules="required|numeric|min:8" v-slot="{ errors }" v-if="step1.selectTypeDocument === 'CE' ">
                      <input v-model=" step1.typeDocumentField" type="number" placeholder="Carnet de extranjería" class="form-control">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>
                <!-- 
                <div class="col-md-6">
                  <div class="form-group">
                    <ValidationProvider rules="required|email" v-slot="{ errors }">
                      <input v-model="step1.typeDocumentField" type="email" placeholder="DNI" class="form-control">
                      <span>{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div> -->
                <!----------------->

              </div>
            </div>

            <!-- Paso 2 -->
            <div class="step2" v-if="currentView === 2">
              <div class="form-row">

                <div class="col-md-6">
                  <div class="form-group">
                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <input v-model="step2.name" type="text" placeholder="Nombre" class="form-control">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <input v-model="step2.lastname1" type="text" placeholder="Apellido paterno" class="form-control">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>

              </div>

              <div class="form-row">

                <div class="col-md-6">
                  <div class="form-group">
                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <input v-model="step2.lastname2" type="text" placeholder="Apellido materno" class="form-control">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="col-md-6">
                  <ValidationProvider rules="required" v-slot="{ errors }">
                    <input type="date" v-model="step2.date" class="form-control" />
                    <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                </div>

              </div>
            </div>
            <!-------------->

            <!-- Paso 3 -->
            <div class="step3" v-if="currentView === 3">
              <div class="form-row">

                <div class="col-md-6">
                  <div class="form-group">
                    <ValidationProvider rules="required|email" v-slot="{ errors }">
                      <input v-model="step3.email" type="email" placeholder="Email principal" class="form-control">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <ValidationProvider rules="required|email" v-slot="{ errors }">
                      <input v-model="step3.secondaryEmail" type="email" placeholder="Email secundario" class="form-control">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>

              </div>

              <div class="form-row">

                <div class="col-md-6">
                  <div class="form-group">
                    <ValidationProvider rules="required|numeric|min:8" v-slot="{ errors }">
                      <input v-model="step3.phone" type="number" placeholder="Teléfono principal" class="form-control">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <ValidationProvider rules="required|numeric|min:8" v-slot="{ errors }">
                        <input v-model="step3.WorkPhone" type="number" placeholder="Teléfono principal" class="form-control">
                        <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>

              </div>

              <div class="form-row">

                <div class="col-md-6">
                  <div class="form-group">
                    <ValidationProvider rules="required|numeric|min:9" v-slot="{ errors }">
                      <input v-model="step3.mobile" type="number" placeholder="Celular" class="form-control">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>

              </div>
            </div>

            <!-- Paso 4 -->
            <div class="step4" v-if="currentView === 4">
              <div class="form-row">

                <div class="col-md-6">
                  <div class="form-group">
                    <ValidationProvider v-slot="{ errors }">
                      <input v-model="step4.business" type="text" placeholder="Empresa" class="form-control">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <ValidationProvider v-slot="{ errors }">
                      <input v-model="step4.position" type="text" placeholder="Cargo" class="form-control">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>

              </div>

              <div class="form-row">

                <div class="col-md-6">
                  <div class="form-group">
                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <input v-model="step4.address" type="text" placeholder="Dirección" class="form-control">
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <ValidationProvider rules="required" v-slot="{ errors }">
                      <select class="custom-select" v-model="step4.city">
                        <option value="">Ciudad</option>
                        <option value="Ciudad 1">Ciudad 1</option>
                        <option value="Ciudad 2">Ciudad 2</option>
                        <option value="Ciudad 3">Ciudad 3</option>
                      </select>
                      <span class="text-danger">{{ errors[0] }}</span>
                    </ValidationProvider>
                  </div>
                </div>

              </div>

              <div class="form-row">

                <div class="col-md-6">
                  <div class="form-group">
                    <ValidationProvider rules="required" v-slot="{ errors }">
                    <select class="custom-select" v-model="step4.province">
                      <option value="">Estado/Provincia</option>
                      <option value="Provincia 1">Provincia 1</option>
                      <option value="Provincia 2">Provincia 2</option>
                      <option value="Provincia 3">Provincia 3</option>
                    </select>
                    <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <ValidationProvider rules="required" v-slot="{ errors }">
                    <select class="custom-select" v-model="step4.country">
                      <option value="">País</option>
                      <option value="Perú">Perú</option>
                      <option value="Argentina">Argentina</option>
                      <option value="España">España</option>
                    </select>
                    <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                  </div>
                </div>

              </div>

              <div class="form-row">

                <div class="col">
                  <div class="form-group">
                    <ValidationProvider rules="required" v-slot="{ errors }">
                    <textarea v-model="step4.observations" class="form-control" placeholder="Observaciones"></textarea>
                    <span class="text-danger">{{ errors[0] }}</span>
                  </ValidationProvider>
                  </div>
                </div>

              </div>
            </div>

            <!-- Paso 5 -->
            <div class="step5" v-if="currentView === 5">
              <div class="card">
                <div class="card-body text-left">

                  <div class="row justify-content-center">

                    <div class="col-md-5 mb-5">
                      <!-- Datos de identificación -->
                      <h3 class="font-weight-bold lead mb-3">Datos de identificación</h3>
                      <p>
                        <span class="text-muted mr-3">Tipo de documento:</span>
                        <span>{{ step1.typeDocument }}</span>
                      </p>
                      <p>
                        <span class="text-muted mr-3">Número de documento:</span>
                        <span>{{ step1.typeDocumentField }}</span>
                      </p>
                    </div>

                    <div class="col-md-5 mb-5">
                      <!-- Datos personales -->

                      <h3 class="font-weight-bold lead mb-3">Datos personales</h3>
                      <p>
                        <span class="text-muted mr-3">Nombre:</span>
                        <span>{{ step2.name }}</span>
                      </p>
                      <p>
                        <span class="text-muted mr-3">Apellidos:</span>
                        <span>{{ step2.lastname1 }} {{ step2.lastname2 }}</span>
                      </p>
                      <p>
                        <span class="text-muted mr-1 mr-md-3">Fecha de nacimiento:</span>
                        <span>{{ step2.date }}</span>
                      </p>
                    </div>

                    <div class="col-md-5 mb-5">
                      <!-- Datos de contacto -->
                      <h3 class="font-weight-bold lead mb-3">Datos de contacto</h3>
                      <p>
                        <span class="text-muted mr-3">Email principal:</span>
                        <span>{{ step3.email }}</span>
                      </p>
                      <p>
                        <span class="text-muted mr-3">Email secundario:</span>
                        <span>{{ step3.secondaryEmail }}</span>
                      </p>
                      <p>
                        <span class="text-muted mr-3">Teléfono particular:</span>
                        <span>{{ step3.phone }}</span>
                      </p>
                      <p>
                        <span class="text-muted mr-3">Teléfono de trabajo:</span>
                        <span>{{ step3.WorkPhone }}</span>
                      </p>
                      <p>
                        <span class="text-muted mr-3">Celular:</span>
                        <span>{{ step3.mobile }}</span>
                      </p>
                    </div>

                    <div class="col-md-5 mb-5">
                      <!-- Datos de ubicación -->
                      <h3 class="font-weight-bold lead mb-3">Datos de ubicación</h3>
                      <p>
                        <span class="text-muted mr-3">Empresa:</span>
                        <span>{{ step4.business }}</span>
                      </p>
                      <p>
                        <span class="text-muted mr-3">Cargo:</span>
                        <span>{{ step4.position }}</span>
                      </p>
                      <p>
                        <span class="text-muted mr-3">Dirección:</span>
                        <span>{{ step4.address }}</span>
                      </p>
                      <p>
                        <span class="text-muted mr-3">Ciudad:</span>
                        <span>{{ step4.city }}</span>
                      </p>
                      <p>
                        <span class="text-muted mr-3">Estado/Provincia:</span>
                        <span>{{ step4.province }}</span>
                      </p>
                      <p>
                        <span class="text-muted mr-3">País:</span>
                        <span>{{ step4.country }}</span>
                      </p>
                      <div class="bg-light">
                        <span class="text-muted mr-3">Observaciones:</span>
                        <span>{{ step4.country }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
              </div>
            </div>


            <!-- Submit -->
            <div class="form-group mt-4">
              <input type="submit" class="btn btn-dark" :value="setButtonText" data-toggle="tooltip" data-placement="top" title="Complete los campos para continuar">
            </div>

            <div class="form-group mt-4">
              <router-link :to="{name: 'Login'}">Ya tengo una cuenta</router-link>
            </div>

          </form>
        </validation-observer>
      </div>
    </div>
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { ValidationObserver } from 'vee-validate';

export default {
  name: 'Home',
  components: {
    ValidationObserver
  },
  data() {
    return {
      currentView: 1,
      step1: {
        value: true,
        current: true,
        disabled: false,
        completed: false,
        typeDocument: '',
        typeDocumentField: '',
        selectTypeDocument: 'DNI'
      },
      step2: {
        value: false,
        current: false,
        disabled: true,
        completed: false,
        name: '',
        lastname1: '',
        lastname2: '',
        date: '',
      },
      step3: {
        value: false,
        current: false,
        disabled: true,
        completed: false,
        email: '',
        secondaryEmail: '',
        phone: '',
        WorkPhone: '',
        mobile: ''
      },
      step4: {
        value: false,
        current: false,
        disabled: true,
        completed: false,
        business: '',
        position: '',
        address: '',
        city: '',
        province: '',
        country: '',
        observations: ''
      },
      step5: {
        value: false,
        current: false,
        disabled: true
      }
    }
  },
  computed: {
    setSubtitle: function() {
      let subtitle = ''

      if(this.currentView === 1) {
        subtitle = 'Identificación'
      } else if(this.currentView === 2) {
        subtitle = 'Datos personales'
      } else if(this.currentView === 3) {
        subtitle = 'Datos de contacto'
      } else if(this.currentView === 4) {
        subtitle = 'Datos de ubicación'
      } else if(this.currentView === 5) {
        subtitle = 'Verificación de datos'
      }
      return subtitle
    },
    classColumns: function() {
      let cols = 7

      if(this.currentView === 5) {
        cols = 12
      }

      return `col-md-${cols}`
    },
    setButtonText: function() {
      let text = 'Siguiente'

      if(this.currentView === 5) {
        text = 'Registrarme'
      }

      return text
    }
  },
  methods: {
    changeInputDocument() {
      this.step1.typeDocumentField = ''
      
      if(this.step1.typeDocument === 'DNI') {
        this.step1.selectTypeDocument = 'DNI'
      } else if(this.step1.typeDocument === 'PASAPORTE') {
        this.step1.selectTypeDocument = 'PT'
      } else if(this.step1.typeDocument === 'CE') {
        this.step1.selectTypeDocument = 'CE'
      }
    },
    submit() {
      if(this.currentView === 1) {
        this.step1.completed = true

        this.currentView = 2
        this.step2.disabled = false
        this.step2.value = true
      } else if(this.currentView === 2) {
        this.step2.completed = true

        this.currentView = 3
        this.step3.disabled = false
        this.step3.value = true
      } else if(this.currentView === 3) {
        this.step3.completed = true

        this.currentView = 4
        this.step4.disabled = false
        this.step4.value = true
      } else if(this.currentView === 4) {
        this.step4.completed = true

        this.currentView = 5
        this.step5.disabled = false
        this.step5.value = true
      } else if(this.currentView === 5) {
        if(this.step1.completed && this.step2.completed && this.step3.completed && this.step4.completed) {
          this.$router.push({name: 'Registered'})
        }
      }
    },
    setCheck(value) {
      if(value === 1) {
        this.step1.value = false
        this.step1.disabled = false
        this.currentView = value
      } else if(value === 2 && this.currentView > 1 || value === 2 && this.step1.completed) {
        this.step2.value = false
        this.step2.disabled = false
        this.currentView = value
      } else if(value === 3 && this.currentView > 2 || value === 3 && this.step2.completed) {
        this.step3.value = false
        this.step3.disabled = false
        this.currentView = value
      } else if(value === 4 && this.currentView > 3 || value === 4 && this.step3.completed) {
        this.step4.value = false
        this.step4.disabled = false
        this.currentView = value
      } else if(value === 5 && this.currentView > 4 || value === 5 && this.step4.completed) {
        this.step5.value = false
        this.step5.disabled = false
        this.currentView = value
      }
    }
  }
}
</script>

<style lang="scss">

select,
input.form-control,
input.custom-control-input {
  box-shadow: none !important;
  outline: none !important;
}

.custom-control-label {
  cursor: pointer;
  &::before {
    border-radius: 50% !important;
    background-color: #e63629 !important;

  }
}
</style>
