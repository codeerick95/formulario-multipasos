<template>
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
                    <input type="checkbox" class="custom-control-input" id="step5" :disabled="step5.disabled" v-model="step5.value">
                    <label class="custom-control-label" for="step5" @click="setCheck(5)"></label>
                  </div>

                  <!-- paso 6 -->
                  <div class="custom-control custom-control-inline custom-checkbox">
                    <input type="checkbox" class="custom-control-input" id="step6" :disabled="step6.disabled" v-model="step6.value">
                    <label class="custom-control-label" for="step6" @click="setCheck(6)"></label>
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

                    <!-- Campo tipo de documento -->
                    <div class="col-md-6">
                      <div class="form-group">
                        <!-- Campo  DNI -->
                        <ValidationProvider rules="required|numeric|min:8" v-slot="{ errors }" v-if="step1.selectTypeDocument === 'DNI' ">
                          <input v-model=" step1.typeDocumentField" type="number" placeholder="DNI" class="form-control">
                          <span class="text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>

                        <!-- Campo Pasaporte -->
                        <ValidationProvider rules="required|numeric|min:10" v-slot="{ errors }" v-if="step1.selectTypeDocument === 'PT' ">
                          <input v-model=" step1.typeDocumentField" type="number" placeholder="Pasaporte" class="form-control">
                          <span class="text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>

                        <!-- Campo  CE -->
                        <ValidationProvider rules="required|numeric|min:8" v-slot="{ errors }" v-if="step1.selectTypeDocument === 'CE' ">
                          <input v-model=" step1.typeDocumentField" type="number" placeholder="Carnet de extranjería" class="form-control">
                          <span class="text-danger">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                    </div>

                  </div>
                </div>

                <!-- Paso 2 -->
                <div class="step2" v-if="currentView === 2">
                  <div class="form-row">

                    <div class="col-md-6">
                      <div class="form-group">
                        <ValidationProvider rules="required" v-slot="{ errors }">
                          <input v-model="step2.name" type="text" placeholder="Nombre" class="form-control" @click="errorList.name = true">
                          <span class="text-danger" v-if="errorList.name">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <ValidationProvider rules="required" v-slot="{ errors }">
                          <input v-model="step2.lastname1" type="text" placeholder="Apellido paterno" class="form-control" @click="errorList.lastname1 = true">
                          <span class="text-danger" v-if="errorList.lastname1">{{ errors[0] }}</span>
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
                        <input type="date" placeholder="F. nacimiento" v-model="step2.date" class="form-control" />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                    </div>

                  </div>
                </div>

                <!-- Paso 3 -->
                <div class="step3" v-if="currentView === 3">
                  <div class="form-row">

                    <div class="col-md-6">
                      <div class="form-group">
                        <ValidationProvider rules="required|email" v-slot="{ errors }">
                          <input v-model="step3.email" type="email" placeholder="Email principal" class="form-control" @click="errorList.email = true">
                          <span class="text-danger" v-if="errorList.email">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <ValidationProvider rules="required|email" v-slot="{ errors }">
                          <input v-model="step3.secondaryEmail" type="email" placeholder="Email secundario" class="form-control" @click="errorList.secondaryEmail = true">
                          <span class="text-danger" v-if="errorList.secondaryEmail">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                    </div>

                  </div>

                  <div class="form-row">

                    <div class="col-md-6">
                      <div class="form-group">
                        <ValidationProvider rules="required|numeric|min:7" v-slot="{ errors }">
                          <input v-model="step3.phone" type="number" placeholder="Teléfono principal" class="form-control" @click="errorList.phone = true">
                          <span class="text-danger" v-if="errorList.phone">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <ValidationProvider rules="required|numeric|min:7" v-slot="{ errors }">
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
                          <input v-model="step4.address" type="text" placeholder="Dirección" class="form-control" @click="errorList.address = true">
                          <span class="text-danger" v-if="errorList.address">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <ValidationProvider rules="required" v-slot="{ errors }">
                          <select class="custom-select" v-model="step4.city" @change="errorList.city = true">
                            <option value="">Ciudad</option>
                            <option value="Lima">Lima</option>
                            <option value="Arequipa">Arequipa</option>
                            <option value="La libertad">La libertad</option>
                          </select>
                          <span class="text-danger" v-if="errorList.city">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                    </div>

                  </div>

                  <div class="form-row">

                    <div class="col-md-6">
                      <div class="form-group">
                        <ValidationProvider rules="required" v-slot="{ errors }">
                        <select class="custom-select" v-model="step4.province" @change="errorList.province = true">
                          <option value="">Estado/Provincia</option>
                          <option value="Lima">Lima</option>
                          <option value="Canta">Canta</option>
                          <option value="Huaral">Huaral</option>
                        </select>
                        <span class="text-danger" v-if="errorList.province">{{ errors[0] }}</span>
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
                        <ValidationProvider v-slot="{ errors }">
                        <textarea v-model="step4.observations" class="form-control" placeholder="Observaciones"></textarea>
                        <span class="text-danger">{{ errors[0] }}</span>
                      </ValidationProvider>
                      </div>
                    </div>

                  </div>
                </div>

                <!-- Paso 5 -->
                <div class="step5" v-if="currentView === 5">
                  <div class="form-row">

                    <div class="col-md-6">
                      <div class="form-group">
                        <ValidationProvider rules="required" v-slot="{ errors }">
                          <select class="custom-select" v-model="step5.typeCourse" @change="errorList.typeCourse = true">
                            <option value="">Tipo de curso</option>
                            <option value="Virtual">Virtual</option>
                            <option value="Presencial">Presencial</option>
                          </select>
                          <span class="text-danger" v-if="errorList.typeCourse">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <ValidationProvider rules="required" v-slot="{ errors }">
                          <select class="custom-select" v-model="step5.course" @change="errorList.course = true">
                            <option value="">Curso</option>
                            <option value="Programación">Programación</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Administración">Administración</option>
                          </select>
                          <span class="text-danger" v-if="errorList.course">{{ errors[0] }}</span>
                        </ValidationProvider>
                      </div>
                    </div>

                  </div>
                </div>

                <!-- Paso 6 -->
                <div class="step6" v-if="currentView === 6">
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
                      </div>

                      <div class="row justify-content-center">
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
                          <div class="bg-light py-3 pl-1">
                            <span class="text-muted mr-3">Observaciones:</span>
                            <span>{{ step4.observations }}</span>
                          </div>
                        </div>
                      </div>

                      <div class="row justify-content-center">
                        <div class="col-md-10 mb-5">
                          <!-- Datos de curso -->
                          <h3 class="font-weight-bold lead mb-3">Datos de curso</h3>
                          <p>
                            <span class="text-muted mr-3">Tipo de curso:</span>
                            <span>{{ step5.typeCourse }}</span>
                          </p>
                          <p>
                            <span class="text-muted mr-3">Curso:</span>
                            <span>{{ step5.course }}</span>
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              <div class="card-footer d-flex justify-content-between align-items-center bg-dark">
                <router-link :to="{name: 'Login'}" class="text-white">Ya tengo una cuenta</router-link>
                <!-- Submit -->
                <input type="submit" class="btn btn-danger" :value="setButtonText" data-toggle="tooltip" data-placement="top" title="Complete los campos para continuar">
              </div>

            </div>

          </form>
        </validation-observer>
    </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate';

