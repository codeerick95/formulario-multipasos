<template>
    <div :class="classColumns">
        <v-card class="mt-5">

            <h1 class="form-title text-center pt-3">Registro de usuarios</h1>

            <!-- Este subtítulo cambia según el paso en el que se encuentre el usuario -->
            <h2 class="subtitle text-center font-weight-regular mt-5 mb-5">{{ setSubtitle }}</h2>

                <v-stepper
                v-model="stepCurrent"
                class="pb-0"
                >
                    <v-stepper-header>
                        <!-- Steps es la cantidad de pasos -->
                        <template v-for="n in steps">

                            <v-stepper-step
                                :key="`${n}-step`"
                                :complete="stepCurrent > n"
                                :step="n"
                            >

                            </v-stepper-step>

                            <v-divider
                                v-if="n !== steps"
                                :key="n"
                            ></v-divider>

                        </template>
                    </v-stepper-header>

                    <v-stepper-items>

                        <v-stepper-content
                        v-for="n in steps"
                        :key="`${n}-content`"
                        :step="n"
                        >

                            <!-- Pasos: Cada paso tiene un formulario para poder validar los campos, pero solo
                            el último es el que hace el submit -->
   
                            <!-- Contenido paso 1 -->
                            <template v-if="n === 1">
                                <v-form
                                    ref="form1"
                                    v-model="valid"
                                    lazy-validation
                                    @submit.prevent="submit(n)"
                                >
                                    <v-row class="my-5 pb-5">
                                        <!-- Select tipo de documento -->
                                        <div class="col-md-6 py-0">
                                            <v-select
                                                :items="step1.itemsTypeDocument"
                                                label="Tipo de documento"
                                                outlined
                                                v-model="step1.documentType"
                                                :rules="rules.requireRule"
                                                @change="step1.documentNumber = ''"
                                                ref="selectTypeDocument"
                                                >
                                            </v-select>
                                        </div>

                                        <!-- Campos según tipo de documento -->

                                        <div class="col-md-6 py-0">
                                            
                                            <!-- Campo  DNI -->
                                            <v-text-field
                                            type="number"
                                            v-model="step1.documentNumber"
                                            :rules="rules.typeDocumentFieldDni"
                                            label="DNI"
                                            required
                                            outlined
                                            v-if="step1.documentType === 1"
                                            ></v-text-field>

                                            <!-- Campo Pasaporte -->
                                            <v-text-field
                                            type="number"
                                            v-model="step1.documentNumber"
                                            :rules="rules.typeDocumentFieldPasaport"
                                            label="Pasaporte"
                                            required
                                            outlined
                                            v-if="step1.documentType === 2"
                                            ></v-text-field>

                                            <!-- Campo  CE -->
                                            <v-text-field
                                            type="number"
                                            v-model="step1.documentNumber"
                                            :rules="rules.typeDocumentFieldCe"
                                            label="Carnet de extranjería"
                                            required
                                            outlined
                                            v-if="step1.documentType === 3"
                                            ></v-text-field>
                                        </div>
                                    </v-row>

                                    <!-- Button submit -->
                                    <div class="d-flex justify-content-end blue-grey darken-4 py-2 px-5 mb-0 button-form-container">
                                        <v-btn
                                            type="submit"
                                            color="red darken-2 white--text"
                                        >
                                            {{ setButtonText }}
                                        </v-btn>
                                    </div>
                                </v-form>
                            </template>

                            <!-- Contenido paso 2 -->
                            <template v-if="n === 2">
                                <v-form
                                    ref="form2"
                                    v-model="valid"
                                    lazy-validation
                                    @submit.prevent="submit(n)"
                                >
                                    <div class="form-row mt-5 pb-5">

                                        <div class="col-md-6 py-0">
                                            <v-text-field
                                                v-model="step2.name"
                                                :rules="rules.requireRule"
                                                label="Nombre"
                                                required
                                                outlined
                                            ></v-text-field>
                                        </div>

                                        <div class="col-md-6 py-0">
                                            <v-text-field
                                                v-model="step2.lastName"
                                                :rules="rules.requireRule"
                                                label="Apellido paterno"
                                                required
                                                outlined
                                            ></v-text-field>
                                        </div>

                                    </div>

                                    <div class="form-row mb-5 pb-5">

                                        <div class="col-md-6 py-0">
                                            <v-text-field
                                                v-model="step2.surname"
                                                :rules="rules.requireRule"
                                                label="Apellido materno"
                                                required
                                                outlined
                                            ></v-text-field>
                                        </div>

                                        <!-- Fecha de nacimiento -->
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
                                                        :rules="rules.requireRule"
                                                        label="Fecha de nacimiento"
                                                        required
                                                        outlined
                                                        v-on="on"
                                                    ></v-text-field>
                                                </template>
                                                <v-date-picker v-model="step2.birthday" @input="step2.datePicker = false"></v-date-picker>
                                            </v-menu>
                                        </div>

                                    </div>

                                    <!-- Botones anterior y siguiente -->
                                    <div class="form-row justify-content-between blue-grey darken-4 py-2 px-5 button-form-container">

                                        <!-- Anterior -->
                                        <v-btn
                                            type="button"
                                            color="red darken-2 white--text"
                                            @click="stepCurrent = stepCurrent - 1"
                                        >
                                            Anterior
                                        </v-btn>

                                        <!-- Siguiente -->
                                        <v-btn
                                            type="submit"
                                            color="red darken-2 white--text"
                                        >
                                            {{ setButtonText }}
                                        </v-btn>

                                    </div>

                                </v-form>
                            </template>

                            <!-- Contenido paso 3 -->
                            <template v-if="n === 3">
                                <v-form
                                    ref="form3"
                                    v-model="valid"
                                    lazy-validation
                                    @submit.prevent="submit(n)"
                                >
                                    <div class="form-row mt-5">

                                        <div class="col-md-6 py-0">
                                            <v-text-field
                                                v-model="step3.email"
                                                :rules="rules.email"
                                                label="Email principal"
                                                outlined
                                                required
                                            ></v-text-field>
                                        </div>

                                        <div class="col-md-6 py-0">
                                            <v-text-field
                                                v-model="step3.emailSecundary"
                                                :rules="rules.email"
                                                label="Email secundario"
                                                outlined
                                                required
                                            ></v-text-field>
                                        </div>

                                    </div>

                                    <v-row>
                                        <v-col cols="12" md="6" class="py-0">
                                            <v-text-field
                                                type="number"
                                                v-model="step3.phone"
                                                :rules="rules.requireRule"
                                                label="Teléfono principal"
                                                required
                                                outlined
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" md="6" class="py-0">
                                            <v-text-field
                                                type="number"
                                                v-model="step3.phoneSecundary"
                                                :rules="rules.requireRule"
                                                label="Teléfono de trabajo"
                                                required
                                                outlined
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>


                                    <div class="form-row mb-5 pb-5">

                                        <div class="col-md-6 py-0">
                                            <v-text-field
                                                type="number"
                                                v-model="step3.cellphone"
                                                :rules="rules.requireRule"
                                                label="Celular"
                                                required
                                                outlined
                                            ></v-text-field>
                                        </div>

                                    </div>

                                    <!-- Botones anterior y siguiente -->
                                    <div class="d-flex justify-content-between blue-grey darken-4 py-2 px-5 button-form-container">

                                        <!-- Anterior -->
                                        <v-btn
                                            type="button"
                                            color="red darken-2 white--text"
                                            @click="stepCurrent = stepCurrent - 1"
                                        >
                                            Anterior
                                        </v-btn>

                                        <!-- Siguiente -->
                                        <v-btn
                                            type="submit"
                                            color="red darken-2 white--text"
                                        >
                                            {{ setButtonText }}
                                        </v-btn>

                                    </div>
                                </v-form>
                            </template>

                            <!-- Contenido paso 4 -->
                            <template v-if="n === 4">
                                <v-form
                                    ref="form4"
                                    v-model="valid"
                                    lazy-validation
                                    @submit.prevent="submit(n)"
                                >

                                <div class="form-row mt-5">

                                    <div class="col-md-6 py-0">
                                        <v-text-field
                                            v-model="step4.company"
                                            label="Empresa"
                                            required
                                            :rules="rules.requireRule"
                                            outlined
                                        ></v-text-field>
                                    </div>

                                    <div class="col-md-6 py-0">
                                        <v-text-field
                                                v-model="step4.position"
                                                label="Cargo"
                                                required
                                                :rules="rules.requireRule"
                                                outlined
                                        ></v-text-field>
                                    </div>

                                </div>

                                <div class="form-row">

                                    <div class="col-md-6 py-0">
                                        <v-text-field
                                            v-model="step4.address"
                                            :rules="rules.requireRule"
                                            label="Dirección"
                                            required
                                            outlined
                                        ></v-text-field>
                                    </div>

                                    <div class="col-md-6 py-0">
                                        <v-text-field
                                            v-model="step4.city"
                                            :rules="rules.requireRule"
                                            label="Ciudad"
                                            required
                                            outlined
                                        ></v-text-field>
                                    </div>

                                </div>

                                <div class="form-row">

                                    <div class="col-md-6 py-0">
                                        <v-text-field
                                            v-model="step4.province"
                                            :rules="rules.requireRule"
                                            label="Provincia"
                                            required
                                            outlined
                                        ></v-text-field>
                                    </div>

                                    <div class="col-md-6 py-0">
                                        <v-select
                                            :items="step4.itemsCountry"
                                            label="País"
                                            outlined
                                            v-model="step4.country"
                                            :rules="rules.requireRule"
                                            >
                                        </v-select>
                                    </div>

                                </div>

                                <div class="form-row mb-5 pb-5">

                                    <div class="col py-0">
                                        <v-textarea
                                            v-model="step4.observations"
                                            outlined
                                            name="input-7-4"
                                            label="Observaciones"
                                        ></v-textarea>
                                    </div>

                                </div>
                                    

                                    <!-- Botones anterior y siguiente -->
                                    <div class="d-flex justify-content-between blue-grey darken-4 py-2 px-5 button-form-container">

                                        <!-- Anterior -->
                                        <v-btn
                                            type="button"
                                            color="red darken-2 white--text"
                                            @click="stepCurrent = stepCurrent - 1"
                                        >
                                            Anterior
                                        </v-btn>

                                        <!-- Siguiente -->
                                        <v-btn
                                            type="submit"
                                            color="red darken-2 white--text"
                                        >
                                            {{ setButtonText }}
                                        </v-btn>

                                    </div>
                                </v-form>
                            </template>

                            <!-- Contenido paso 5 -->
                            <template v-if="n === 5">
                                <v-form
                                    ref="form5"
                                    v-model="valid"
                                    lazy-validation
                                    @submit.prevent="submit(n)"
                                >

                                
                                    <div class="form-row mt-5 mb-5 pb-5">

                                        <div class="col-md-6 py-0 mt-5 mt-md-0">
                                            <v-select
                                                :items="step5.itemsTypeCourse"
                                                label="Tipo de curso"
                                                outlined
                                                v-model="step5.typeCourse"
                                                :rules="rules.requireRule"
                                                >
                                            </v-select>
                                        </div>

                                        <div class="col-md-6 py-0">
                                            <v-select
                                                :items="step5.itemsCoursesOnline"
                                                label="Curso"
                                                outlined
                                                :rules="rules.requireRule"
                                                v-model="step5.course"
                                                v-if="step5.typeCourse === 1"
                                                >
                                            </v-select>
                                            <v-select
                                                :items="step5.itemsCoursesPresenciales"
                                                label="Curso"
                                                outlined
                                                :rules="rules.requireRule"
                                                v-model="step5.course"
                                                v-if="step5.typeCourse === 2"
                                                >
                                            </v-select>
                                        </div>

                                    </div>

                                    <!-- Botones anterior y siguiente -->
                                    <div class="d-flex justify-content-between blue-grey darken-4 py-2 px-5 button-form-container">

                                        <!-- Anterior -->
                                        <v-btn
                                            type="button"
                                            color="red darken-2 white--text"
                                            @click="stepCurrent = stepCurrent - 1"
                                        >
                                            Anterior
                                        </v-btn>

                                        <!-- Siguiente -->
                                        <v-btn
                                            type="submit"
                                            color="red darken-2 white--text"
                                        >
                                            {{ setButtonText }}
                                        </v-btn>

                                    </div>
                                </v-form>
                            </template>

                            <!-- Pago paso 6 -->
                            <template v-if="n === 6">
                              <v-form
                                    ref="form6"
                                      v-model="valid"
                                      lazy-validation
                                      enctype="multipart/form-data"
                                      @submit.prevent="submit(n)"
                                  >

                                  <v-row class="mt-5">
                                      <div class="col-md-6 py-0 mt-5 mt-md-0">
                                        <v-select
                                          :items="step6.itemsPayment"
                                          label="PAGO"
                                          outlined
                                          v-model="step6.payment"
                                          :rules="rules.requireRule"
                                          >
                                        </v-select>
                                      </div>
                                      <div class="col-md-6 py-0 mt-5 mt-md-0">
                                        <v-select
                                          :items="step6.itemsCoin"
                                          label="Moneda"
                                          outlined
                                          v-model="step6.coin"
                                          :rules="rules.requireRule"
                                          >
                                        </v-select>
                                      </div>
                                  </v-row>

                                  <v-row>
                                    <div class="col-md-6 py-0">
                                      <v-text-field
                                            type="number"
                                            v-model="step6.amount"
                                            :rules="rules.requireRule"
                                            label="Monto"
                                            required
                                            outlined
                                            >
                                      </v-text-field>
                                    </div>
                                    <div class="col-md-6 py-0">
                                      <v-select
                                          :items="step6.itemsTypePayment"
                                          label="Tipo de pago"
                                          outlined
                                          v-model="step6.paymentType"
                                          :rules="rules.requireRule"
                                          >
                                      </v-select>
                                    </div>
                                  </v-row>

                                  <!-- Campos según tipo de pago -->
                                  <v-row>
                                    <div class="col-md-6 py-0">
                                      <v-text-field
                                            type="number"
                                            v-model="step6.operationNumber"
                                            :rules="rules.requireRule"
                                            label="Número de operación"
                                            required
                                            outlined
                                            >
                                      </v-text-field>
                                    </div>
                                    <div class="col-md-6 py-0">
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
                                                    v-model="step6.operationDate"
                                                    :rules="rules.requireRule"
                                                    label="Fecha de operación"
                                                    required
                                                    outlined
                                                    v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker v-model="step6.operationDate" @input="step6.datePicker = false"></v-date-picker>
                                        </v-menu>
                                    </div>
                                  </v-row>

                                  <v-row class="mb-5 pb-5">
                                    <div class="col-md-6">
                                      <v-file-input v-model="step6.voucher" :rules="rules.requireRule" @change="setUrlVoucher()" required outlined label="Subir voucher"></v-file-input>
                                      <img :src="step7.urlVoucher" alt="Voucher" class="img-fluid" v-if=" step7.urlVoucher ">
                                    </div>
                                    <!-- Solo se mostrará si selecciona transferencia -->
                                    <div class="col-md-6" v-if="step6.paymentType === 2">
                                      <v-text-field
                                            v-model="step6.bank"
                                            label="Banco"
                                            :rules="rules.requireRule"
                                            required
                                            outlined
                                      ></v-text-field>
                                    </div>
                                  </v-row>

                                  <!-- Botones anterior y siguiente -->
                                    <div class="d-flex justify-content-between blue-grey darken-4 py-2 px-5 button-form-container">

                                        <!-- Anterior -->
                                        <v-btn
                                            type="button"
                                            color="red darken-2 white--text"
                                            @click="stepCurrent = stepCurrent - 1"
                                        >
                                            Anterior
                                        </v-btn>

                                        <!-- Siguiente -->
                                        <v-btn
                                            type="submit"
                                            color="red darken-2 white--text"
                                        >
                                            {{ setButtonText }}
                                        </v-btn>

                                    </div>
                                    
                                  </v-form>
                            </template>

                            <!-- Contenido paso 7 -->
                            <template v-if="n === 7">
                                <div class="row justify-content-center mt-5">

                                    <div class="col-md-10 mb-5">
                                        <!-- Datos de identificación -->
                                        <h3 class="font-weight-bold lead d-flex justify-content-between align-items-center">
                                            Datos de identificación:
                                            <v-icon right class="icon-pen" @click="stepCurrent = 1">mdi-pencil</v-icon>
                                        </h3>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <p>
                                                    <span class="text-muted mr-3">Tipo de documento:</span>
                                                    <span>{{ setNameTypeDocument }}</span>
                                                </p>
                                            </div>

                                            <div class="col-md-6">
                                                <p>
                                                    <span class="text-muted mr-3">Número de documento:</span>
                                                    <span>{{ step1.documentNumber }}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Datos personales -->
                                <div class="row justify-content-center mt-5">
                                    <div class="col-md-10 mb-5">

                                        <h3 class="font-weight-bold lead mb-3 d-flex justify-content-between align-items-center">
                                            Datos personales:
                                            <v-icon right class="icon-pen" @click="stepCurrent = 2">mdi-pencil</v-icon>
                                        </h3>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <p>
                                                    <span class="text-muted mr-3">Nombre:</span>
                                                    <span>{{ step2.name }}</span>
                                                </p>
                                            </div>

                                            <div class="col-md-4">
                                                <p>
                                                    <span class="text-muted mr-3">Apellidos:</span>
                                                    <span>{{ step2.lastName }} {{ step2.surname }}</span>
                                                </p>
                                            </div>

                                            <div class="col-md-4">
                                                <p>
                                                    <span class="text-muted mr-1 mr-md-3">Fecha de nacimiento:</span>
                                                    <span>{{ step2.birthday }}</span>
                                                </p>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>

                                <!-- Datos de contacto -->
                                <div class="row justify-content-center mt-5">
                                    <div class="col-md-10 mb-5">
                                        <h3 class="font-weight-bold lead mb-3 d-flex justify-content-between align-items-center">
                                            Datos de contacto:
                                            <v-icon right class="icon-pen" @click="stepCurrent = 3">mdi-pencil</v-icon>
                                        </h3>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <p>
                                                    <span class="text-muted mr-3">Email principal:</span>
                                                    <span>{{ step3.email }}</span>
                                                </p>
                                            </div>
                                            <div class="col-md-4">
                                                <p>
                                                    <span class="text-muted mr-3">Email secundario:</span>
                                                    <span>{{ step3.emailSecundary }}</span>
                                                </p>
                                            </div>

                                            <div class="col-md-4">
                                                <p>
                                                    <span class="text-muted mr-3">Teléfono particular:</span>
                                                    <span>{{ step3.phone }}</span>
                                                </p>
                                            </div>

                                            <div class="col-md-4">
                                                <p>
                                                    <span class="text-muted mr-3">Teléfono de trabajo:</span>
                                                    <span>{{ step3.phoneSecundary }}</span>
                                                </p>
                                            </div>

                                            <div class="col-md-4">
                                                <p>
                                                    <span class="text-muted mr-3">Celular:</span>
                                                    <span>{{ step3.cellphone }}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Datos de ubicación -->
                                <div class="row justify-content-center mt-5">
                                    <div class="col-md-10 mb-5">
                                        <h3 class="font-weight-bold lead mb-3 d-flex justify-content-between align-items-center">
                                            Datos de ubicación:
                                            <v-icon right class="icon-pen" @click="stepCurrent = 4">mdi-pencil</v-icon>
                                        </h3>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <p>
                                                    <span class="text-muted mr-3">Empresa:</span>
                                                    <span>{{ step4.company }}</span>
                                                </p>
                                            </div>
                                            <div class="col-md-4">
                                                <p>
                                                    <span class="text-muted mr-3">Cargo:</span>
                                                    <span>{{ step4.position }}</span>
                                                </p>
                                            </div>

                                            <div class="col-md-4">
                                                <p>
                                                    <span class="text-muted mr-3">Dirección:</span>
                                                    <span>{{ step4.address }}</span>
                                                </p>
                                            </div>

                                            <div class="col-md-4">
                                                <p>
                                                    <span class="text-muted mr-3">Ciudad:</span>
                                                    <span>{{ step4.city }}</span>
                                                </p>
                                            </div>

                                            <div class="col-md-4">
                                                <p>
                                                    <span class="text-muted mr-3">Estado/Provincia:</span>
                                                    <span>{{ step4.province }}</span>
                                                </p>
                                            </div>

                                            <div class="col-md-4">
                                                <p>
                                                    <span class="text-muted mr-3">País:</span>
                                                    <span>{{ step4.country }}</span>
                                                </p>
                                            </div>

                                            <div class="col-md-12">
                                                    <div class="pl-1">
                                                    <span class="text-muted mr-3">Observaciones:</span>
                                                    <span>{{ step4.observations }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Datos de curso -->
                                <div class="row justify-content-center mt-5">
                                    <div class="col-md-10 mb-5">
                                        <h3 class="font-weight-bold lead mb-3 d-flex justify-content-between align-items-center">
                                            Datos de curso:
                                            <v-icon right class="icon-pen" @click="stepCurrent = 5">mdi-pencil</v-icon>
                                        </h3>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <p>
                                                    <span class="text-muted mr-3">Tipo de curso:</span>
                                                    <span>{{ setNameTypeCourse }}</span>
                                                </p>
                                            </div>
                                            <div class="col-md-8">
                                                    <p>
                                                    <span class="text-muted mr-3">Curso:</span>
                                                    <span>{{ step5.course }}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Datos de curso -->
                                <div class="row justify-content-center my-5">
                                    <div class="col-md-10 mb-5">
                                        <h3 class="font-weight-bold lead mb-3 d-flex justify-content-between align-items-center">
                                            Datos de pago:
                                            <v-icon right class="icon-pen" @click="stepCurrent = 6">mdi-pencil</v-icon>
                                        </h3>
                                        <v-row>
                                            <div class="col-md-4">
                                                <p>
                                                    <span class="text-muted mr-3">Pago:</span>
                                                    <span>{{ setNamePayment }}</span>
                                                </p>
                                            </div>
                                            <div class="col-md-4">
                                                    <p>
                                                    <span class="text-muted mr-3">Moneda:</span>
                                                    <span>{{ step6.coin }}</span>
                                                </p>
                                            </div>
                                        </v-row>
                                        <v-row>
                                            <div class="col-md-4">
                                                <p>
                                                    <span class="text-muted mr-3">Monto:</span>
                                                    <span>{{ step6.amount }}</span>
                                                </p>
                                            </div>
                                            <div class="col-md-4">
                                                    <p>
                                                    <span class="text-muted mr-3">Tipo de pago:</span>
                                                    <span>{{ step6.paymentType }}</span>
                                                </p>
                                            </div>
                                        </v-row>
                                        <v-row>
                                            <div class="col-md-4">
                                                <p>
                                                    <span class="text-muted mr-3">Número de operación:</span>
                                                    <span>{{ step6.operationNumber }}</span>
                                                </p>
                                            </div>
                                            <div class="col-md-4">
                                                    <p>
                                                    <span class="text-muted mr-3">Fecha de operación:</span>
                                                    <span>{{ step6.operationDate }}</span>
                                                </p>
                                            </div>
                                        </v-row>
                                        <v-row>
                                            <div class="col-md-4">
                                                <p class="text-muted mr-3">Voucher:</p>
                                                <img :src="step7.urlVoucher" alt="" class="img-fluid">
                                            </div>
                                            <div class="col-md-6" v-if="step6.paymentType === 2">
                                                <span class="text-muted mr-3">Banco:</span>
                                                <span>{{ step6.bank }}</span>
                                            </div>
                                        </v-row>
                                        <v-row>
                                            <div class="col-md-12">
                                                <!-- Mensaje de error -->
                                                <div class="text-center" v-if="formError">
                                                    <a @click.prevent="stepCurrent = 3" class="text-danger error-link">{{ formError }}</a>
                                                </div>
                                            </div>
                                        </v-row>
                                    </div>
                                </div>

                                <div class="d-flex justify-content-between blue-grey darken-4 py-2 px-5 button-form-container">

                                    <!-- Anterior -->
                                    <v-btn
                                        type="button"
                                        color="red darken-2 white--text"
                                        @click="stepCurrent = stepCurrent - 1"
                                    >
                                        Anterior
                                    </v-btn>

                                    <!-- Siguiente -->
                                    <v-btn
                                        type="button"
                                        color="red darken-2 white--text"
                                        @click="submit()"
                                    >
                                        <b-spinner small v-if="loading"></b-spinner>
                                        <span v-if="!loading">{{ setButtonText }}</span>
                                    </v-btn>

                                </div>
                               
                            </template>

                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>

        </v-card>
    </div>
</template>

<script>

// Importa objetos estáticos para el formulario
import {
    itemsPayment,
    itemsTypePayment,
    itemsTypeDocument,
    itemsTypeCourse,
    itemsCoin,
    getCountries,
    getCoursesPresenciales,
    getCoursesOnline} from '@/utilities/data-selects.js'

// Importa las reglas para cada item del form
import { rules } from '@/utilities/rules.js'

import { mapState } from 'vuex'

export default {
    data() {
        return {
            stepCurrent: 1, // Paso actual
            steps: 7, // Número total de pasos
            valid: true, // Indica si el form debe validarse
            rules,
            // Datos para cada paso
            step1: {
                itemsTypeDocument,
                documentType: 1,
                documentNumber: ''
            },
            step2: {
                name: '',
                lastName: '',
                surname: '',
                datePicker: false, // Muestro u oculta el datepicker
                birthday: '',
            },
            step3: {
                email: '',
                emailSecundary: '',
                phone: '',
                phoneSecundary: '',
                cellphone: ''
            },
            step4: {
                company: '',
                position: '',
                address: '',
                itemsCountry: getCountries(),
                city: '',
                province: '',
                country: '',
                observations: ''
            },
            step5: {
                itemsTypeCourse,
                itemsCoursesPresenciales: getCoursesPresenciales(),
                itemsCoursesOnline: getCoursesOnline(),
                typeCourse: 1,
                course: ''
            },
            step6: {
              itemsPayment,
              payment: 1,
              itemsCoin,
              coin: '',
              amount: '',
              itemsTypePayment,
              paymentType: 1,
              operationNumber: '',
              operationDate: '',
              datePicker: false,
              voucher: '',
              bank: ''
            },
            step7: {
              urlVoucher: ''
            },
        }
    },
    mounted() {
        this.$store.commit('setErrorFormMessage', '')
    },
    computed: {
        ...mapState(['loading', 'formError']),
      setSubtitle: function() {
        // Muestra un subtítulo distinto según el paso en el que se encuentre el usuario 
        let subtitle = ''

        switch (this.stepCurrent) {
            case 1:
                subtitle = 'Identificación'
                break;
            case 2:
                subtitle = 'Datos personales'
                break;
            case 3:
                subtitle = 'Datos de contacto'
                break
            case 4:
                subtitle = 'Datos de ubicación'
                break;
            case 5:
                subtitle = 'Datos de curso'
                break;
            case 6:
                subtitle = 'Datos de pago'
                break;
            case 7:
                subtitle = 'Verificación de datos'
                break;
            default:
                subtitle = 'Formulario de registro'
                break;
        }

        return subtitle
        
      },
      setButtonText: function() {
        // Muestra el texto 'Registrarme' solo si el usuario se encuentra en el paso 7
        let text = 'Siguiente'

        if(this.stepCurrent === 7) {
          text = 'Registrarme'
        }

        return text
      },
      classColumns: function() {
        // Clase para aumentar las columnas en el último paso
        let cols = 8

        if(this.stepCurrent === 7) {
          cols = 12
        }

        return `col-lg-${cols}`
      },
      setNameTypeDocument: function() {
        // Esta función devuelve un nombre para no mostrar 1, 2 ó 3 en el paso 7
        let name = ''

        if(this.step1.documentType === 1) {
            name = 'DNI'
        } else if(this.step1.documentType === 2) {
            name = 'Pasaporte'
        } else if(this.step1.documentType === 3) {
            name = 'Carnet de extranjería'
        }

        return name
      },
      setNameTypeCourse: function() {
        let name = ''
        
        if(this.step5.typeCourse === 1) {
            name = 'Virtual'
        } else if(this.step5.typeCourse === 2) {
            name = 'Presencial'
        }

        return name
      },
      setNamePayment: function() {
          let name = ''

          if(this.step6.payment === 1) {
                name = 'TOTAL'
          } else if(this.step6.payment === 2) {
            name = 'CUOTAS'
          }

          return name
      }
    },
    methods: {
      nextStep (n) {
        if (n === this.steps) {
          this.stepCurrent = 1
        } else {
          this.stepCurrent = n + 1
        }
      },
      setUrlVoucher: function() {
        // Esta función crea una URL para poder mostrar el voucher
        this.step7.urlVoucher = URL.createObjectURL(this.step6.voucher)
      },
      submit(n) {
          // Aquí verificamos los datos antes de crear el objero usuario y enviarlo a la Api
          if(this.stepCurrent === 1 && this.$refs.form1[0].validate()) {
            this.nextStep(n)
            // Vacía array de errores (Importante o dará error)
            this.$refs.form2[0].resetValidation()
          } else if(this.stepCurrent === 2 && this.$refs.form2[0].validate()) {
            // Si el usuario se encuentra en el paso 2 y el paso 2 está validado
            this.nextStep(n)
          } else if(this.stepCurrent === 3 && this.$refs.form3[0].validate()) {
                this.nextStep(n)
          } else if(this.stepCurrent === 4 && this.$refs.form4[0].validate()) {
                this.nextStep(n)
          } else if(this.stepCurrent === 5 && this.$refs.form5[0].validate()) {
                this.nextStep(n)
          } else if(this.stepCurrent === 6 && this.$refs.form6[0].validate()) {
              this.nextStep(n)
          } else if(this.stepCurrent === 7) {
              // Registramos al usuario
              this.registerUser()
          }

      },
        registerUser() {
            // Creamos un nuevo usuario con los campos que necesita el backend y le asignamos el valor de cada step en la instancia
            let user = {}

            // Paso 1
            user.documentType = this.step1.documentType

            // Pasamos los valores a Integer porque en la instancia es String
            user.documentNumber = parseInt(this.step1.documentNumber)

            // Paso 2
            user.name = this.step2.name
            user.lastName = this.step2.lastName
            user.surname = this.step2.surname
            user.birthday = this.step2.birthday

            // Paso 3
            user.email = this.step3.email.toLowerCase()
            user.emailSecundary = this.step3.emailSecundary.toLowerCase()

            // Pasamos los valores a Integer porque en la instancia es String
            user.phone = parseInt(this.step3.phone)
            user.phoneSecundary = parseInt(this.step3.phoneSecundary)
            user.cellphone = parseInt(this.step3.cellphone)

            // Paso 4
            user.company = this.step4.company
            user.position = this.step4.position
            user.address = this.step4.address
            user.city = this.step4.city
            user.province = this.step4.province
            user.country = this.step4.country
            user.observation = this.step4.observations

            // Paso 5
            user.typeCourse = this.step5.typeCourse
            user.course = this.step5.course

            // Paso 6
            user.payment = this.step6.payment
            user.coin = this.step6.coin
            user.amount = this.step6.amount
            user.paymentType = this.step6.paymentType
            user.operationNumber = parseInt(this.step6.operationNumber)
            user.operationDate = this.step6.operationDate
            user.voucher = this.step6.voucher
            user.bank = this.step6.bank

            // Creamos FormData para que la Api pueda recibir los datos
            let formData = new FormData()

            // Convierte el objeto user en un formData
            Object.keys(user).forEach(key => formData.append(key, user[key]));

            if(this.step6.voucher) {
                // files
                formData.append("voucher", this.step6.voucher, this.step6.voucher.name);
            }

            // Vuex - Aquí es donde hará el registro a la Api
            this.$store.dispatch('register', formData)
      }
    },
}
</script>

<style lang="scss">
input[type=date] {
  text-align: right;
}

input[type="date"]:before {
  color: rgb(32, 32, 32);
  content: attr(placeholder) !important;
  margin-right: 0.3em;
  font-size: .9em;
}

.v-application {
    font-family: inherit !important;

    .form-title {
        font-size: 2em;
        font-weight: 700;
    }

    .subtitle {
        font-size: 1.3rem;
    }
}

.v-application .v-stepper__step__step.primary {
    background-color: #D32F2F !important;
}

.button-form-container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
}

@media screen and (max-width: 320px) {
    .v-stepper__step {
        padding: 0 !important;
    }
}

.error-link {
    &:hover {
        text-decoration: underline !important;
    }
}

.icon-pen {
    transition: color .5s;

    &:hover {
        color: rgb(30, 32, 32);
        cursor: pointer;
    }
}
</style>