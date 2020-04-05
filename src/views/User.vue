<!-- Route /dashboard/users/:id -->
<template>
    <div class="container mt-3">
        <div class="row justify-content-center text-center" v-if="alert">
            <div class="col-md-6">
                <v-alert color="blue" type="info" outlined dismissible>
                    Los datos del usuario se actualizaron con éxito
                </v-alert>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-md-8">
                <!-- <pre>
                    {{ newPayment }}
                </pre> -->
            </div>
        </div>
        <loader v-if="loading"></loader>
        <div class="row justify-content-center" v-else>
            <div class="col-md-6">
                <div>
                    <v-btn class="mb-3 text-decoration-none" color="red darken-2 white--text" :to="{name: 'Dashboard'}">
                        <v-icon dark left>mdi-arrow-left</v-icon>
                        Dashboard
                    </v-btn>
                </div>
                <div class="card">
                    <div class="card-body">
                        <h2 class="title m-0 text-center">Datos de usuario: #{{ this.$route.params.id }}</h2>
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
                            <b-card-header header-tag="header" class="py-3 bg-light d-flex justify-content-between" role="tab">
                                <a href="#" v-b-toggle.accordion-1 class="btn-link text-dark lead font-weight-bold">Identificación</a>

                                <!-- Círculos que muestran el estado -->
                                <circles-info :dataToValidate="step1.identification_state"></circles-info>
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
                                                v-model="step1.document_type"
                                                :disabled="identificationState"
                                                >
                                                </v-select>
                                            </div>
                                        </div>

                                        <!-- Campo tipo de documento -->
                                        <div class="col-md-6 py-0">
                                            <!-- Campo  DNI -->
                                            <v-text-field
                                            type="number"
                                            v-model="step1.document_number"
                                            label="DNI"
                                            required
                                            outlined
                                            :disabled="identificationState"
                                            v-if="step1.document_type === 1"
                                            ></v-text-field>

                                            <!-- Campo Pasaporte -->
                                            <v-text-field
                                            type="number"
                                            v-model="step1.document_number"
                                            label="Pasaporte"
                                            required
                                            outlined
                                            :disabled="identificationState"
                                            v-if="step1.document_type === 2"
                                            ></v-text-field>

                                            <!-- Campo  CE -->
                                            <v-text-field
                                            type="number"
                                            v-model="step1.document_number"
                                            label="Carnet de extranjería"
                                            required
                                            outlined
                                            :disabled="identificationState"
                                            v-if="step1.document_type === 3"
                                            ></v-text-field>
                                        </div>

                                    </div>
                                    <v-row class="justify-content-center mt-5">
                                        <div class="col-md-8 col-lg-6 text-center py-0">
                                            <v-select
                                                :items="itemsStatus"
                                                label="Estado"
                                                outlined
                                                v-model="step1.identification_state"
                                                :rules="rules.requireRule"
                                                required
                                                :disabled="identificationState"
                                                >
                                            </v-select>
                                        </div>
                                    </v-row>
                                </b-card-body>
                            </b-collapse>
                        </b-card>

                        <!-- Collapse 2 -->
                        <b-card no-body class="mb-1">

                            <b-card-header header-tag="header" class="py-3 bg-light d-flex justify-content-between" role="tab">
                                <a href="#" v-b-toggle.accordion-2 class="btn-link text-dark lead font-weight-bold">Datos personales</a>

                                <!-- Círculos que muestran el estado -->
                                <circles-info :dataToValidate="step2.personal_data_state"></circles-info>
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
                                                :disabled="personalDataState"
                                            ></v-text-field>
                                        </div>

                                        <div class="col-md-6 py-0">
                                            <v-text-field
                                                    v-model="step2.last_name"
                                                    label="Apellido paterno"
                                                    required
                                                    outlined
                                                    :disabled="personalDataState"
                                            ></v-text-field>
                                        </div>

                                    </div>

                                    <div class="form-row">

                                        <div class="col-md-6 py-0">
                                            <v-text-field
                                                v-model="step2.surname"
                                                label="Apellido materno"
                                                required
                                                outlined
                                                :disabled="personalDataState"
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
                                                        v-model="step2.birthday"
                                                        label="Fecha de nacimiento"
                                                        required
                                                        outlined
                                                        :disabled="personalDataState"
                                                        v-on="on"
                                                    ></v-text-field>
                                                </template>
                                                <v-date-picker v-model="step2.birthday" @input="step2.datePicker = false"></v-date-picker>
                                            </v-menu>
                                        </div>

                                    </div>

                                    <v-row class="justify-content-center mt-5">
                                        <div class="col-md-6 text-center py-0">
                                            <v-select
                                                :items="itemsStatus"
                                                label="Estado"
                                                outlined
                                                v-model="step2.personal_data_state"
                                                :rules="rules.requireRule"
                                                required
                                                :disabled="personalDataState"
                                                >
                                            </v-select>
                                        </div>
                                    </v-row>
                                </b-card-body>
                            </b-collapse>
                        </b-card>

                        <!-- Datos de contacto -->
                        <b-card no-body class="mb-1">
                            <b-card-header header-tag="header" class="py-3 bg-light d-flex justify-content-between" role="tab">
                                <a href="#" v-b-toggle.accordion-3 class="btn-link text-dark lead font-weight-bold">Datos de contacto</a>

                                <!-- Círculos que muestran el estado -->
                                <circles-info :dataToValidate="step3.contact_data_state"></circles-info>
                            </b-card-header>

                            <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
                                <b-card-body>
                                    <div class="form-row">

                                        <div class="col-md-6">
                                            <v-text-field
                                                v-model="step3.email_principal"
                                                label="Email principal"
                                                outlined
                                                required
                                                :disabled="contactDataState"
                                            ></v-text-field>
                                        </div>

                                        <div class="col-md-6">
                                            <v-text-field
                                                v-model="step3.email_secundary"
                                                label="Email secundario"
                                                outlined
                                                required
                                                :disabled="contactDataState"
                                            ></v-text-field>
                                        </div>
   
                                    </div>

                                    <div class="form-row">

                                        <div class="col-md-6">
                                            <v-text-field
                                                type="number"
                                                v-model="step3.phone_principal"
                                                label="Teléfono principal"
                                                required
                                                outlined
                                                :disabled="contactDataState"
                                            ></v-text-field>
                                        </div>

                                        <div class="col-md-6">
                                            <v-text-field
                                                type="number"
                                                v-model="step3.phone_secundary"
                                                label="Teléfono de trabajo"
                                                required
                                                outlined
                                                :disabled="contactDataState"
                                            ></v-text-field>
                                        </div>

                                    </div>

                                    <div class="form-row">

                                        <div class="col-md-6">
                                            <v-text-field
                                                type="number"
                                                v-model="step3.cellphone"
                                                label="Celular"
                                                required
                                                outlined
                                                :disabled="contactDataState"
                                            ></v-text-field>
                                        </div>

                                    </div>
                                    <v-row class="justify-content-center mt-5">
                                        <div class="col-md-6 text-center py-0">
                                            <v-select
                                                :items="itemsStatus"
                                                label="Estado"
                                                outlined
                                                v-model="step3.contact_data_state"
                                                :rules="rules.requireRule"
                                                required
                                                :disabled="contactDataState"
                                                >
                                            </v-select>
                                        </div>
                                    </v-row>
                                </b-card-body>
                            </b-collapse>
                        </b-card>
                        
                        <!-- Datos de ubicación -->
                        <b-card no-body class="mb-1">
                            <b-card-header header-tag="header" class="py-3 bg-light d-flex justify-content-between" role="tab">
                                <a href="#" v-b-toggle.accordion-4 class="btn-link text-dark lead font-weight-bold">Datos de ubicación</a>

                                <!-- Círculos que muestran el estado -->
                                <circles-info :dataToValidate="step4.location_data_state"></circles-info>
                            </b-card-header>
                            <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
                                <b-card-body>
                                    <div class="form-row">

                                    <div class="col-md-6">
                                        <v-text-field
                                            v-model="step4.company"
                                            label="Empresa"
                                            required
                                            outlined
                                            :disabled="locationDataState"
                                        ></v-text-field>
                                    </div>

                                    <div class="col-md-6">
                                        <v-text-field
                                                v-model="step4.position"
                                                label="Cargo"
                                                required
                                                outlined
                                                :disabled="locationDataState"
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
                                            :disabled="locationDataState"
                                        ></v-text-field>
                                    </div>

                                    <div class="col-md-6">
                                        <v-text-field
                                            v-model="step4.city"
                                            label="Ciudad"
                                            required
                                            outlined
                                            :disabled="locationDataState"
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
                                            :disabled="locationDataState"
                                        ></v-text-field>
                                    </div>

                                    <div class="col-md-6">
                                        <v-select
                                            :items="step4.itemsCountry"
                                            label="País"
                                            outlined
                                            v-model="step4.country"
                                            :disabled="locationDataState"
                                            >
                                        </v-select>
                                    </div>

                                </div>

                                <div class="form-row">

                                    <div class="col">
                                        <v-textarea
                                            v-model="step4.observation"
                                            outlined
                                            name="input-7-4"
                                            label="Observaciones"
                                            :disabled="locationDataState"
                                        ></v-textarea>
                                    </div>

                                </div>

                                <v-row class="justify-content-center mt-5">
                                    <div class="col-md-6 text-center py-0">
                                        <v-select
                                            :items="itemsStatus"
                                            label="Estado"
                                            outlined
                                            v-model="step4.location_data_state"
                                            :rules="rules.requireRule"
                                            required
                                            :disabled="locationDataState"
                                            >
                                        </v-select>
                                    </div>
                                </v-row>

                                </b-card-body>
                            </b-collapse>
                        </b-card>

                        <!-- Datos de curso -->
                        <b-card no-body class="mb-1">
                            <b-card-header header-tag="header" class="py-3 bg-light d-flex justify-content-between" role="tab">
                                <a href="#" v-b-toggle.accordion-5 class="btn-link text-dark lead font-weight-bold">Datos de curso</a>

                                <!-- Círculos que muestran el estado -->
                                <circles-info :dataToValidate="step5.course_data_state"></circles-info>
                            </b-card-header>
                            <b-collapse id="accordion-5" accordion="my-accordion" role="tabpanel">
                                <b-card-body>
                                    <div class="form-row">

                                    <div class="col-md-6">
                                        <v-select
                                            :items="step5.itemsTypeCourse"
                                            label="Tipo de curso"
                                            outlined
                                            v-model="step5.course_type"
                                            :disabled="courseDataState"
                                        >
                                        </v-select>
                                    </div>

                                    <div class="col-md-6">
                                        <v-select
                                                :items="step5.itemsCoursesOnline"
                                                label="Curso"
                                                outlined
                                                v-model="step5.course_name"
                                                v-if="step5.course_type === 1"
                                                :disabled="courseDataState"
                                                >
                                            </v-select>
                                            <v-select
                                                :items="step5.itemsCoursesPresenciales"
                                                label="Curso"
                                                outlined
                                                v-model="step5.course_name"
                                                v-if="step5.course_type === 2"
                                                :disabled="courseDataState"
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
                                            v-model="step5.course_data_state"
                                            required
                                            :rules="rules.requireRule"
                                            :disabled="courseDataState"
                                            >
                                        </v-select>
                                    </div>
                                </v-row>

                                </b-card-body>
                            </b-collapse>
                        </b-card>

                        <!-- Datos de pago -->
                        
                        <!-- Si es el primer pago o es pago total, muestra el campo para que el admin pueda verificar -->
                        <b-card no-body class="mb-1" v-if="step6.payment === 1 || step6.payment_data_state === '0' || step6.payment_data_state === null">
                            <b-card-header header-tag="header" class="py-3 bg-light" role="tab">
                                <a href="#" v-b-toggle.accordion-6 class="btn-link text-dark lead font-weight-bold">Datos de pago</a>
                            </b-card-header>
                            <b-collapse id="accordion-6" accordion="my-accordion" role="tabpanel">
                                <b-card-body>
                                    <div class="form-row">
                                        <!-- Items pago -->
                                        <div class="col-md-6">
                                            <v-select
                                                :items="step6.itemsPayment"
                                                label="PAGO"
                                                outlined
                                                v-model="step6.payment"
                                                :rules="rules.requireRule"
                                                :disabled="paymentDataState"
                                                >
                                            </v-select>
                                        </div>

                                        <!-- Moneda -->
                                        <div class="col-md-6">
                                            <v-select
                                                :items="step6.itemsCoin"
                                                label="Moneda"
                                                outlined
                                                v-model="step6.coin"
                                                required
                                                :rules="rules.requireRule"
                                                :disabled="paymentDataState"
                                            ></v-select>
                                        </div>
                                    </div>

                                    <div class="form-row">
                                        <!-- Monto -->
                                        <div class="col-md-6">
                                            <v-text-field
                                                type="number"
                                                v-model="newPayment.amount"
                                                label="Monto"
                                                required
                                                :rules="rules.requireRule"
                                                outlined
                                                :disabled="paymentDataState"
                                            ></v-text-field>
                                        </div>

                                        <!-- Tipo de pago -->
                                        <div class="col-md-6">
                                            <v-select
                                                :items="step6.itemsTypePayment"
                                                label="Tipo de pago"
                                                outlined
                                                v-model="newPayment.payment_type"
                                                required
                                                :rules="rules.requireRule"
                                                :disabled="paymentDataState"
                                            ></v-select>
                                        </div>
                                    </div>

                                    <div class="form-row">
                                        <!-- Número de operación -->
                                        <div class="col-md-6">
                                            <v-text-field
                                                type="number"
                                                v-model="newPayment.operation_number"
                                                label="Número de operación"
                                                outlined
                                                required
                                                :rules="rules.requireRule"
                                                :disabled="paymentDataState"
                                            ></v-text-field>
                                        </div>

                                        <!-- Nueva cuota fecha de pago -->
                                        <div class="col-md-6">
                                            <v-menu
                                                v-model="newPayment.datePicker"
                                                :close-on-content-click="false"
                                                :nudge-right="40"
                                                transition="scale-transition"
                                                offset-y
                                                min-width="290px"
                                            >
                                                <template v-slot:activator="{ on }">
                                                    <v-text-field
                                                        v-model="newPayment.operation_date"
                                                        label="Fecha de operación"
                                                        outlined
                                                        v-on="on"
                                                        required
                                                        :rules="rules.requireRule"
                                                        :disabled="paymentDataState"
                                                    ></v-text-field>
                                                </template>
                                                <v-date-picker
                                                v-model="newPayment.operation_date"
                                                @input="newPayment.datePicker = false"
                                                ></v-date-picker>
                                            </v-menu>
                                        </div>
                                    </div>

                                    <v-row>
                                        <div class="col-md-6">
                                            <div v-if="newPayment.voucher != ''">
                                                <span>Voucher</span>
                                                <img :src="newPayment.voucher" alt="Imagen de voucher" class="img-fluid" />
                                            </div>
                                        </div>
                                        <!-- Banco -->
                                        <div class="col-md-6" v-if="newPayment.payment_type === 2">
                                            <v-text-field v-model="newPayment.bank" label="Banco" required outlined :disabled="paymentDataState"></v-text-field>
                                        </div>
                                    </v-row>

                                    <v-row class="justify-content-center mt-5">
                                        <div class="col-md-8 col-lg-6 text-center py-0">
                                            <v-select
                                                :items="itemsStatus"
                                                label="Estado"
                                                outlined
                                                v-model="step6.payment_data_state"
                                                required
                                                :rules="rules.requireRule"
                                                :disabled="paymentDataState"
                                                >
                                            </v-select>
                                        </div>
                                    </v-row>
                                </b-card-body>
                            </b-collapse>
                        </b-card>

                        <!-- Lista de pagos -->
                        <template v-if="showPaymentsList">
                            <payment-list :payments="step6.payments" :paymentDataState="step6.payment_data_state" @approved="changeCuotePaymentState($event)"></payment-list>
                        </template>
                    </div>

                    <!-- Botón de nuevo pago -->
                    
                    <!-- Solo se mostrará si el cliente eligió cuotas y además el admin haya aprobado la sección de pago -->
                    <div class="text-right mt-5" v-if="showButtonNewPayment">
                        <!-- Solo se mostrará si el usuario eligió pagar en cuotas -->
                        <v-btn color="primary white--text" @click="newPaymentGenerate()">Nuevo pago</v-btn>
                    </div>

                    <!-- Alerta cuando el admin genere un anueva cuota -->
                    <b-card-body class="text-center" v-if="step6.payment_data_state === '3'">
                        <v-alert type="success" outlined prominent>
                            <span class="text-success font-weight-bold">Se ha generado la cuota nro {{ numberCuote }}</span>
                        </v-alert>
                        <p>
                            <a href="" class="text-danger" @click.prevent="deleteCuote()">Eliminar cuota generada</a>
                        </p>
                    </b-card-body>

                    <!-- Botón para enviar formulario -->
                    <div class="d-flex justify-content-between mt-5">
                        <v-btn class="mb-3 text-decoration-none mt-5" color="red darken-2 white--text" :to="{name: 'Dashboard'}">
                            <v-icon dark left>mdi-arrow-left</v-icon>
                            Dashboard
                        </v-btn>

                        <v-btn
                            type="submit"
                            color="primary"
                            class="mt-5"
                        >
                            Guardar
                            <v-icon dark right>mdi-checkbox-marked-circle</v-icon>
                        </v-btn>
                    </div>
                </v-form>

            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'

