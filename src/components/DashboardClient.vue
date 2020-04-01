<template>
  <div>
    <loader v-if="loading"></loader>
    <div class="row justify-content-center" v-else>
      <div class="row justify-content-center text-center" v-if="alert">
          <div class="col-md-6">
              <v-alert color="blue" type="info" outlined dismissible>
                  Los datos se actualizaron con éxito
              </v-alert>
          </div>
      </div>
      <div class="col-md-12">
        <!-- <pre>
          {{ user }}
        </pre> -->
      </div>
      <div class="col-md-8">
        <v-form ref="mainForm" v-model="valid" lazy-validation @submit.prevent="update()">
          <div role="tablist">
            <!-- Collapse 1 -->
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="py-3 bg-light" role="tab">
                <a
                  href="#"
                  v-b-toggle.accordion-1
                  class="btn-link text-dark lead font-weight-bold"
                >Identificación</a>
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
                        outlined
                        :disabled="identificationState"
                        v-if="step1.selectTypeDocument === 'CE' "
                      ></v-text-field>
                    </div>
                  </div>

                  <!-- Mensaje de datos validados -->
                  <div class="text-center" v-if="identificationState">
                    <p class="text-success font-weight-bold">Datos validados</p>
                  </div>

                </b-card-body>
              </b-collapse>
            </b-card>

            <!-- Collapse 2 -->
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="py-3 bg-light" role="tab">
                <a
                  href="#"
                  v-b-toggle.accordion-2
                  class="btn-link text-dark lead font-weight-bold"
                >Datos personales</a>
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

                  <!-- Mensaje de datos validados -->
                  <div class="text-center" v-if="personalDataState">
                    <p class="text-success font-weight-bold">Datos validados</p>
                  </div>

                </b-card-body>
              </b-collapse>
            </b-card>

            <!-- Datos de contacto -->
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="py-3 bg-light" role="tab">
                <a
                  href="#"
                  v-b-toggle.accordion-3
                  class="btn-link text-dark lead font-weight-bold"
                >Datos de contacto</a>
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

                  <!-- Mensaje de datos validados -->
                  <div class="text-center" v-if="contactDataState">
                    <p class="text-success font-weight-bold">Datos validados</p>
                  </div>

                </b-card-body>
              </b-collapse>
            </b-card>

            <!-- Datos de ubicación -->
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="py-3 bg-light" role="tab">
                <a
                  href="#"
                  v-b-toggle.accordion-4
                  class="btn-link text-dark lead font-weight-bold"
                >Datos de ubicación</a>
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
                      <v-text-field v-model="step4.city" label="Ciudad" required outlined :disabled="locationDataState"></v-text-field>
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
                      ></v-textarea>
                    </div>
                  </div>

                  <!-- Mensaje de datos validados -->
                  <div class="text-center" v-if="locationDataState">
                    <p class="text-success font-weight-bold">Datos validados</p>
                  </div>

                </b-card-body>
              </b-collapse>
            </b-card>

            <!-- Datos de curso -->
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="py-3 bg-light" role="tab">
                <a
                  href="#"
                  v-b-toggle.accordion-5
                  class="btn-link text-dark lead font-weight-bold"
                >Datos de curso</a>
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
                      ></v-select>

                      <!-- Selecto con cursos online -->
                      <v-select
                        :items="step5.itemsCoursesPresenciales"
                        label="Curso"
                        outlined
                        v-model="step5.course_name"
                        v-if="step5.course_type === 2"
                        :disabled="courseDataState"
                      ></v-select>
                    </div>
                  </div>

                  <!-- Mensaje de datos validados -->
                  <div class="text-center" v-if="courseDataState">
                    <p class="text-success">Datos validados</p>
                  </div>

                </b-card-body>
              </b-collapse>
            </b-card>

            <!-- Datos de pago -->
            <b-card no-body class="mb-1">
              <b-card-header header-tag="header" class="py-3 bg-light" role="tab">
                <a
                  href="#"
                  v-b-toggle.accordion-6
                  class="btn-link text-dark lead font-weight-bold"
                >Datos de pago</a>
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
                      ></v-select>
                    </div>

                    <div class="col-md-6">
                      <v-select
                        :items="step6.itemsCoin"
                        label="Moneda"
                        outlined
                        v-model="step6.coin"
                        :disabled="paymentDataState"
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
                      <img :src="step6.voucher" alt class="img-fluid" />
                    </div>
                  </v-row>

                  <!-- Mensaje de datos validados -->
                  <div class="text-center" v-if="paymentDataState">
                    <p class="text-success font-weight-bold">Datos validados</p>
                  </div>
                  
                </b-card-body>
              </b-collapse>
            </b-card>

            <!-- Nueva cuota -->
            <b-card no-body class="mb-1" v-if="step6.payment_data_state === '3'">
              <b-card-header header-tag="header" class="py-3 bg-light" role="tab">
                <a
                  href="#"
                  v-b-toggle.accordion-7
                  class="btn-link text-danger lead"
                >Tienes una nueva cuota pendiente o en revisión</a>
              </b-card-header>
              <b-collapse id="accordion-7" accordion="my-accordion" role="tabpanel">
                <b-card-body>
                  <div class="form-row">
                    <div class="col-md-6">
                      <!-- Nueva cuota moneda -->
                      <v-select
                        :items="step6.itemsCoin"
                        label="Moneda"
                        outlined
                        v-model="step6.coin"
                        required
                        :rules="rules.requireRule"
                      ></v-select>
                    </div>

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
                  </div>

                  <div class="form-row">
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
                  </div>

                  <div class="form-row">
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

                    <!-- Nueva cuota banco -->
                    <div class="col-md-6" v-if="newCuote.payment_type === 2">
                      <v-text-field v-model="newCuote.bank" label="Banco" required outlined></v-text-field>
                    </div>
                  </div>

                  <v-row>
                    <div class="col-md-6">
                      <v-file-input
                        v-model="newCuote.voucher"
                        :rules="rules.requireRule"
                        @change="setUrlVoucher()"
                        required
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

