<template>
<div>
  <b-card no-body class="mt-3 mb-1" v-for="(payment, index) in payments" :key="payment.idpayments">

    <b-card-header header-tag="header" class="py-3 bg-light d-flex justify-content-between align-items-center" role="tab">
      <a
        href="#"
        v-b-toggle="accordionName(index)"
        class="btn-link text-dark lead font-weight-bold"
      >
        Cuota {{ index + 1 }}
      </a>

      <!-- Puntos de referencia según el estado del payment_state -->
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <span v-on="on" v-if="showCircleSuccess(index)" class="circle-info bg-success"></span>
        </template>
        <span>Validado</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <span v-on="on" v-if="index === payments.length - 1 && paymentDataState === '2'" class="circle-info bg-danger"></span>
        </template>
        <span>Corregir</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <span v-on="on" v-if="index === payments.length - 1 && paymentDataState === '4'" class="circle-info bg-warning"></span>
        </template>
        <span>Verificando datos</span>
      </v-tooltip>

      
    </b-card-header>

    <b-collapse :id="accordionName(index)" accordion="my-accordion" role="tabpanel">
      <b-card-body>
        <div class="form-row">
          <div class="col-md-6">
            <v-text-field type="number" v-model="payment.amount" label="Monto" :disabled="enabledFieldsIsClient(index)" outlined required
              :rules="rules.requireRule"></v-text-field>
          </div>

          <div class="col-md-6">
            <v-select
              :items="itemsTypePayment"
              label="Tipo de pago"
              outlined
              v-model="payment.payment_type"
              :disabled="enabledFieldsIsClient(index)"
              :required="requiredField"
              :rules="rules.requireRule"
            ></v-select>
          </div>
        </div>

        <div class="form-row">
          <div class="col-md-6">
            <v-text-field
              type="number"
              v-model="payment.operation_number"
              label="Número de operación"
              outlined
              :disabled="enabledFieldsIsClient(index)"
              :required="requiredField"
              :rules="rules.requireRule"
            ></v-text-field>
          </div>

          <div class="col-md-6">
            <v-menu
              :ref="index"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="payment.operation_date"
                  label="Fecha de operación"
                  outlined
                  :disabled="enabledDatePicker(index)"
                  v-on="on"
                  :required="requiredField"
                  :rules="rules.requireRule"
                ></v-text-field>
              </template>
              <v-date-picker v-model="payment.operation_date" @input="index = false"></v-date-picker>
            </v-menu>
          </div>
        </div>

        <div class="form-row">
          <div class="col-md-6">
              <v-file-input
                v-model="payment.voucher"
                @change="setUrlVoucher($event)"
                :required="requiredField"
                :rules="rules.requireRule"
                outlined
                :disabled="enabledFieldsIsClient(index)"
                label="Subir voucher"
                v-if="paymentDataState === '2' && uploadNewVoucher"
              ></v-file-input>

              <!-- Si payment_state = 2 (corregir) && nuevo voucher && es cliente -->
              <template v-if=" paymentDataState === '2' && uploadNewVoucher === false && isClient">
                <p v-if="index === (payments.length - 1)">
                  <span class="font-weight-bold">Voucher anterior</span>
                  <a href="" class="ml-3" @click.prevent="uploadNewVoucher = true">Subir nuevo voucher</a>
                </p>
                <img :src="payment.voucher" alt class="img-fluid"/>
              </template>

              <!-- Si es admin solo se mostrará la imagen -->
              <template v-if="isAdmin">
                <span class="font-weight-bold">Voucher</span>
                <img :src="payment.voucher" alt class="img-fluid"/>
              </template>

              <!-- Muestra la vista previa de la imagen -->
              <img :src="urlVoucher" alt class="img-fluid" v-if="urlVoucher" />
              <img :src="payment.voucher" alt="voucher" class="img-fluid" v-if="!urlVoucher && !isAdmin && paymentDataState != '2'">
          </div>
          
          <div class="col-md-6" v-if="payment.payment_type === 2">
            <v-text-field v-model="payment.bank" label="Banco" outlined :disabled="enabledFieldsIsClient(index)" :required="requiredField"></v-text-field>
          </div>
        </div>


        <!-- Solo se mostrará el select con status en el último elemento -->
        <v-row class="justify-content-center" v-if="index === (payments.length - 1) && showStatus === true">
          <div class="col-md-6">
            <v-select
                :items="itemsStatusPayment"
                label="Estado"
                outlined
                required
                :rules="rules.requireRule"
                v-model="paymentState"
                @change="setItemApproved($event, index)"
                :disabled="paymentDataState === '1' || paymentDataState === '3' ? true : false"
                >
            </v-select>
          </div>
        </v-row>
      </b-card-body>
    </b-collapse>
  </b-card>