// Importa objetos estáticos para el formulario
import {
    itemsTypeDocument,
    itemsStatus,
    itemsPayment,
    itemsTypePayment,
    itemsTypeCourse,
    itemsCoin,
    getCountries,
    getCoursesPresenciales,
    getCoursesOnline } from '@/utilities/data-selects.js'

// Components
import Loader from '@/components/Loader'
import PaymentList from '@/components/PaymentList'
import CirclesInfo from '@/components/CirclesInfo'

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
                document_type: '',
                document_number: '',
                identification_state: ''
            },
            step2: {
                value: false,
                current: false,
                disabled: true,
                completed: false,
                name: '',
                last_name: '',
                surname: '',
                birthday: '',
                personal_data_state: ''
            },
            step3: {
                value: false,
                current: false,
                disabled: true,
                completed: false,
                email_principal: '',
                email_secundary: '',
                phone_principal: '',
                phone_secundary: '',
                cellphone: '',
                contact_data_state: ''
            },
            step4: {
                value: false,
                current: false,
                disabled: true,
                completed: false,
                company: '',
                position: '',
                address: '',
                city: '',
                province: '',
                itemsCountry: getCountries(),
                country: '',
                observation: '',
                location_data_state: ''
            },
            step5: {
                value: false,
                current: false,
                disabled: true,
                itemsTypeCourse,
                itemsCoursesPresenciales: getCoursesPresenciales(),
                itemsCoursesOnline: getCoursesOnline(),
                course_type: '',
                course_name: '',
                course_data_state: ''
            },
            step6: {
              itemsPayment, // Total o cuotas
              payment: '', // Aquí se asigna lo que el usuario eligió en itemsPayment
              itemsCoin,
              coin: '',
              amount: '',
              itemsTypePayment,
              payment_type: '',
              operation_number: '',
              operation_date: '',
              datePicker: false,
              voucher: '',
              bank: '',
              payment_data_state: '',
              payments: [],
              newPayment: false
            },
            alert: false
        }
    },
    components: {
        Loader,
        PaymentList,
        CirclesInfo
    },
    methods: {
        getUser() {

            this.$store.commit('setLoading', true)

            let id = this.$route.params.id,
            url = `http://174.138.39.59/form-api/api/v1/users/${id}`

            // Envíamos el token
            const config = {
                headers: { Authorization: `Bearer ${this.$store.state.token}` }
            };

            // Petición para obtener datos de usuario

            // Verificamos que el tipo de usuario sea admin para hacer la petición
            if(this.currentUser.type == 1) {
                axios.get(url, config)
                .then(res => {
                    if(res.statusText === 'OK') {

                        // Envía el usuario
                        this.setUser(res.data.message)

                        this.$store.commit('setLoading', false)
                    }
                }).catch((error) => {
                    // Si el usuario no existe, redirige al dashboard
                    if(error.message === 'Request failed with status code 500') {
                        this.$store.commit('setLoading', false)
                        this.$router.push({name: 'Dashboard'})
                    }
                    this.$store.commit('setLoading', false)
                })
            }
        },
        setUser(user) {
            // Test
            this.user = user

            if(user) {

                // Datos de identificación
                this.step1.document_type = user.document_type
                this.step1.document_number = user.document_number

                // Estado del paso 1
                // Se convierte a string para poder compararlo, de lo contrario tomaría el valor 0 como false
                this.step1.identification_state = user.identification_state.toString()

                // Datos personales
                this.step2.name = user.name
                this.step2.last_name = user.last_name
                this.step2.surname = user.surname
                this.step2.birthday = user.birthday

                // Estado paso 2
                this.step2.personal_data_state = user.personal_data_state.toString()

                // Datos de contacto
                this.step3.email_principal = user.email_principal
                this.step3.email_secundary = user.email_secundary
                this.step3.phone_principal = user.phone_principal
                this.step3.phone_secundary = user.phone_secundary
                this.step3.cellphone = user.cellphone

                // Estado paso 3
                this.step3.contact_data_state = user.contact_data_state.toString()

                // Datos de ubicación
                this.step4.company = user.company
                this.step4.position = user.position
                this.step4.address = user.address
                this.step4.country = user.country
                this.step4.city = user.city
                this.step4.province = user.province
                this.step4.observation = user.observation

                // Estado paso 4
                this.step4.location_data_state = user.location_data_state.toString()

                
                // Datos de curso
                this.step5.course_type = user.course_type
                this.step5.course_name = user.course_name

                // Estado paso 5
                this.step5.course_data_state = user.course_data_state.toString()

                // Obtiene el primer pago realizado por el usuario 
                let first_payment = user.payments[user.payments.length - 1]

                // Asigna las cuotas del usuario
                this.step6.payments = user.payments.reverse()

                // Datos de pago
                this.step6.coin = user.coin
                this.step6.payment = user.payment
                this.step6.amount = first_payment.amount
                this.step6.payment_type = first_payment.payment_type
                this.step6.operation_number = first_payment.operation_number
                this.step6.operation_date = first_payment.operation_date
                this.step6.voucher = first_payment.voucher
                this.step6.bank = first_payment.bank

                // Estado paso 6
                this.step6.payment_data_state = user.payment_data_state.toString()
            }
        },
        submit() {
            // Ocultamos el alert
            this.alert = false

            // Mostramos el botón cargando
            this.$store.state.loading = true

            // Si el formulario está validado, enviamos los datos.
            if(this.$refs.mainForm.validate()) {

                let iduser = this.$route.params.id

                let statusData = {
                    identification_state: parseInt(this.step1.identification_state),
                    personal_state: parseInt(this.step2.personal_data_state),
                    contact_state: parseInt(this.step3.contact_data_state),
                    location_state: parseInt(this.step4.location_data_state),
                    course_state: parseInt(this.step5.course_data_state),
                    iduser: parseInt(iduser)
                }

                // Verifica si el usuario eligió cuotas y además hay un nuevo pago generado
                if(this.step6.payment === 2 && this.step6.newPayment) {
                    statusData.payment_state = 3
                } else {
                    statusData.payment_state = parseInt(this.step6.payment_data_state)
                }

                // Petición para actualizar estado del usuario
                const options = {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${this.$store.state.token}`
                    },
                    data: statusData,
                    url: 'http://174.138.39.59/form-api/api/v1/users/admin',
                };

                axios(options).then(res => {
                    if(res.statusText == 'OK') {
                        this.alert = true
                        // Oculta el botón cargando
                        this.$store.state.loading = false
                    }

                }).catch(() => {
                    // Oculta el botón cargando
                    this.$store.state.loading = false
                })
        } else {
            // Si los datos del formulario están incompletos
            alert('Revisa que los campos estén completos')
            
            // Oculta el botón cargando
            this.$store.state.loading = false
        }
        },
        newPaymentGenerate() {
            if (this.step6.payment_data_state === '2' || this.step6.payment_data_state === '4'){
                // Si el payment state está como corregir o como pendiente
                alert('Primero debes aprobar el pago anterior')
            } else {
                this.step6.newPayment = true
                this.step6.payment_data_state = '3'
            }
        },
        deleteCuote() {
            this.step6.payment_data_state = '1'
        },
        changeCuotePaymentState(e) {
            this.step6.payment_data_state = e
        }
    },
    mounted() {
        getCoursesPresenciales()
        this.getUser()
    },
    computed: {
        ...mapState(['currentUser', 'users', 'loading']),
        identificationState: function() {
            return this.step1.identification_state === '1' ? true : false
        },
        personalDataState: function() {
            return this.step2.personal_data_state === '1' ? true : false
        },
        contactDataState: function() {
            return this.step3.contact_data_state === '1' ? true : false
        },
        locationDataState: function() {
            return this.step4.location_data_state === '1' ? true : false
        },
        courseDataState: function() {
            return this.step5.course_data_state === '1' ? true : false
        },
        paymentDataState: function() {
            return this.step6.payment_data_state === '1' ? true : false
        },
        showPaymentsList: function() {
            let status = false

            // Si eligió pagar en cuotas
            if(this.step6.payment === 2 && this.step6.payment_data_state != '0' && this.step6.payment_data_state != null) {
                status = true
            }

            return status
        },
        showButtonNewPayment: function() {
            let status = false

            // Si payment es 2 (Cuotas) && payment_data_state = 1 (Aprobado)
            if(this.step6.payment === 2 && this.step6.payment_data_state === '1' || this.step6.payment === 2 && this.step6.payment_data_state === '2' || this.step6.payment === 2 && this.step6.payment_data_state === '3') {
                status = true
            }

            return status
        },
        newPayment: function() {
            return this.step6.payments[0]
        },
        numberCuote: function() {
            return this.step6.payments.length + 1
        }
    }
}
</script>