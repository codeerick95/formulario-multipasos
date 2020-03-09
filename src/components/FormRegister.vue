<template>
    <div :class="classColumns">
        <v-card class="mt-5">

            <h2 class="form-title text-center pt-3">Registro de usuarios</h2>
            <h2 class="subtitle text-center font-weight-regular mt-5">{{ setSubtitle }}</h2>

                <v-stepper
                v-model="e1"
                class="pb-0"
                >
                    <v-stepper-header>
                        <template v-for="n in steps">
                            <v-stepper-step
                                :key="`${n}-step`"
                                :complete="e1 > n"
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
                                                v-model="step1.typeDocument"
                                                :rules="rules.requireRule"
                                                @change="changeInputDocument()"
                                                ref="selectTypeDocument"
                                                >
                                            </v-select>
                                        </div>

                                        <!-- Campo tipo de documento -->
                                        <div class="col-md-6 py-0">
                                            <!-- Campo  DNI -->
                                            <v-text-field
                                            type="number"
                                            v-model="step1.typeDocumentField"
                                            :rules="rules.typeDocumentFieldDni"
                                            label="DNI"
                                            required
                                            outlined
                                            v-if="step1.selectTypeDocument === 'DNI' "
                                            ></v-text-field>

                                            <!-- Campo Pasaporte -->
                                            <v-text-field
                                            type="number"
                                            v-model="step1.typeDocumentField"
                                            :rules="rules.typeDocumentFieldPasaport"
                                            label="Pasaporte"
                                            required
                                            outlined
                                            v-if="step1.selectTypeDocument === 'PT' "
                                            ></v-text-field>

                                            <!-- Campo  CE -->
                                            <v-text-field
                                            type="number"
                                            v-model="step1.typeDocumentField"
                                            :rules="rules.typeDocumentFieldCe"
                                            label="Carnet de extranjería"
                                            required
                                            outlined
                                            v-if="step1.selectTypeDocument === 'CE' "
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
                                                v-model="step2.lastname1"
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
                                                v-model="step2.lastname2"
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
                                                        v-model="step2.date"
                                                        :rules="rules.requireRule"
                                                        label="Fecha de nacimiento"
                                                        required
                                                        outlined
                                                        v-on="on"
                                                    ></v-text-field>
                                                </template>
                                                <v-date-picker v-model="step2.date" @input="step2.datePicker = false"></v-date-picker>
                                            </v-menu>
                                        </div>

                                    </div>

                                    <!-- Botones anterior y siguiente -->
                                    <div class="form-row justify-content-between blue-grey darken-4 py-2 px-5 button-form-container">

                                        <!-- Anterior -->
                                        <v-btn
                                            type="button"
                                            color="red darken-2 white--text"
                                            @click="e1 = e1 - 1"
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
                                                v-model="step3.secondaryEmail"
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
                                                v-model="step3.WorkPhone"
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
                                                v-model="step3.mobile"
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
                                            @click="e1 = e1 - 1"
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
                                            v-model="step4.business"
                                            label="Empresa"
                                            required
                                            outlined
                                        ></v-text-field>
                                    </div>

                                    <div class="col-md-6 py-0">
                                        <v-text-field
                                                v-model="step4.position"
                                                label="Cargo"
                                                required
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
                                            :rules="rules.requireRule"
                                        ></v-textarea>
                                    </div>

                                </div>
                                    

                                    <!-- Botones anterior y siguiente -->
                                    <div class="d-flex justify-content-between blue-grey darken-4 py-2 px-5 button-form-container">

                                        <!-- Anterior -->
                                        <v-btn
                                            type="button"
                                            color="red darken-2 white--text"
                                            @click="e1 = e1 - 1"
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
                                                :items="step5.itemsCoursesPresenciales"
                                                label="Curso"
                                                outlined
                                                :rules="rules.requireRule"
                                                v-model="step5.course"
                                                v-if="step5.typeCourse === 'Presencial'"
                                                >
                                            </v-select>
                                            <v-select
                                                :items="step5.itemsCoursesOnline"
                                                label="Curso"
                                                outlined
                                                :rules="rules.requireRule"
                                                v-model="step5.course"
                                                v-if="step5.typeCourse === 'Virtual'"
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
                                            @click="e1 = e1 - 1"
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
                                          :items="step6.itemsCurrency"
                                          label="Moneda"
                                          outlined
                                          v-model="step6.currency"
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
                                          v-model="step6.typePayment"
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
                                            v-model="step6.nroOperation"
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
                                                    v-model="step6.datePayment"
                                                    :rules="rules.requireRule"
                                                    label="Fecha de operación"
                                                    required
                                                    outlined
                                                    v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker v-model="step6.datePayment" @input="step6.datePicker = false"></v-date-picker>
                                        </v-menu>
                                    </div>
                                  </v-row>

                                  <v-row class="mb-5 pb-5">
                                    <div class="col-md-6">
                                      <v-file-input v-model="step6.voucher" :rules="rules.requireRule" required outlined label="Subir voucher"></v-file-input>
                                    </div>
                                    <!-- Solo se mostrará si selecciona transferencia -->
                                    <div class="col-md-6" v-if="step6.typePayment === 'transferencia'">
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
                                            @click="e1 = e1 - 1"
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
                                        <h3 class="font-weight-bold lead">Datos de identificación:</h3>
                                        <div class="row">
                                            <div class="col-md-6">
                                                <p>
                                                    <span class="text-muted mr-3">Tipo de documento:</span>
                                                    <span>{{ step1.typeDocument }}</span>
                                                </p>
                                            </div>

                                            <div class="col-md-6">
                                                <p>
                                                    <span class="text-muted mr-3">Número de documento:</span>
                                                    <span>{{ step1.typeDocumentField }}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Datos personales -->
                                <div class="row justify-content-center mt-5">
                                    <div class="col-md-10 mb-5">

                                        <h3 class="font-weight-bold lead mb-3">Datos personales:</h3>
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
                                                    <span>{{ step2.lastname1 }} {{ step2.lastname2 }}</span>
                                                </p>
                                            </div>

                                            <div class="col-md-4">
                                                <p>
                                                    <span class="text-muted mr-1 mr-md-3">Fecha de nacimiento:</span>
                                                    <span>{{ step2.date }}</span>
                                                </p>
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>

                                <!-- Datos de contacto -->
                                <div class="row justify-content-center mt-5">
                                    <div class="col-md-10 mb-5">
                                        <h3 class="font-weight-bold lead mb-3">Datos de contacto:</h3>
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
                                                    <span>{{ step3.secondaryEmail }}</span>
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
                                                    <span>{{ step3.WorkPhone }}</span>
                                                </p>
                                            </div>

                                            <div class="col-md-4">
                                                <p>
                                                    <span class="text-muted mr-3">Celular:</span>
                                                    <span>{{ step3.mobile }}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Datos de ubicación -->
                                <div class="row justify-content-center mt-5">
                                    <div class="col-md-10 mb-5">
                                        <h3 class="font-weight-bold lead mb-3">Datos de ubicación:</h3>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <p>
                                                    <span class="text-muted mr-3">Empresa:</span>
                                                    <span>{{ step4.business }}</span>
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

                                            <div class="col-md-4">
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
                                        <h3 class="font-weight-bold lead mb-3">Datos de curso:</h3>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <p>
                                                    <span class="text-muted mr-3">Tipo de curso:</span>
                                                    <span>{{ step5.typeCourse }}</span>
                                                </p>
                                            </div>
                                            <div class="col-md-4">
                                                    <p>
                                                    <span class="text-muted mr-3">Curso:</span>
                                                    <span>{{ step5.course }}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Datos de curso -->
                                <div class="row justify-content-center mt-5">
                                    <div class="col-md-10 mb-5">
                                        <h3 class="font-weight-bold lead mb-3">Datos de pago:</h3>
                                        <v-row>
                                            <div class="col-md-4">
                                                <p>
                                                    <span class="text-muted mr-3">Pago:</span>
                                                    <span>{{ step6.payment }}</span>
                                                </p>
                                            </div>
                                            <div class="col-md-4">
                                                    <p>
                                                    <span class="text-muted mr-3">Moneda:</span>
                                                    <span>{{ step6.currency }}</span>
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
                                                    <span>{{ step6.typePayment }}</span>
                                                </p>
                                            </div>
                                        </v-row>
                                        <v-row>
                                            <div class="col-md-4">
                                                <p>
                                                    <span class="text-muted mr-3">Número de operación:</span>
                                                    <span>{{ step6.nroOperation }}</span>
                                                </p>
                                            </div>
                                            <div class="col-md-4">
                                                    <p>
                                                    <span class="text-muted mr-3">Fecha de operación:</span>
                                                    <span>{{ step6.datePayment }}</span>
                                                </p>
                                            </div>
                                        </v-row>
                                        <v-row>
                                            <div class="col-md-6">
                                                <p class="text-muted mr-3">Voucher:</p>
                                                <img :src="step6.voucher" alt="" class="img-fluid">
                                            </div>
                                        </v-row>
                                    </div>
                                </div>

                                <div class="d-flex justify-content-between blue-grey darken-4 py-2 px-5 button-form-container">

                                    <!-- Anterior -->
                                    <v-btn
                                        type="button"
                                        color="red darken-2 white--text"
                                        @click="e1 = e1 - 1"
                                    >
                                        Anterior
                                    </v-btn>

                                    <!-- Siguiente -->
                                    <v-btn
                                        type="button"
                                        color="red darken-2 white--text"
                                        @click="submit()"
                                    >
                                        {{ setButtonText }}
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
import { itemsTypePayment } from '@/utilities/data-selects.js'
import { rules } from '@/utilities/rules.js'

