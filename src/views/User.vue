<template>
    <div class="container mt-3">
        <div class="row justify-content-center">
            <div class="col-md-6">

                <div class="card">
                    <div class="card-body">
                        <h2 class="title m-0 text-center">Datos de usuario: #{{ user.id }}</h2>
                    </div>
                </div>
                
                <v-form
                    ref="mainForm"
                    v-model="valid"
                    lazy-validation
                    @submit.prevent="submit()">
                    <div role="tablist">
                        <!-- Collapse 1 -->
                        <b-card no-body class="mb-1">
                            <b-card-header header-tag="header" class="py-3 bg-light" role="tab">
                                <a href="#" v-b-toggle.accordion-1 class="btn-link text-dark lead font-weight-bold">Identificación</a>
                            </b-card-header>
                            <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                                <b-card-body>
                                    <div class="form-row mt-5">

                                        <!-- Select tipo de documento -->
                                        <div class="col-md-6 py-0">
                                            <div class="form-group mb-0">
                                                <v-select
                                                :items="step1.itemsTypeDocument"
                                                label="Tipo de documento"
                                                outlined
                                                v-model="step1.typeDocument"
                                                ref="selectTypeDocument"
                                                disabled
                                                >
                                                </v-select>
                                            </div>
                                        </div>

                                        <!-- Campo tipo de documento -->
                                        <div class="col-md-6 py-0">
                                            <!-- Campo  DNI -->
                                            <v-text-field
                                            type="number"
                                            v-model="step1.typeDocumentField"
                                            label="DNI"
                                            required
                                            outlined
                                            disabled
                                            v-if="step1.selectTypeDocument === 'DNI' "
                                            ></v-text-field>

                                            <!-- Campo Pasaporte -->
                                            <v-text-field
                                            type="number"
                                            v-model="step1.typeDocumentField"
                                            label="Pasaporte"
                                            required
                                            outlined
                                            disabled
                                            v-if="step1.selectTypeDocument === 'PASAPORTE' "
                                            ></v-text-field>

                                            <!-- Campo  CE -->
                                            <v-text-field
                                            type="number"
                                            v-model="step1.typeDocumentField"
                                            label="Carnet de extranjería"
                                            required
                                            outlined
                                            disabled
                                            v-if="step1.selectTypeDocument === 'CE' "
                                            ></v-text-field>
                                        </div>

                                    </div>
                                    <v-row class="justify-content-center mt-5">
                                        <div class="col-md-8 col-lg-6 text-center py-0">
                                            <v-select
                                                :items="itemsStatus"
                                                label="Estado"
                                                outlined
                                                v-model="step1.status"
                                                ref="selectTypeDocument"
                                                :rules="rules.requireRule"
                                                required
                                                >
                                            </v-select>
                                        </div>
                                    </v-row>
                                </b-card-body>
                            </b-collapse>
                        </b-card>

                        <!-- Collapse 2 -->
                        <b-card no-body class="mb-1">
                            <b-card-header header-tag="header" class="py-3 bg-light" role="tab">
                                <a href="#" v-b-toggle.accordion-2 class="btn-link text-dark lead font-weight-bold">Datos personales</a>
                            </b-card-header>
                            <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                                <b-card-body>
                                    <div class="form-row mt-5">

                                        <div class="col-md-6 py-0">
                                            <v-text-field
                                                v-model="step2.name"
                                                label="Nombre"
                                                required
                                                outlined
                                                disabled
                                            ></v-text-field>
                                        </div>

                                        <div class="col-md-6 py-0">
                                            <v-text-field
                                                    v-model="step2.lastname1"
                                                    label="Apellido paterno"
                                                    required
                                                    outlined
                                                    disabled
                                            ></v-text-field>
                                        </div>

                                    </div>

                                    <div class="form-row">

                                        <div class="col-md-6 py-0">
                                            <v-text-field
                                                v-model="step2.lastname2"
                                                label="Apellido materno"
                                                required
                                                outlined
                                                disabled
                                            ></v-text-field>
                                        </div>

                                        <div class="col-md-6 py-0">
                                            <v-menu
                                                v-model="step2.datePicker"
                                                :close-on-content-click="false"
                                                :nudge-right="40"
                                                transition="scale-transition"
                                                offset-y
                                                min-width="290px"
                                            >
                                                <template v-slot:activator="{ on }">
                                                    <v-text-field
                                                        v-model="step2.date"
                                                        label="Fecha de nacimiento"
                                                        required
                                                        outlined
                                                        disabled
                                                        v-on="on"
                                                    ></v-text-field>
                                                </template>
                                                <v-date-picker v-model="step2.date" @input="step2.datePicker = false"></v-date-picker>
                                            </v-menu>
                                        </div>

                                    </div>

                                    <v-row class="justify-content-center mt-5">
                                        <div class="col-md-6 text-center py-0">
                                            <v-select
                                                :items="itemsStatus"
                                                label="Estado"
                                                outlined
                                                v-model="step1.status"
                                                ref="selectTypeDocument"
                                                :rules="rules.requireRule"
                                                required
                                                >
                                            </v-select>
                                        </div>
                                    </v-row>
                                </b-card-body>
                            </b-collapse>
                        </b-card>

                        <b-card no-body class="mb-1">
                            <b-card-header header-tag="header" class="py-3 bg-light" role="tab">
                                <a href="#" v-b-toggle.accordion-3 class="btn-link text-dark lead font-weight-bold">Datos de contacto</a>
                            </b-card-header>
                            <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
                                <b-card-body>
                                    <div class="form-row">

                                        <div class="col-md-6">
                                            <v-text-field
                                                v-model="step3.email"
                                                label="Email principal"
                                                outlined
                                                required
                                                disabled
                                            ></v-text-field>
                                        </div>

                                        <div class="col-md-6">
                                            <v-text-field
                                                v-model="step3.secondaryEmail"
                                                label="Email secundario"
                                                outlined
                                                required
                                                disabled
                                            ></v-text-field>
                                        </div>
   
                                    </div>

                                    <div class="form-row">

                                        <div class="col-md-6">
                                            <v-text-field
                                                type="number"
                                                v-model="step3.phone"
                                                label="Teléfono principal"
                                                required
                                                outlined
                                                disabled
                                            ></v-text-field>
                                        </div>

                                        <div class="col-md-6">
                                            <v-text-field
                                                type="number"
                                                v-model="step3.WorkPhone"
                                                label="Teléfono de trabajo"
                                                required
                                                outlined
                                                disabled
                                            ></v-text-field>
                                        </div>

                                    </div>

                                    <div class="form-row">

                                        <div class="col-md-6">
                                            <v-text-field
                                                type="number"
                                                v-model="step3.mobile"
                                                label="Celular"
                                                required
                                                outlined
                                                disabled
                                            ></v-text-field>
                                        </div>

                                    </div>
                                    <v-row class="justify-content-center mt-5">
                                        <div class="col-md-6 text-center py-0">
                                            <v-select
                                                :items="itemsStatus"
                                                label="Estado"
                                                outlined
                                                v-model="step1.status"
                                                ref="selectTypeDocument"
                                                :rules="rules.requireRule"
                                                required
                                                >
                                            </v-select>
                                        </div>
                                    </v-row>
                                </b-card-body>
                            </b-collapse>
                        </b-card>

                        <b-card no-body class="mb-1">
                            <b-card-header header-tag="header" class="py-3 bg-light" role="tab">
                                <a href="#" v-b-toggle.accordion-4 class="btn-link text-dark lead font-weight-bold">Datos de ubicación</a>
                            </b-card-header>
                            <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
                                <b-card-body>
                                    <div class="form-row">

                                    <div class="col-md-6">
                                        <v-text-field
                                            v-model="step4.business"
                                            label="Empresa"
                                            required
                                            outlined
                                            disabled
                                        ></v-text-field>
                                    </div>

                                    <div class="col-md-6">
                                        <v-text-field
                                                v-model="step4.position"
                                                label="Cargo"
                                                required
                                                outlined
                                                disabled
                                        ></v-text-field>
                                    </div>

                                </div>

                                <div class="form-row">

                                    <div class="col-md-6">
                                         <v-text-field
                                            v-model="step4.address"
                                            label="Dirección"
                                            required
                                            outlined
                                            disabled
                                        ></v-text-field>
                                    </div>

                                    <div class="col-md-6">
                                        <v-text-field
                                            v-model="step4.city"
                                            label="Ciudad"
                                            required
                                            outlined
                                            disabled
                                        ></v-text-field>
                                    </div>

                                </div>

                                <div class="form-row">

                                    <div class="col-md-6">
                                        <v-text-field
                                            v-model="step4.province"
                                            label="Provincia"
                                            required
                                            outlined
                                            disabled
                                        ></v-text-field>
                                    </div>

                                    <div class="col-md-6">
                                        <v-select
                                            :items="step4.itemsCountry"
                                            label="País"
                                            outlined
                                            v-model="step4.country"
                                            disabled
                                            >
                                        </v-select>
                                    </div>

                                </div>

                                <div class="form-row">

                                    <div class="col">
                                        <v-textarea
                                            v-model="step4.observations"
                                            outlined
                                            name="input-7-4"
                                            label="Observaciones"
                                            disabled
                                        ></v-textarea>
                                    </div>

                                </div>

                                <v-row class="justify-content-center mt-5">
                                    <div class="col-md-6 text-center py-0">
                                        <v-select
                                            :items="itemsStatus"
                                            label="Estado"
                                            outlined
                                            v-model="step1.status"
                                            ref="selectTypeDocument"
                                            :rules="rules.requireRule"
                                            required
                                            >
                                        </v-select>
                                    </div>
                                </v-row>

                                </b-card-body>
                            </b-collapse>
                        </b-card>

                        <b-card no-body class="mb-1">
                            <b-card-header header-tag="header" class="py-3 bg-light" role="tab">
                                <a href="#" v-b-toggle.accordion-5 class="btn-link text-dark lead font-weight-bold">Datos de curso</a>
                            </b-card-header>
                            <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">
                                <b-card-body>
                                    <div class="form-row">

                                    <div class="col-md-6">
                                        <v-select
                                            :items="step5.itemsTypeCourse"
                                            label="Tipo de curso"
                                            outlined
                                            v-model="step5.typeCourse"
                                            disabled
                                        >
                                        </v-select>
                                    </div>

                                    <div class="col-md-6">
                                        <v-select
                                                :items="step5.itemsCoursesPresenciales"
                                                label="Curso"
                                                outlined
                                                v-model="step5.course"
                                                v-if="step5.typeCourse === 'Presencial'"
                                                disabled
                                                >
                                            </v-select>
                                            <v-select
                                                :items="step5.itemsCoursesOnline"
                                                label="Curso"
                                                outlined
                                                v-model="step5.course"
                                                v-if="step5.typeCourse === 'Virtual'"
                                                disabled
                                                >
                                            </v-select>
                                    </div>

                                </div>

                                <v-row class="justify-content-center mt-5">
                                    <div class="col-md-8 col-lg-6 text-center py-0">
                                        <v-select
                                            :items="itemsStatus"
                                            label="Estado"
                                            outlined
                                            v-model="step1.status"
                                            ref="selectTypeDocument"
                                            required
                                            >
                                        </v-select>
                                    </div>
                                </v-row>

                                </b-card-body>
                            </b-collapse>
                        </b-card>

                        <b-card no-body class="mb-1">
                            <b-card-header header-tag="header" class="py-3 bg-light" role="tab">
                                <a href="#" v-b-toggle.accordion-6 class="btn-link text-dark lead font-weight-bold">Datos de pago</a>
                            </b-card-header>
                            <b-collapse id="accordion-6" accordion="my-accordion" role="tabpanel">
                                <b-card-body>
                                    <div class="form-row">

                                        <div class="col-md-6">
                                            <v-select
                                            :items="step6.itemsPayment"
                                            label="PAGO"
                                            outlined
                                            v-model="step6.payment"
                                            disabled
                                            >
                                            </v-select>
                                        </div>

                                        <div class="col-md-6">
                                        <v-select
                                            :items="step6.itemsCurrency"
                                            label="Moneda"
                                            outlined
                                            v-model="step6.currency"
                                            disabled
                                            >
                                            </v-select>
                                        </div>

                                    </div>

                                    <div class="form-row">

                                        <div class="col-md-6">
                                            <v-text-field
                                                    type="number"
                                                    v-model="step6.amount"
                                                    label="Monto"
                                                    required
                                                    outlined
                                                    disabled
                                                    >
                                            </v-text-field>
                                        </div>

                                        <div class="col-md-6">
                                            <v-select
                                            :items="step6.itemsTypePayment"
                                            label="Tipo de pago"
                                            outlined
                                            v-model="step6.typePayment"
                                            disabled
                                            >
                                        </v-select>
                                        </div>

                                    </div>

                                    <div class="form-row">

                                        <div class="col-md-6">
                                            <v-text-field
                                                    type="number"
                                                    v-model="step6.nroOperation"
                                                    label="Número de operación"
                                                    required
                                                    outlined
                                                    disabled
                                                    >
                                            </v-text-field>
                                        </div>

                                        <div class="col-md-6">
                                            <v-menu
                                                v-model="step6.datePicker"
                                                :close-on-content-click="false"
                                                :nudge-right="40"
                                                transition="scale-transition"
                                                offset-y
                                                min-width="290px"
                                            >
                                                    <template v-slot:activator="{ on }">
                                                        <v-text-field
                                                            v-model="step6.datePayment"
                                                            label="Fecha de operación"
                                                            required
                                                            outlined
                                                            v-on="on"
                                                            disabled
                                                        ></v-text-field>
                                                    </template>
                                                    <v-date-picker v-model="step6.datePayment" @input="step6.datePicker = false"></v-date-picker>
                                                </v-menu>
                                        </div>

                                    </div>

                                    <div class="form-row">

                                        <div class="col-md-6" v-if="step6.typePayment === 'transferencia'">
                                            <v-text-field
                                                    v-model="step6.bank"
                                                    label="Banco"
                                                    required
                                                    outlined
                                                    disabled=""
                                            ></v-text-field>
                                        </div>

                                        <div class="col-md-6">
                                            <v-menu
                                                v-model="step6.datePicker"
                                                :close-on-content-click="false"
                                                :nudge-right="40"
                                                transition="scale-transition"
                                                offset-y
                                                min-width="290px"
                                            >
                                                    <template v-slot:activator="{ on }">
                                                        <v-text-field
                                                            v-model="step6.datePayment"
                                                            label="Fecha de operación"
                                                            required
                                                            outlined
                                                            v-on="on"
                                                            disabled
                                                        ></v-text-field>
                                                    </template>
                                                    <v-date-picker v-model="step6.datePayment" @input="step6.datePicker = false"></v-date-picker>
                                                </v-menu>
                                        </div>

                                    </div>

                                    <v-row>
                                        <div class="col-md-8">
                                            <span>Voucher</span>
                                            <img :src="step6.voucher" alt="" class="img-fluid">
                                        </div>
                                    </v-row>

                                <v-row class="justify-content-center mt-5">
                                    <div class="col-md-8 col-lg-6 text-center py-0">
                                        <v-select
                                            :items="itemsStatus"
                                            label="Estado"
                                            outlined
                                            v-model="step1.status"
                                            ref="selectTypeDocument"
                                            :rules="rules.requireRule"
                                            required
                                            >
                                        </v-select>
                                    </div>
                                </v-row>

                                </b-card-body>
                            </b-collapse>
                        </b-card>
                    </div>
                    <div class="text-center mt-3">
                        <v-btn
                            type="submit"
                            color="red darken-2 white--text"
                        >
                            Guardar
                        </v-btn>
                    </div>
                </v-form>

            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import { itemsTypePayment, itemsStatus, itemsTypeDocument } from '@/utilities/data-selects.js'
