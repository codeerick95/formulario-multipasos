<template>
  <div>
    <loader v-if="loading"></loader>
    <div class="row justify-content-center" v-else>

      <!-- Alertas -->
      <div class="row justify-content-center text-center">
          <div class="col-md-6">
              <v-alert color="blue" type="info" outlined dismissible v-if="alert">
                  Los datos se actualizaron con éxito.
              </v-alert>
              <v-alert color="red" type="info" outlined dismissible v-if="formError">
                  Error con tu red de internet, <a @click.prevent="getUser()" class="link-retry">inténtalo nuevamente.</a>
              </v-alert>
          </div>
      </div>

      <div class="col-md-12">
        <!-- <pre>
          {{ user }}
        </pre> -->
      </div>

      <!-- Form -->
      <div class="col-md-8" v-if="formError.length === 0">
        <v-form ref="formUpdate" v-model="valid" lazy-validation @submit.prevent="update()">
          <div role="tablist">
            <!-- Collapse 1 -->
            <b-card no-body class="mb-1">

              <b-card-header header-tag="header" class="py-3 bg-light d-flex justify-content-between" role="tab">
                <a href="#" v-b-toggle.accordion-1 class="btn-link text-dark lead font-weight-bold">Identificación</a>

                <!-- Círculos que muestran el estado -->
                <circles-info :dataToValidate="step1.identification_state"></circles-info>

                <!-- <span class="text-danger" v-if="step1.identification_state === '2'">Corregir datos</span> -->
              </b-card-header>

              <b-collapse id="accordion-1" accordion="my-accordion" role="tabpanel">
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
                          required
                          :rules="rules.requireRule"
                        ></v-select>
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
                        :rules="rules.typeDocumentFieldDni"
                        outlined
                        :disabled="identificationState"
                        v-if="step1.selectTypeDocument === 'DNI' "
                      ></v-text-field>

                      <!-- Campo Pasaporte -->
                      <v-text-field
                        type="number"
                        v-model="step1.document_number"
                        label="Pasaporte"
                        required
                        :rules="rules.typeDocumentFieldPasaport"
                        outlined
                        :disabled="identificationState"
                        v-if="step1.selectTypeDocument === 'PASAPORTE' "
                      ></v-text-field>

                      <!-- Campo  CE -->
                      <v-text-field
                        type="number"
                        v-model="step1.document_number"
                        label="Carnet de extranjería"
                        required
                        :rules="rules.typeDocumentFieldCe"
                        outlined
                        :disabled="identificationState"
                        v-if="step1.selectTypeDocument === 'CE' "
                      ></v-text-field>
                    </div>
                  </div>

                </b-card-body>
              </b-collapse>
            </b-card>

            <!-- Collapse 2 -->
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="py-3 bg-light d-flex justify-content-between" role="tab">
                <a
                  href="#"
                  v-b-toggle.accordion-2
                  class="btn-link text-dark lead font-weight-bold"
                >Datos personales</a>

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
                        :rules="rules.requireRule"
                        outlined
                        :disabled="personalDataState"
                      ></v-text-field>
                    </div>

                    <div class="col-md-6 py-0">
                      <v-text-field
                        v-model="step2.last_name"
                        label="Apellido paterno"
                        required
                        :rules="rules.requireRule"
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
                        :rules="rules.requireRule"
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
                            :rules="rules.requireRule"
                            outlined
                            :disabled="personalDataState"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="step2.birthday" @input="step2.datePicker = false"></v-date-picker>
                      </v-menu>
                    </div>
                  </div>

                </b-card-body>
              </b-collapse>
            </b-card>

            <!-- Datos de contacto -->
            <b-card no-body class="mb-1">

              <b-card-header header-tag="header" class="py-3 bg-light d-flex justify-content-between" role="tab">
                <a
                  href="#"
                  v-b-toggle.accordion-3
                  class="btn-link text-dark lead font-weight-bold"
                >Datos de contacto</a>

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
                        :rules="rules.requireRule"
                        :disabled="contactDataState"
                      ></v-text-field>
                    </div>

                    <div class="col-md-6">
                      <v-text-field
                        v-model="step3.email_secundary"
                        label="Email secundario"
                        outlined
                        required
                        :rules="rules.requireRule"
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
                        :rules="rules.requireRule"
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
                        :rules="rules.requireRule"
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
                        :rules="rules.requireRule"
                        outlined
                        :disabled="contactDataState"
                      ></v-text-field>
                    </div>
                  </div>

                </b-card-body>
              </b-collapse>
            </b-card>

            <!-- Datos de ubicación -->
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="py-3 bg-light d-flex justify-content-between" role="tab">
                <a
                  href="#"
                  v-b-toggle.accordion-4
                  class="btn-link text-dark lead font-weight-bold"
                >Datos de ubicación</a>

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
                        :rules="rules.requireRule"
                        outlined
                        :disabled="locationDataState"
                      ></v-text-field>
                    </div>

                    <div class="col-md-6">
                      <v-text-field
                        v-model="step4.position"
                        label="Cargo"
                        required
                        :rules="rules.requireRule"
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
                        :rules="rules.requireRule"
                        outlined
                        :disabled="locationDataState"
                      ></v-text-field>
                    </div>

                    <div class="col-md-6">
                      <v-text-field v-model="step4.city" label="Ciudad" required :rules="rules.requireRule" outlined :disabled="locationDataState"></v-text-field>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="col-md-6">
                      <v-text-field
                        v-model="step4.province"
                        label="Provincia"
                        required
                        :rules="rules.requireRule"
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
                        required
                        :rules="rules.requireRule"
                      ></v-select>
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
                        required
                        :rules="rules.requireRule"
                      ></v-textarea>
                    </div>
                  </div>

                </b-card-body>
              </b-collapse>
            </b-card>

            <!-- Datos de curso -->
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="py-3 bg-light d-flex justify-content-between" role="tab">
                <a
                  href="#"
                  v-b-toggle.accordion-5
                  class="btn-link text-dark lead font-weight-bold"
                >Datos de curso</a>

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
                        required
                        :rules="rules.requireRule"
                      ></v-select>
                    </div>

                    <div class="col-md-6">
                      <!-- Selecto con cursos presenciales -->
                      <v-select
                        :items="step5.itemsCoursesOnline"
                        label="Curso"
                        outlined
                        v-model="step5.course_name"
                        v-if="step5.course_type === 1"
                        :disabled="courseDataState"
                        required
                        :rules="rules.requireRule"
                      ></v-select>

                      <!-- Selecto con cursos online -->
                      <v-select
                        :items="step5.itemsCoursesPresenciales"
                        label="Curso"
                        outlined
                        v-model="step5.course_name"
                        v-if="step5.course_type === 2"
                        :disabled="courseDataState"
                        required
                        :rules="rules.requireRule"
                      ></v-select>
                    </div>
                  </div>

                </b-card-body>
              </b-collapse>
            </b-card>

            <!-- Datos de pago solo se mostrará cuando el cliente se encuentre como registrado -->
            <b-card no-body class="mb-1" v-if="isTotal && step6.payment_data_state === '0' || isTotal && step6.payment_data_state === '1' || isTotal && step6.payment_data_state === '2'">
              <b-card-header header-tag="header" class="py-3 bg-light d-flex justify-content-between" role="tab">
                <a
                  href="#"
                  v-b-toggle.accordion-6
                  class="btn-link text-dark lead font-weight-bold"
                >Datos de pago</a>

                <!-- Círculos que muestran el estado -->
                <!-- Puntos de referencia según el estado del payment_state -->
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <span v-on="on" v-if="step6.payment_data_state === '1'" class="circle-info bg-success"></span>
                  </template>
                  <span>Validado</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <span v-on="on" v-if="step6.payment_data_state === '2'" class="circle-info bg-danger"></span>
                  </template>
                  <span>Corregir</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <span v-on="on" v-if="step6.payment_data_state === '0' || step6.payment_data_state === '4'" class="circle-info bg-warning"></span>
                  </template>
                  <span>Verificando datos</span>
                </v-tooltip>

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
                      ></v-select>
                    </div>

                    <div class="col-md-6">
                      <v-select
                        :items="step6.itemsCoin"
                        label="Moneda"
                        outlined
                        v-model="step6.coin"
                        disabled
                      ></v-select>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="col-md-6">
                      <v-text-field
                        type="number"
                        v-model="step6.amount"
                        label="Monto"
                        required
                        :rules="rules.requireRule"
                        outlined
                        :disabled="paymentDataState"
                      ></v-text-field>
                    </div>

                    <div class="col-md-6">
                      <v-select
                        :items="step6.itemsTypePayment"
                        label="Tipo de pago"
                        outlined
                        v-model="step6.payment_type"
                        :disabled="paymentDataState"
                        required
                        :rules="rules.requireRule"
                      ></v-select>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="col-md-6">
                      <v-text-field
                        type="number"
                        v-model="step6.operation_number"
                        label="Número de operación"
                        required
                        :rules="rules.requireRule"
                        outlined
                        :disabled="paymentDataState"
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
                            v-model="step6.operation_date"
                            label="Fecha de operación"
                            required
                            :rules="rules.requireRule"
                            outlined
                            v-on="on"
                            :disabled="paymentDataState"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="step6.operation_date"
                          @input="step6.datePicker = false"
                        ></v-date-picker>
                      </v-menu>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="col-md-6" v-if="step6.payment_data_state === '2' && uploadNewVoucher">
                      <v-file-input
                        v-model="step6.voucher"
                        @change="setUrlVoucher()"
                        required
                        :rules="rules.requireRule"
                        outlined
                        label="Subir voucher"
                      ></v-file-input>
                      <img :src="step6.urlVoucher" alt class="img-fluid"/>
                    </div>

                    <div class="col-md-6" v-if="step6.payment_type === 2">
                      <v-text-field
                        v-model="step6.bank"
                        label="Banco"
                        required
                        :rules="rules.requireRule"
                        outlined
                        :disabled="paymentDataState"
                      ></v-text-field>
                    </div>
                  </div>

                  <v-row>
                    <div class="col-md-6">

                      <template v-if="step6.payment_data_state != '1' && uploadNewVoucher === false">
                        <p>
                          <span class="font-weight-bold">Voucher anterior</span>
                          <a href="" class="ml-3" @click.prevent="uploadNewVoucher = true">Subir nuevo voucher</a>
                        </p>
                        <img :src="step6.voucher" alt class="img-fluid"/>
                        
                      </template>

                    
                      <!-- <img :src="step6.voucher" alt class="img-fluid" v-if="!step6.urlVoucher"/>

                      <img :src="step6.urlVoucher" alt class="img-fluid" v-if="step6.urlVoucher != ''" /> -->
                    </div>
                  </v-row>
                  
                </b-card-body>
              </b-collapse>
            </b-card>

            <!-- Lista de pagos se mostrará la lista cuando el admin haya aprobado al cliente -->
            <payment-list :payments="step6.payments" :paymentDataState="step6.payment_data_state" v-else></payment-list>

            <!-- Nueva cuota, solo se muestra si el payment_state = 3 -->
            <b-card no-body class="mb-1" v-if="step6.payment_data_state === '3'">
              <b-card-header header-tag="header" class="py-3 bg-light" role="tab">
                <a
                  href="#"
                  v-b-toggle.accordion-7
                  class="btn-link text-danger lead"
                >Pendiente la cuota nro {{ step6.payments.length + 1 }}</a>
              </b-card-header>
              <b-collapse id="accordion-7" visible accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <div class="form-row">
                    <!-- Nueva cuota monto -->
                    <div class="col-md-6">
                      <v-text-field
                        type="number"
                        v-model="newCuote.amount"
                        label="Monto"
                        required
                        :rules="rules.requireRule"
                        outlined
                      ></v-text-field>
                    </div>

                    <!-- Nueva cuota tipo de pago -->
                    <div class="col-md-6">
                      <v-select
                        :items="step6.itemsTypePayment"
                        label="Tipo de pago"
                        outlined
                        v-model="newCuote.payment_type"
                        required
                        :rules="rules.requireRule"
                      ></v-select>
                    </div>
                  </div>

                  <div class="form-row">
                    
                    <!-- Nueva cuota número de operación -->
                    <div class="col-md-6">
                      <v-text-field
                        type="number"
                        v-model="newCuote.operation_number"
                        label="Número de operación"
                        outlined
                        required
                        :rules="rules.requireRule"
                      ></v-text-field>
                    </div>

                    <!-- Nueva cuota fecha de pago -->
                    <div class="col-md-6">
                      <v-menu
                        v-model="newCuote.datePicker"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        transition="scale-transition"
                        offset-y
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="newCuote.operation_date"
                            label="Fecha de operación"
                            outlined
                            v-on="on"
                            required
                            :rules="rules.requireRule"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="newCuote.operation_date"
                          @input="newCuote.datePicker = false"
                        ></v-date-picker>
                      </v-menu>
                    </div>

                  </div>

                  <div class="form-row">
                    <!-- Nueva cuota banco -->
                    <div class="col-md-6" v-if="newCuote.payment_type === 2">
                      <v-text-field v-model="newCuote.bank" label="Banco" required :rules="rules.requireRule" outlined></v-text-field>
                    </div>
                  </div>

                  <v-row>
                    <div class="col-md-6">
                      <v-file-input
                        v-model="newCuote.voucher"
                        @change="setUrlVoucher()"
                        required
                        :rules="rules.requireRule"
                        outlined
                        label="Subir voucher"
                      ></v-file-input>
                      <div v-if="newCuote.voucher != ''">
                        <span>Voucher</span>
                        <img :src="newCuote.urlVoucher" alt="Imagen de voucher" class="img-fluid" />
                      </div>
                    </div>
                  </v-row>
                </b-card-body>
              </b-collapse>
            </b-card>
            <!-- End new cuota -->

          </div>
          <div class="text-center mt-3">
            <v-btn
              type="submit"
              color="red darken-2 white--text"
              :disabled="disabledButtonSubmit"
            >Guardar</v-btn>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";