import countries from '@/assets/countries.json'
import coursesPresenciales from '@/assets/courses.json'
import coursesOnline from '@/assets/courses-online.json'

export default {
    data() {
        return {
            e1: 1,
            steps: 7,
            valid: true,
            rules,
            step1: {
                value: true,
                current: true,
                disabled: false,
                completed: false,
                id: 6,
                itemsTypeDocument: [{value: null, text: 'Tipo de documento'}, {value: 'DNI', text: 'DNI'}, {value: 'PASAPORTE', text: 'PASAPORTE'}, {value: 'CE', text: 'C.E.'}],
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
                datePicker: false,
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
                itemsCountry: this.getCountries(),
                city: '',
                province: '',
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
                typeCourse: 'Presencial',
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
            step7: {
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
        // Muestra un subtítulo distinto según el paso en el que se encuentre el usuario 
        let subtitle = ''

        if(this.e1 === 1) {
          subtitle = 'Identificación'
        } else if(this.e1 === 2) {
          subtitle = 'Datos personales'
        } else if(this.e1 === 3) {
          subtitle = 'Datos de contacto'
        } else if(this.e1 === 4) {
          subtitle = 'Datos de ubicación'
        } else if(this.e1 === 5) {
          subtitle = 'Datos de curso'
        } else if(this.e1 === 6) {
          subtitle = 'Datos de pago'
        } else if(this.e1 === 7) {
          subtitle = 'Verificación de datos'
        }
        return subtitle
      },
      setButtonText: function() {
        // Muestra el texto 'Registrarme' solo si el usuario se encuentra en el paso 7
        let text = 'Siguiente'

        if(this.e1 === 7) {
          text = 'Registrarme'
        }

        return text
      },
      classColumns: function() {
        // Clase para aumentar las columnas en el último paso
        let cols = 8

        if(this.e1 === 7) {
          cols = 12
        }

        return `col-lg-${cols}`
      }
    },
    methods: {
        nextStep (n) {
        if (n === this.steps) {
          this.e1 = 1
        } else {
          this.e1 = n + 1
        }
      },
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
      getCountries() {
        let newCountries = []

        countries.forEach(country => {

          // Agregamos nuevos valores para que sean reconocidos por el v-select
          country.value = country.nombre
          country.text = country.nombre

          newCountries.push(country)
        })

        return newCountries
      },
      getCoursesPresenciales() {
        let newCourses = []

        coursesPresenciales.forEach(course => {

            // Agregamos nuevos valores para que sean reconocidos por el v-select
            course.value = course.descripcion
            course.text = course.descripcion

            newCourses.push(course)
        })
        return newCourses
      },
      getCoursesOnline() {
        let newCourses = []

        coursesOnline.forEach(course => {

            // Agregamos nuevos valores para que sean reconocidos por el v-select
            course.value = course.descripcion
            course.text = course.descripcion

            newCourses.push(course)
        })
        return newCourses
      },
      submit(n) {
          if(this.e1 === 1 && this.$refs.form1[0].validate()) {
                this.nextStep(n)
                // Vacía array de errores
                this.$refs.form2[0].resetValidation()
          } else if(this.e1 === 2 && this.$refs.form2[0].validate()) {
                this.nextStep(n)
          } else if(this.e1 === 3 && this.$refs.form3[0].validate()) {
                this.nextStep(n)
          } else if(this.e1 === 4 && this.$refs.form4[0].validate()) {
                this.nextStep(n)
          } else if(this.e1 === 5 && this.$refs.form5[0].validate()) {
                this.nextStep(n)
          } else if(this.e1 === 6 && this.$refs.form6[0].validate()) {
              this.nextStep(n)
          } else if(this.e1 === 7) {
              // Registramos al usuario
              this.registerUser()
          }
      },
        registerUser() {
            let user = {}

            // Id ficticio
            this.step1.id = this.step1.id + 1

            // Paso 1
            user.id = this.step1.id
            user.typeDocument = this.step1.typeDocument
            user.typeDocumentField = this.step1.typeDocumentField
            user.status = 'Pendiente'

            // Paso 2
            user.name = this.step2.name
            user.lastname1 = this.step2.lastname1
            user.lastname2 = this.step2.lastname2
            user.date = this.step2.date

            // Paso 3
            user.email = this.step3.email
            user.secondaryEmail = this.step3.secondaryEmail
            user.phone = this.step3.phone
            user.WorkPhone = this.step3.WorkPhone
            user.mobile = this.step3.mobile

            // Paso 4
            user.business = this.step4.business
            user.position = this.step4.position
            user.address = this.step4.address
            user.city = this.step4.city
            user.province = this.step4.province
            user.country = this.step4.country
            user.observations = this.step4.observations

            // Paso 5
            user.typeCourse = this.step5.typeCourse
            user.course = this.step5.course

            // Paso 6
            user.payment = this.step6.payment
            user.currency = this.step6.currency
            user.amount = this.step6.amount
            user.typePayment = this.step6.typePayment
            user.nroOperation = this.step6.nroOperation
            user.datePayment = this.step6.datePayment
            user.voucher = this.step6.voucher
            user.bank = this.step6.bank

            // Vuex
            this.$store.commit('createUser', user)

            // Redirigimos al usuario
            this.$router.push({name: 'Registered'})
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
</style>