export default {
  mounted() {
    this.getUser();
  },
  components: {
    Loader
  },
  data() {
    return {
      user: {},
      valid: true,
      itemsStatus,
      rules: {
        require: "Este campo es requerido",
        requireRule: [v => !!v || this.rules.require]
      },
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
        payment_data_state: ""
      },
      newCuote: {
        status: false,
        coin: "",
        amount: "",
        payment_type: "",
        operation_number: "",
        datePicker: false,
        operation_date: "",
        voucher: "",
        bank: "",
        urlVoucher: ""
      },
      alert: false
    };
  },
  computed: {
    ...mapState(["currentUser", "loading"]),
    parseIntUserType: function() {
      return parseInt(this.currentUser.type);
    },
    identificationState: function() {
      return this.step1.identification_state === "2" ? false : true;
    },
    personalDataState: function() {
      return this.step2.personal_data_state === "2" ? false : true;
    },
    contactDataState: function() {
      return this.step3.contact_data_state === "2" ? false : true;
    },
    locationDataState: function() {
      return this.step4.location_data_state === "2" ? false : true;
    },
    courseDataState: function() {
      return this.step5.course_data_state === "2" ? false : true;
    },
    paymentDataState: function() {
      return this.step6.payment_data_state === "2" ? false : true;
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
    }
  },
  methods: {
    // Hace la petición cuando carga el componente
    getUser() {
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
              this.$store.commit("setLoading", false);
            }
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

        // Estado paso 6
        this.step6.payment_data_state = user.payment_data_state.toString();
      }
    },
    update() {
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

      // Step 5
      formData.append('typeCourse', this.step5.course_type)
      formData.append('course', this.step5.course_name)

      // Nueva cuota
      formData.append('paymentType', this.newCuote.payment_type)
      formData.append('payment', this.newCuote.payment)
      formData.append('amount', parseInt(this.newCuote.amount))
      formData.append('coin', this.newCuote.coin)
      formData.append('operationNumber', parseInt(this.newCuote.operation_number))
      formData.append('operationDate', this.newCuote.operation_date)
      formData.append('bank', this.newCuote.bank)
      formData.append('voucher', this.newCuote.voucher)

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
          // Obetenemos nuevamente los datos del usuario
          this.getUser()

          // Limpiar nueva cuota
          this.clearNewCuote()

          this.$store.commit("setLoading", false);
          this.alert = true
        })
        .catch(() => {
          this.$store.commit("setLoading", false);
        });
    },
    setUrlVoucher: function() {
      // Esta función crea una URL para poder mostrar el voucher
      this.newCuote.urlVoucher = URL.createObjectURL(this.newCuote.voucher);
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

<style lang="scss" scoped>
</style>