// Components
import Loader from "@/components/Loader";
import PaymentList from '@/components/PaymentList'
import CirclesInfo from '@/components/CirclesInfo'

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
  getCoursesOnline
} from "@/utilities/data-selects.js";

// Importa las reglas para cada item del form
import { rules } from '@/utilities/rules.js'

export default {
  mounted() {
    this.getUser();
  },
  components: {
    Loader,
    PaymentList,
    CirclesInfo
  },
  data() {
    return {
      user: {},
      valid: true,
      itemsStatus,
      rules,
      step1: {
        iduser: 0,
        itemsTypeDocument,
        document_type: "",
        document_number: "",
        selectTypeDocument: "DNI",
        identification_state: ""
      },
      step2: {
        name: "",
        last_name: "",
        surname: "",
        birthday: "",
        personal_data_state: ""
      },
      step3: {
        email_principal: "",
        email_secundary: "",
        phone_principal: "",
        phone_secundary: "",
        cellphone: "",
        contact_data_state: ""
      },
      step4: {
        company: "",
        position: "",
        address: "",
        city: "",
        province: "",
        itemsCountry: getCountries(),
        country: "",
        observation: "",
        location_data_state: ""
      },
      step5: {
        itemsTypeCourse,
        itemsCoursesPresenciales: getCoursesPresenciales(),
        itemsCoursesOnline: getCoursesOnline(),
        course_type: "",
        course_name: "",
        course_data_state: ""
      },
      step6: {
        itemsPayment,
        payment: "",
        itemsCoin,
        coin: "",
        amount: "",
        itemsTypePayment,
        payment_type: "",
        operation_number: "",
        operation_date: "",
        datePicker: false,
        voucher: {},
        bank: "",
        payment_data_state: "",
        payments: []
      },
      newCuote: {
        status: false,
        amount: "",
        payment_type: "",
        operation_number: "",
        datePicker: false,
        operation_date: "",
        voucher: "",
        bank: "",
        urlVoucher: ""
      },
      alert: false,
      uploadNewVoucher: false
    };
  },
  computed: {
    ...mapState(["currentUser", "loading", 'formError']),
    parseIntUserType: function() {
      return parseInt(this.currentUser.type);
    },
    identificationState: function() {
      return this.step1.identification_state === "2" || this.step1.identification_state === "0" ? false : true;
    },
    personalDataState: function() {
      return this.step2.personal_data_state === "2" || this.step2.personal_data_state === "0" ? false : true;
    },
    contactDataState: function() {
      return this.step3.contact_data_state === "2" || this.step3.contact_data_state === "0" ? false : true;
    },
    locationDataState: function() {
      return this.step4.location_data_state === "2" || this.step4.location_data_state === "0" ? false : true;
    },
    courseDataState: function() {
      return this.step5.course_data_state === "2" || this.step5.course_data_state === "0" ? false : true;
    },
    paymentDataState: function() {
      return this.step6.payment_data_state === "2" || this.step6.payment_data_state === "0" ? false : true;
    },
    disabledButtonSubmit: function() {
      let status = true;

      if (
        this.step1.identification_state === "2" ||
        this.step2.personal_data_state === "2" ||
        this.step3.contact_data_state === "2" ||
        this.step4.location_data_state === "2" ||
        this.step5.course_data_state === "2" ||
        this.step6.payment_data_state === "2" ||
        this.step6.payment_data_state === "3"
      ) {
        // Si alguna de las validaciones está por corregir, se habilita el botón de enviar
        status = false;
      }
      return status;
    },
    checkDisabledSelect: function() {
      let status;

      if (this.currentUser.data.admin) {
        status = false;
      } else {
        status = true;
      }

      return status;
    },
    isTotal: function() {
      return this.step6.payment === 1 ? true : false
    }
  },
  methods: {
    // Hace la petición cuando carga el componente
    getUser() {
      // Limpiamos el error anterior
      this.$store.commit('setErrorFormMessage', '')

      this.$store.commit("setLoading", true);

      let id = this.currentUser.userId;

      if (id) {
        let url = `http://174.138.39.59/form-api/api/v1/users/${id}`;
        // Envíamos el token
        const config = {
          headers: { Authorization: `Bearer ${this.$store.state.token}` }
        };

        // Petición para obtener datos de usuario
        axios
          .get(url, config)
          .then(res => {
            if (res.statusText === "OK") {
              // Envía el usuario
              this.setUser(res.data.message);

              this.$store.commit("setLoading", false);
            }
          })
          .catch((error) => {
            if(error.message === 'Request failed with status code 500') {
              this.$store.dispatch('logout')
            } else if(error.message === 'Network Error') {
              let errorMessage = 'Error con tu red de internet, inténtalo nuevamente.'

              // Envía el mensaje de error
              this.$store.commit('setErrorFormMessage', errorMessage)
            }

            this.$store.commit("setLoading", false);
          });
      }
    },
    // Guarda los datos devueltos anteriormente en el estado local del componente
    setUser(user) {
      // Test
      this.user = user;

      if (user) {
        // Datos de identificación
        this.step1.iduser = user.iduser;
        this.step1.document_type = user.document_type;
        this.step1.document_number = user.document_number;

        // Estado del paso 1
        // Se convierte a string para poder compararlo, de lo contrario tomaría el valor 0 como false
        this.step1.identification_state = user.identification_state.toString();

        // Datos personales
        this.step2.name = user.name;
        this.step2.last_name = user.last_name;
        this.step2.surname = user.surname;
        this.step2.birthday = user.birthday;

        // Estado paso 2
        this.step2.personal_data_state = user.personal_data_state.toString();

        // Datos de contacto
        this.step3.email_principal = user.email_principal;
        this.step3.email_secundary = user.email_secundary;
        this.step3.phone_principal = user.phone_principal;
        this.step3.phone_secundary = user.phone_secundary;
        this.step3.cellphone = user.cellphone;

        // Estado paso 3
        this.step3.contact_data_state = user.contact_data_state.toString();

        // Datos de ubicación
        this.step4.company = user.company;
        this.step4.position = user.position;
        this.step4.address = user.address;
        this.step4.country = user.country;
        this.step4.city = user.city;
        this.step4.province = user.province;
        this.step4.observation = user.observation;

        // Estado paso 4
        this.step4.location_data_state = user.location_data_state.toString();

        // Datos de curso
        this.step5.course_type = user.course_type;
        this.step5.course_name = user.course_name;

        // Estado paso 5
        this.step5.course_data_state = user.course_data_state.toString();

        // Datos de pago
        this.step6.coin = user.coin;
        this.step6.payment = user.payment;
        this.step6.amount = user.payments[0].amount;
        this.step6.payment_type = user.payments[0].payment_type;
        this.step6.operation_number = user.payments[0].operation_number;
        this.step6.operation_date = user.payments[0].operation_date;
        this.step6.voucher = user.payments[0].voucher;
        this.step6.bank = user.payments[0].bank;

        this.step6.payments = user.payments.reverse()

        // Estado paso 6
        this.step6.payment_data_state = user.payment_data_state.toString();
      }
    },
    update() {
      // Valida si el formulario ha sido completado
      if(this.$refs.formUpdate.validate()) {
        // Limpiamos el error anterior
        this.$store.commit('setErrorFormMessage', '')

        this.$store.commit("setLoading", true);

        // Ocultamos el alert
        this.alert = false

        // Creamos FormData para que la Api pueda recibir los datos
        let formData = new FormData();

        formData.append('iduser', this.step1.iduser)

        // Step 1
        formData.append('documentType', this.step1.document_type)
        formData.append('documentNumber', this.step1.document_number)

        // Step 2
        formData.append('name', this.step2.name)
        formData.append('lastName', this.step2.last_name)
        formData.append('surname', this.step2.surname)
        formData.append('birthday', this.step2.birthday)

        // Step 3
        formData.append('email', this.step3.email_principal)
        formData.append('emailSecundary', this.step3.email_secundary)
        formData.append('phone', this.step3.phone_principal)
        formData.append('phoneSecundary', this.step3.phone_secundary)
        formData.append('cellphone', this.step3.cellphone)

        // Step 4
        formData.append('company', this.step4.company)
        formData.append('position', this.step4.position)
        formData.append('address', this.step4.address)
        formData.append('country', this.step4.country)
        formData.append('city', this.step4.city)
        formData.append('province', this.step4.province)
        formData.append('observation', this.step4.observation)

        // Step 5
        formData.append('typeCourse', this.step5.course_type)
        formData.append('course', this.step5.course_name)

        // Nueva cuota

        // Si el cliente eligió pago total
        if(this.step6.payment === 1) {
          formData.append('paymentType', this.step6.payment_type)
          formData.append('payment', this.step6.payment)
          formData.append('amount', parseInt(this.step6.amount))
          formData.append('coin', this.step6.coin)
          formData.append('operationNumber', parseInt(this.step6.operation_number))
          formData.append('operationDate', this.step6.operation_date)
          
          if(this.step6.payment_type === 2) {
            formData.append('bank', this.step6.bank)
          }
          
          formData.append('voucher', this.step6.voucher)
        }

        // Si el cliente eligió cuotas y el payment state = corregir
        if(this.step6.payment === 2 && this.step6.payment_data_state === '2') {
          formData.append('paymentType', this.step6.payments[this.step6.payments.length - 1].payment_type)
          formData.append('amount', parseInt(this.step6.payments[this.step6.payments.length - 1].amount))
          formData.append('operationNumber', parseInt(this.step6.payments[this.step6.payments.length - 1].operation_number))
          formData.append('operationDate', this.step6.payments[this.step6.payments.length - 1].operation_date)

          if(this.step6.payments[0].payment_type === 2) {
            formData.append('bank', this.step6.payments[this.step6.payments.length - 1].bank)
          }

          formData.append('voucher', this.step6.payments[this.step6.payments.length - 1].voucher)
        }

        // Si el cliente eligió cuotas y el payment state es nueva cuota
        if(this.step6.payment === 2 && this.step6.payment_data_state === '3') {
          formData.append('paymentType', this.newCuote.payment_type)
          formData.append('amount', parseInt(this.newCuote.amount))
          formData.append('operationNumber', parseInt(this.newCuote.operation_number))
          formData.append('operationDate', this.newCuote.operation_date)
          
          if(this.step6.payment_type === 2) {
            formData.append('bank', this.newCuote.bank)
          }
          formData.append('voucher', this.newCuote.voucher)
        }

        // Petición POST
        const options = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`
          },
          data: formData,
          url: "http://174.138.39.59/form-api/api/v1/users"
        };
        axios(options)
          .then(() => {
            // Obtenemos nuevamente los datos del usuario
            this.getUser()

            // Limpiar nueva cuota
            // this.clearNewCuote()

            this.$store.commit("setLoading", false);
            this.alert = true

            // Cambiamos a false el subir nuevo voucher
            this.uploadNewVoucher = false

            // Limpiamos la imagen generada para visualizar cuando el cliente hace un cambio
            this.step6.urlVoucher = ''
          })
          .catch((error) => {
            if(error.message === 'Network Error') {
              let errorMessage = 'Error con tu red de internet, inténtalo nuevamente.'

              // Envía el mensaje de error
              this.$store.commit('setErrorFormMessage', errorMessage)
            }

            this.$store.commit("setLoading", false);
          });
      } else {
        alert('Completa todos los campos')
      }
    },
    setUrlVoucher: function() {
      // Esta función crea una URL para poder mostrar el voucher
      if(this.step6.payment === 1) {
        this.step6.urlVoucher = URL.createObjectURL(this.step6.voucher);
      } else {
        this.newCuote.urlVoucher = URL.createObjectURL(this.newCuote.voucher);
      }
    },
    clearNewCuote() {
      this.newCuote.payment_type = ''
      this.newCuote.payment = ''
      this.newCuote.amount = ''
      this.newCuote.coin = ''
      this.newCuote.operation_number = ''
      this.newCuote.operation_date = ''
      this.newCuote.bank = ''
      this.newCuote.voucher = ''
    }
  }
};
</script>

<style lang="scss">
.link-retry {
  color: rgba(#F44336, .9) !important;

  &:hover {
    text-decoration: underline !important;
  }
}
</style>