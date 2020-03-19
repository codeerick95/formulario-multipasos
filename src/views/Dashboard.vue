<template>
    <div class="container mt-3">
        <loader v-if="loading"></loader>
        <div class="row" v-else>
            <!-- Camparamos como string porque así lo guarda localStorage -->
            <div class="col-md-12" v-if="currentUser.status && userType === 1 || currentUser.status && userType === '1'">

                <div class="card py-1">
                    <div class="card-body">
                        <h2 class="title mb-5">Panel de administración</h2>
                        <p>Bienvenido {{ currentUser.data.name }}</p>

                        <!-- Formulario de filtro -->
                        <div class="form-row justify-content-center">
                            <div class="col-md-6 col-lg-4">
                                <b-form-group class="d-flex justify-content-center">
                                    <b-input-group size="sm">

                                        <b-form-input v-model="filter" size="lg" type="search" id="filterInput" placeholder="Filtrar" class="py-3"
                                        >
                                        </b-form-input>

                                        <b-input-group-append>
                                            <b-button :disabled="!filter" @click="filter = ''">Limpiar filtros</b-button>
                                        </b-input-group-append>
                                    </b-input-group>
                                </b-form-group>
                            </div>
                        </div>

                        <!-- Table -->
                        <b-table hover bordered responsive
                            show-empty
                            :items="users"
                            :fields="fields"
                            :current-page="currentPage"
                            :per-page="perPage"
                            :filter="filter"
                            :filterIncludedFields="filterOn"
                            :sort-by.sync="sortBy"
                            :sort-desc.sync="sortDesc"
                            :sort-direction="sortDirection"
                            @filtered="onFiltered"
                            >
                            <template v-slot:cell(name)="row">
                                {{ row.value }}
                            </template>

                            <template v-slot:cell(actions)="row">
                                <div class="d-flex justify-content-center align-items-center">
                                    <b-button size="sm" class="mr-1" variant="primary" @click="info(row.item)">
                                    Detalles
                                </b-button>
                                <b-button size="sm" variant="danger">
                                    Eliminar
                                </b-button>
                                </div>
                            </template>
                        </b-table>

                    </div>

                    <div class="card-footer">
                        <div class="d-flex justify-content-center justify-content-md-end">
                            <b-pagination
                            v-model="currentPage"
                            :total-rows="totalRows"
                            :per-page="perPage"
                            align="fill"
                            class="my-0"
                            ></b-pagination>
                        </div>
                    </div>

                </div>

            </div>
        </div>

        <!-- Dashboard de cliente -->
        <div class="row justify-content-center" v-if="currentUser.status && userType === '2' || currentUser.status && userType === 2">
            <div class="col-md-8">
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
                                                v-model="step1.document_type"
                                                ref="selectTypeDocument"
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
                                            v-if="step1.selectTypeDocument === 'DNI' "
                                            ></v-text-field>

                                            <!-- Campo Pasaporte -->
                                            <v-text-field
                                            type="number"
                                            v-model="step1.typeDocumentField"
                                            label="Pasaporte"
                                            required
                                            outlined
                                            :disabled="identificationState"
                                            v-if="step1.selectTypeDocument === 'PASAPORTE' "
                                            ></v-text-field>

                                            <!-- Campo  CE -->
                                            <v-text-field
                                            type="number"
                                            v-model="step1.typeDocumentField"
                                            label="Carnet de extranjería"
                                            required
                                            outlined
                                            :disabled="identificationState"
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
                                                v-model="step1.identification_state"
                                                ref="selectTypeDocument"
                                                :rules="rules.requireRule"
                                                required
                                                disabled
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
                                                ref="selectTypeDocument"
                                                :rules="rules.requireRule"
                                                required
                                                disabled=""
                                                >
                                            </v-select>
                                        </div>
                                    </v-row>
                                </b-card-body>
                            </b-collapse>
                        </b-card>

                        <!-- Datos de contacto -->
                        <b-card no-body class="mb-1">
                            <b-card-header header-tag="header" class="py-3 bg-light" role="tab">
                                <a href="#" v-b-toggle.accordion-3 class="btn-link text-dark lead font-weight-bold">Datos de contacto</a>
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
                                                ref="selectTypeDocument"
                                                :rules="rules.requireRule"
                                                required
                                                disabled
                                                >
                                            </v-select>
                                        </div>
                                    </v-row>
                                </b-card-body>
                            </b-collapse>
                        </b-card>
                        
                        <!-- Datos de ubicación -->
                        <b-card no-body class="mb-1">
                            <b-card-header header-tag="header" class="py-3 bg-light" role="tab">
                                <a href="#" v-b-toggle.accordion-4 class="btn-link text-dark lead font-weight-bold">Datos de ubicación</a>
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
                                            v-model="step4.observation"
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
                                            v-model="step4.location_data_state"
                                            ref="selectTypeDocument"
                                            :rules="rules.requireRule"
                                            required
                                            disabled=""
                                            >
                                        </v-select>
                                    </div>
                                </v-row>

                                </b-card-body>
                            </b-collapse>
                        </b-card>

                        <!-- Datos de curso -->
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
                                            v-model="step5.course_type"
                                            :disabled="courseDataState"
                                        >
                                        </v-select>
                                    </div>

                                    <div class="col-md-6">
                                        <v-select
                                                :items="step5.itemsCoursesPresenciales"
                                                label="Curso"
                                                outlined
                                                v-model="step5.course_name"
                                                v-if="step5.course_type === 1"
                                                :disabled="courseDataState"
                                                >
                                            </v-select>
                                            <v-select
                                                :items="step5.itemsCoursesOnline"
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
                                            ref="selectTypeDocument"
                                            required
                                            disabled
                                            >
                                        </v-select>
                                    </div>
                                </v-row>

                                </b-card-body>
                            </b-collapse>
                        </b-card>

                        <!-- Datos de pago -->
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
                                            :disabled="paymentDataState"
                                            >
                                            </v-select>
                                        </div>

                                        <div class="col-md-6">
                                        <v-select
                                            :items="step6.itemsCoin"
                                            label="Moneda"
                                            outlined
                                            v-model="step6.coin"
                                            :disabled="paymentDataState"
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
                                                    :disabled="paymentDataState"
                                                    >
                                            </v-text-field>
                                        </div>

                                        <div class="col-md-6">
                                            <v-select
                                            :items="step6.itemsTypePayment"
                                            label="Tipo de pago"
                                            outlined
                                            v-model="step6.payment_type"
                                            :disabled="paymentDataState"
                                            >
                                        </v-select>
                                        </div>

                                    </div>

                                    <div class="form-row">

                                        <div class="col-md-6">
                                            <v-text-field
                                                    type="number"
                                                    v-model="step6.operation_number"
                                                    label="Número de operación"
                                                    required
                                                    outlined
                                                    :disabled="paymentDataState"
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
                                                            v-model="step6.operation_date"
                                                            label="Fecha de operación"
                                                            required
                                                            outlined
                                                            v-on="on"
                                                            :disabled="paymentDataState"
                                                        ></v-text-field>
                                                    </template>
                                                    <v-date-picker v-model="step6.operation_date" @input="step6.datePicker = false"></v-date-picker>
                                                </v-menu>
                                        </div>

                                    </div>

                                    <div class="form-row">

                                        <div class="col-md-6" v-if="step6.payment_type === 2">
                                            <v-text-field
                                                    v-model="step6.bank"
                                                    label="Banco"
                                                    required
                                                    outlined
                                                    :disabled="paymentDataState"
                                            ></v-text-field>
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
                                            v-model="step6.payment_data_state"
                                            ref="selectTypeDocument"
                                            :rules="rules.requireRule"
                                            required
                                            disabled
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
                            :disabled="disabledButtonSubmit"
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
import axios from 'axios'