export default {
    props: ['currentViewForm'],
    components: {
      ValidationObserver
    },
    data() {
        return {
            currentView: this.currentViewForm,
            step1: {
                value: true,
                current: true,
                disabled: false,
                completed: false,
                id: 6,
                typeDocument: '',
                typeDocumentField: '',
                selectTypeDocument: 'DNI',
                status: ''
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
                disabled: true,
                typeCourse: '',
                course: ''
            },
            step6: {
              value: false,
              current: false,
              disabled: true
            },
            errorList: {
              name: false,
              lastname1: false,
              email: false,
              secondaryEmail: false,
              phone: false,
              address: false,
              city: false,
              province: false,
              typeCourse: false,
              course: false,
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
          subtitle = 'Datos de curso'
        } else if(this.currentView === 6) {
          subtitle = 'Verificación de datos'
        }
        return subtitle
      },
      setButtonText: function() {
        let text = 'Siguiente'

        if(this.currentView === 6) {
          text = 'Registrarme'
        }

        return text
      },
      classColumns: function() {
        let cols = 7

        if(this.currentView === 6) {
          cols = 12
        }

        return `col-md-${cols}`
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
          this.step5.completed = true

          this.currentView = 6
          this.step6.disabled = false
          this.step6.value = true
        } else if(this.currentView === 6) {
          if(this.step1.completed && this.step2.completed && this.step3.completed && this.step4.completed) {
            let user = {}

            this.step1.id = this.step1.id + 1

            user.id = this.step1.id
            user.typeDocument = this.step1.typeDocument
            user.typeDocumentField = this.step1.typeDocumentField
            user.status = 'Pendiente'

            user.name = this.step2.name
            user.lastname1 = this.step2.lastname1
            user.lastname2 = this.step2.lastname2
            user.date = this.step2.date

            user.email = this.step3.email
            user.secondaryEmail = this.step3.secondaryEmail
            user.phone = this.step3.phone
            user.WorkPhone = this.step3.WorkPhone
            user.mobile = this.step3.mobile

            user.business = this.step4.business
            user.position = this.step4.position
            user.address = this.step4.address
            user.city = this.step4.city
            user.province = this.step4.province
            user.country = this.step4.country
            user.observations = this.step4.observations

            user.typeCourse = this.step5.typeCourse
            user.course = this.step5.course

            this.$store.commit('createUser', user)

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
        } else if(value === 6 && this.currentView > 5 || value === 6 && this.step5.completed) {
          this.step6.value = false
          this.step6.disabled = false
          this.currentView = value
        }
      }
    },
}
</script>

<style lang="scss" scoped>
input[type=date] {
  text-align: right;
}

input[type="date"]:before {
  color: rgb(32, 32, 32);
  content: attr(placeholder) !important;
  margin-right: 0.3em;
  font-size: .9em;
}
</style>