import countries from '@/assets/countries.json'
import coursesPresenciales from '@/assets/courses.json'
import coursesOnline from '@/assets/courses-online.json'

export default {
    data() {
        return {
            valid: true,
            itemsStatus,
            user: {},
            rules: {
                require: 'Este campo es requerido',
                requireRule: [
                    v => !!v || this.rules.require
                ]
            },
            step1: {
                value: true,
                current: true,
                disabled: false,
                completed: false,
                itemsTypeDocument,
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
                itemsCountry: this.getCountries(),
                country: '',
                observations: ''
            },
            step5: {
                value: false,
                current: false,
                disabled: true,
                itemsTypeCourse: [{value: null, text: 'Tipo de curso'}, {value: 'Virtual', text: 'Virtual'}, {value: 'Presencial', text: 'Presencial'}],
                itemsCoursesPresenciales: this.getCoursesPresenciales(),
                itemsCoursesOnline: this.getCoursesOnline(),
                typeCourse: '',
                course: ''
            },
            step6: {
              itemsPayment: [{value: null, text: 'Pago'}, {value: 'total', text: 'TOTAL'}, {value: 'cuotas', text: 'CUOTAS'}],
              payment: '',
              itemsCurrency: [{value: null, text: 'Moneda'}, {value: 'soles', text: 'Soles'}, {value: 'dolares', text: 'Dólares'}],
              currency: '',
              amount: '',
              itemsTypePayment,
              typePayment: '',
              nroOperation: '',
              datePayment: '',
              datePicker: false,
              voucher: {},
              bank: ''
            },
        }
    },
    methods: {
        setUser() {
            let id = this.$route.params.id
            this.users.forEach(user => {
                if(user.id === id) {
                    this.user = user

                    // Asignar campos
                    this.step1.typeDocument = this.user.typeDocument
                    this.step1.typeDocumentField = this.user.typeDocumentField
                    this.step1.status = this.user.status
                    this.step1.selectTypeDocument = this.user.typeDocument

                    this.step2.name = this.user.name
                    this.step2.lastname1 = this.user.lastname1
                    this.step2.lastname2 = this.user.lastname2
                    this.step2.date = this.user.date

                    this.step3.email = this.user.email
                    this.step3.secondaryEmail = this.user.secondaryEmail
                    this.step3.phone = this.user.phone
                    this.step3.WorkPhone = this.user.WorkPhone
                    this.step3.mobile = this.user.mobile

                    this.step4.business = this.user.business
                    this.step4.position = this.user.position
                    this.step4.address = this.user.address
                    this.step4.city = this.user.city
                    this.step4.province = this.user.province
                    this.step4.country = this.user.country
                    this.step4.observations = this.user.observations

                    this.step5.typeCourse = this.user.typeCourse
                    this.step5.course = this.user.course

                    this.step6.payment = this.user.payment
                    this.step6.currency = this.user.currency
                    this.step6.amount = this.user.amount
                    this.step6.typePayment = this.user.typePayment
                    this.step6.nroOperation = this.user.nroOperation
                    this.step6.datePayment = this.user.datePayment
                    this.step6.voucher = this.user.voucher
                    this.step6.bank = this.user.bank
                }
            })
        },
        submit() {
            // Si el formulario está validado, enviamos los datos.
            if(this.$refs.mainForm.validate()) {
                alert('Datos guardados')
            }
        },
        getCountries() {
            let newCountries = []

            countries.forEach(country => {

            country.value = country.nombre
            country.text = country.nombre

            newCountries.push(country)
            })

            return newCountries
        },
        getCoursesPresenciales() {
            let newCourses = []

            coursesPresenciales.forEach(course => {

                course.value = course.descripcion
                course.text = course.descripcion

                newCourses.push(course)
            })
            return newCourses
        },
        getCoursesOnline() {
            let newCourses = []

            coursesOnline.forEach(course => {

                course.value = course.descripcion
                course.text = course.descripcion

                newCourses.push(course)
            })
            return newCourses
        },
    },
    mounted() {
        this.setUser()
    },
    computed: {
        ...mapState(['users'])
    }
}
</script>