</div>
</template>

<script>
import { mapState } from 'vuex'

// Importa objetos estáticos para el formulario
import {
  itemsStatus,
  itemsPayment,
  itemsTypePayment,
  itemsCoin
} from "@/utilities/data-selects.js";

export default {
  props: ['payments', 'paymentDataState'],
  data() {
    return {
      itemsStatus,
      itemsPayment,
      itemsTypePayment,
      itemsCoin,
      datePickers: false,
      rules: {
          require: 'Este campo es requerido',
          requireRule: [
              v => !!v || this.rules.require
          ]
      },
      urlVoucher: '',
      paymentState: this.paymentDataState,
      uploadNewVoucher: false,
      itemsStatusPayment: [
          { value: null, text: 'Estado' },
          { value: '0', text: 'Registrado' },
          { value: '1', text: 'Aprobado' },
          { value: '2', text: 'Corregir' },
          { value: '4', text: 'Pendiente' }
      ],
    };
  },
  methods: {
    deleteCuote() {
      this.$emit("deleteCuote");
    },
    accordionName: function(index) {
      let number = index + 1;
      return `accordion--${number}`;
    },
    setItemApproved(e, index) {
      this.showCircleSuccess(index)
      if(e != '0' && e != null) {
        this.$emit('approved', e)
      }
    },
    setUrlVoucher(e) {
      this.urlVoucher = URL.createObjectURL(e);
    },
    enabledDatePicker(index) {
      let status = true

      if(this.currentUserType === 2 && this.paymentDataState === '2' && index === (this.payments.length - 1)) {
        status =  false
      }

      return status
    },
    showCircleSuccess(index) {
      let status = false,
        lastElement = this.payments.length - 1

      if(index !== lastElement || index === lastElement && this.paymentDataState === '1' || index === lastElement && this.paymentDataState === '3') {
        status = true
      }
      
      return status
    },
    enabledFieldsIsClient(index) {
      let status = true

      // Si es cliente y payment_state = 2 (Corregir)
      if(this.currentUserType === 2 && this.paymentDataState === '2' && index === (this.payments.length - 1)) {
        status = false
      }
      
      return status
    },
  },
  computed: {
    ...mapState(['currentUser']),
    currentUserType: function() {
      return parseInt(this.currentUser.type)
    },
    isClient: function() {
      return this.currentUserType === 2 ? true : false
    },
    isAdmin: function() {
      return this.currentUserType === 1 ? true : false
    },
    showStatus: function() {
      let status = false

      // Si es admin && 
      if(this.currentUserType === 1) {
        status = true
      }

      /* if(this.currentUserType === 1 && this.paymentDataState != 1 && this.paymentDataState != 3) {
        status = true
      } */

      return status
    },
    requiredField: function() {
      let required = true

      if(this.currentUserType === 1) {
        required = false
      }

      return required
    }
  }
};
</script>

<style lang="scss">
.circle-info {
  width: 1em;
  height: 1em;
  display: inline-block;
  padding-left: 1rem;
  border-radius: 50%;
}
</style>