import Loader from '@/components/Loader'

// Importa objetos estáticos para el formulario
import {
    itemsPayment,
    itemsTypePayment,
    itemsTypeDocument,
    itemsTypeCourse,
    itemsCoin,
    getCountries,
    getCoursesPresenciales,
    itemsStatus,
    getCoursesOnline} from '@/utilities/data-selects.js'

export default {
     mounted() {
      // Hace el pedido cuando el usuario inicia sesión
      if(!this.users.length) {
        this.getUsers()
      }

      this.setUserFullName()

      // Asignamos número de filas
      this.setRows()

      // Si es usuario normal
      this.setUser()
    },
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
                selectTypeDocument: 'DNI',
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
              itemsPayment,
              payment: '',
              itemsCoin,
              coin: '',
              amount: '',
              itemsTypePayment,
              payment_type: '',
              operation_number: '',
              operation_date: '',
              datePicker: false,
              voucher: {},
              bank: '',
              payment_data_state: ''
            },
            fields: [
                { key: 'fullName', label: 'Nombre completo', sortable: true, sortDirection: 'desc' },
                { key: 'document_number', label: 'Nro Documento', sortable: true, class: 'text-center' },
                { key: 'course_type', label: 'Tipo de curso', sortable: true, class: 'text-center' },
                { key: 'course_name', label: 'Curso', sortable: true, class: 'text-center' },
                { key: 'state', label: 'Estado', sortable: true, class: 'text-center' },
                { key: 'actions', label: 'Acciones' }
            ],
            filter: null,
            filterOn: [],
            perPage: 3,
            currentPage: 1,
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            totalRows: 1
        }
    },
    components: {
        Loader
    },
    methods: {
      info(item) {
        let userId = item.iduser

        this.$router.push({name: 'User', params: {id: userId}})
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      setUserFullName() {
          this.users.forEach(user => {
              user.fullName = `${user.name} ${user.last_name} ${user.surname}`
          })
      },
        setUser() {
            if(this.currentUser.status && this.currentUser.data.user) {

                // Datos de identificación
                this.step1.document_type = this.currentUser.data.user.document_type
                this.step1.document_number = this.currentUser.data.user.document_number

                // Estado del paso 1
                // Se convierte a string para poder compararlo, de lo contrario tomaría el valor 0 como false
                this.step1.identification_state = this.currentUser.data.user.identification_state.toString()

                // Datos personales
                this.step2.name = this.currentUser.data.user.name
                this.step2.last_name = this.currentUser.data.user.last_name
                this.step2.surname = this.currentUser.data.user.surname
                this.step2.birthday = this.currentUser.data.user.birthday

                // Estado paso 2
                this.step2.personal_data_state = this.currentUser.data.user.personal_data_state.toString()

                // Datos de contacto
                this.step3.email_principal = this.currentUser.data.user.email_principal
                this.step3.email_secundary = this.currentUser.data.user.email_secundary
                this.step3.phone_principal = this.currentUser.data.user.phone_principal
                this.step3.phone_secundary = this.currentUser.data.user.phone_secundary
                this.step3.cellphone = this.currentUser.data.user.cellphone

                // Estado paso 3
                this.step3.contact_data_state = this.currentUser.data.user.contact_data_state.toString()

                // Datos de ubicación
                this.step4.company = this.currentUser.data.user.company
                this.step4.position = this.currentUser.data.user.position
                this.step4.address = this.currentUser.data.user.address
                this.step4.country = this.currentUser.data.user.country
                this.step4.city = this.currentUser.data.user.city
                this.step4.province = this.currentUser.data.user.province
                this.step4.observation = this.currentUser.data.user.observation

                // Estado paso 4
                this.step4.location_data_state = this.currentUser.data.user.location_data_state.toString()

                
                // Datos de curso
                this.step5.course_type = this.currentUser.data.user.course_type
                this.step5.course_name = this.currentUser.data.user.course_name

                // Estado paso 5
                this.step5.course_data_state = this.currentUser.data.user.course_data_state.toString()

                // Datos de pago
                this.step6.coin = this.currentUser.data.user.coin
                this.step6.payment = this.currentUser.data.user.payment
                this.step6.amount = this.currentUser.data.user.amount
                this.step6.payment_type = this.currentUser.data.user.payment_type
                this.step6.operation_number = this.currentUser.data.user.operation_number
                this.step6.operation_date = this.currentUser.data.user.operation_date
                this.step6.voucher = this.currentUser.data.user.voucher
                this.step6.bank = this.currentUser.data.user.bank

                // Estado paso 6
                this.step6.payment_data_state = this.currentUser.data.user.payment_data_state.toString()
            }
        },
        getUsers() {
            this.$store.commit('setLoading', true)

            const options = {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${this.$store.state.token}`
                    },
                url: 'http://174.138.39.59/form-api/api/v1/users',
            };

            axios(options).then(res => {
                    this.$store.state.users = res.data.message
                    this.setUserFullName()
                    // Asignamos número de filas
                    this.setRows()
                    this.$store.commit('setLoading', false)
                }).catch(() => {
                    this.$store.commit('setLoading', false)
                })
        },
        setRows() {
            this.totalRows = this.users.length
        }
    },
    computed: {
        ...mapState(['users', 'currentUser', 'loading', 'userType']),
        identificationState: function() {
            return this.step1.identification_state === '2' ? false : true
        },
        personalDataState: function() {
            return this.step2.personal_data_state === '2' ? false : true
        },
        contactDataState: function() {
            return this.step3.contact_data_state === '2' ? false : true
        },
        locationDataState: function() {
            return this.step4.location_data_state === '2' ? false : true
        },
        courseDataState: function() {
            return this.step5.course_data_state === '2' ? false : true
        },
        paymentDataState: function() {
            return this.step6.payment_data_state === '2' ? false : true
        },
        disabledButtonSubmit: function() {
            let status = true

            if(this.step1.identification_state === '3' || this.step2.personal_data_state === '3' || this.step3.contact_data_state === '3' || this.step4.location_data_state === '3' || this.step5.course_data_state === '3' || this.step6.payment_data_state === '3') {
                // Si alguna de las validaciones está por corregir, se habilita el botón de enviar
                status = false
            }
            return status
        },
        checkDisabledSelect: function() { 
            let status

            if(this.currentUser.data.admin) {
                status = false
            } else {
                status = true
            }

            return status
        }
    }
}
</script>