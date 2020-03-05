<template>
    <div class="container mt-3">
        <div class="row justify-content-center">
            <div class="col-md-6">

                <div class="card">
                    <div class="card-body">
                        <h2 class="title m-0">Datos de usuario {{ user.id }}</h2>
                    </div>
                </div>
                
                <form>
                    <div role="tablist">
                        <b-card no-body class="mb-1">
                            <b-card-header header-tag="header" class="py-3 bg-light" role="tab">
                                <a href="#" v-b-toggle.accordion-1 class="btn-link text-dark lead">Identificación</a>
                            </b-card-header>
                            <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">
                                <b-card-body>
                                    <div class="form-row">

                                        <!-- Select tipo de documento -->
                                        <div class="col-md-6">
                                            <div class="form-group mb-0">
                                                <ValidationProvider rules="required" v-slot="{ errors }">
                                                    <select class="custom-select" disabled v-model="step1.typeDocument" @change="changeInputDocument()">
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
                                            <div class="form-group mb-0">
                                                <!-- Campo  DNI -->
                                                <ValidationProvider rules="required|numeric|min:8" v-slot="{ errors }" v-if="step1.selectTypeDocument === 'DNI' ">
                                                    <input v-model=" step1.typeDocumentField" type="number" placeholder="DNI" disabled class="form-control">
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
                                </b-card-body>
                            </b-collapse>
                        </b-card>

                        <b-card no-body class="mb-1">
                            <b-card-header header-tag="header" class="py-3 bg-light" role="tab">
                                <a href="#" v-b-toggle.accordion-2 class="btn-link text-dark lead">Datos personales</a>
                            </b-card-header>
                            <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
                                <b-card-body>
                                    <div class="form-row">

                                        <div class="col-md-6">
                                        <div class="form-group">
                                            <ValidationProvider rules="required" v-slot="{ errors }">
                                            <input v-model="step2.name" type="text" placeholder="Nombre" disabled class="form-control">
                                            <span class="text-danger">{{ errors[0] }}</span>
                                            </ValidationProvider>
                                        </div>
                                        </div>

                                        <div class="col-md-6">
                                        <div class="form-group">
                                            <ValidationProvider rules="required" v-slot="{ errors }">
                                            <input v-model="step2.lastname1" type="text" placeholder="Apellido paterno" disabled class="form-control">
                                            <span class="text-danger">{{ errors[0] }}</span>
                                            </ValidationProvider>
                                        </div>
                                        </div>

                                    </div>

                                    <div class="form-row">

                                        <div class="col-md-6">
                                        <div class="form-group">
                                            <ValidationProvider rules="required" v-slot="{ errors }">
                                            <input v-model="step2.lastname2" type="text" placeholder="Apellido materno" disabled class="form-control">
                                            <span class="text-danger">{{ errors[0] }}</span>
                                            </ValidationProvider>
                                        </div>
                                        </div>

                                        <div class="col-md-6">
                                        <ValidationProvider rules="required" v-slot="{ errors }">
                                            <input type="date" placeholder="F. nacimiento" disabled v-model="step2.date" class="form-control" />
                                            <span class="text-danger">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                        </div>

                                    </div>
                                </b-card-body>
                            </b-collapse>
                        </b-card>

                        <b-card no-body class="mb-1">
                            <b-card-header header-tag="header" class="py-3 bg-light" role="tab">
                                <a href="#" v-b-toggle.accordion-3 class="btn-link text-dark lead">Datos de contacto</a>
                            </b-card-header>
                            <b-collapse id="accordion-3" accordion="my-accordion" role="tabpanel">
                                <b-card-body>
                                    <div class="form-row">

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <ValidationProvider rules="required|email" v-slot="{ errors }">
                                                <input v-model="step3.email" type="email" placeholder="Email principal" disabled class="form-control">
                                                <span class="text-danger">{{ errors[0] }}</span>
                                                </ValidationProvider>
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <ValidationProvider rules="required|email" v-slot="{ errors }">
                                                <input v-model="step3.secondaryEmail" type="email" placeholder="Email secundario" disabled class="form-control">
                                                <span class="text-danger">{{ errors[0] }}</span>
                                                </ValidationProvider>
                                            </div>
                                        </div>
   
                                    </div>

                                    <div class="form-row">

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <ValidationProvider rules="required|numeric|min:8" v-slot="{ errors }">
                                                <input v-model="step3.phone" type="number" placeholder="Teléfono principal" disabled class="form-control">
                                                <span class="text-danger">{{ errors[0] }}</span>
                                                </ValidationProvider>
                                            </div>
                                        </div>

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <ValidationProvider rules="required|numeric|min:8" v-slot="{ errors }">
                                                    <input v-model="step3.WorkPhone" type="number" placeholder="Teléfono principal" disabled class="form-control">
                                                    <span class="text-danger">{{ errors[0] }}</span>
                                                </ValidationProvider>
                                            </div>
                                        </div>

                                    </div>

                                    <div class="form-row">

                                        <div class="col-md-6">
                                            <div class="form-group">
                                                <ValidationProvider rules="required|numeric|min:9" v-slot="{ errors }">
                                                <input v-model="step3.mobile" type="number" placeholder="Celular" disabled class="form-control">
                                                <span class="text-danger">{{ errors[0] }}</span>
                                                </ValidationProvider>
                                            </div>
                                        </div>

                                    </div>
                                </b-card-body>
                            </b-collapse>
                        </b-card>

                        <b-card no-body class="mb-1">
                            <b-card-header header-tag="header" class="py-3 bg-light" role="tab">
                                <a href="#" v-b-toggle.accordion-4 class="btn-link text-dark lead">Datos de ubicación</a>
                            </b-card-header>
                            <b-collapse id="accordion-4" accordion="my-accordion" role="tabpanel">
                                <b-card-body>
                                    <div class="form-row">

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <ValidationProvider v-slot="{ errors }">
                                            <input v-model="step4.business" type="text" placeholder="Empresa" disabled class="form-control">
                                            <span class="text-danger">{{ errors[0] }}</span>
                                            </ValidationProvider>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <ValidationProvider v-slot="{ errors }">
                                            <input v-model="step4.position" type="text" placeholder="Cargo" disabled class="form-control">
                                            <span class="text-danger">{{ errors[0] }}</span>
                                            </ValidationProvider>
                                        </div>
                                    </div>

                                </div>

                                <div class="form-row">

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <ValidationProvider rules="required" v-slot="{ errors }">
                                            <input v-model="step4.address" type="text" placeholder="Dirección" disabled class="form-control">
                                            <span class="text-danger">{{ errors[0] }}</span>
                                            </ValidationProvider>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <ValidationProvider rules="required" v-slot="{ errors }">
                                                <select class="custom-select" v-model="step4.city" disabled>
                                                    <option value="">Ciudad</option>
                                                    <option value="Lima">Lima</option>
                                                    <option value="Arequipa">Arequipa</option>
                                                    <option value="La libertad">La libertad</option>
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
                                            <select class="custom-select" v-model="step4.province" disabled>
                                                <option value="">Estado/Provincia</option>
                                                <option value="Lima">Lima</option>
                                                <option value="Canta">Canta</option>
                                                <option value="Huaral">Huaral</option>
                                            </select>
                                            <span class="text-danger">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                    </div>

                                    <div class="col-md-6">
                                    <div class="form-group">
                                        <ValidationProvider rules="required" v-slot="{ errors }">
                                            <select class="custom-select" v-model="step4.country" disabled>
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
                                        <textarea v-model="step4.observations" class="form-control" placeholder="Observaciones" disabled></textarea>
                                        <span class="text-danger">{{ errors[0] }}</span>
                                    </ValidationProvider>
                                    </div>
                                    </div>

                                </div>

                                </b-card-body>
                            </b-collapse>

                            <!-- Submit -->
                            <div class="form-row justify-content-center">
                                <div class="col-md-6">
                                    <div class="form-group mt-3">
                                        <ValidationProvider rules="required" v-slot="{ errors }">
                                            <select class="custom-select" v-model="step1.status">
                                                <option value="">Estado</option>
                                                <option value="Pendiente">Pendiente</option>
                                                <option value="Revisando">Revisando</option>
                                                <option value="Validado">Validado</option>
                                            </select>
                                            <span class="text-danger">{{ errors[0] }}</span>
                                        </ValidationProvider>
                                    </div>
                                </div>
                            </div>

                            <div class="form-group mt-3">
                                <input type="submit" value="Guardar" class="btn btn-danger py-2 px-4">
                            </div>
                        </b-card>
                    </div>
                </form>

            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    data() {
        return {
            user: {},
            step1: {
                value: true,
                current: true,
                disabled: false,
                completed: false,
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
                disabled: true
            }
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
                }
            })
        }
    },
    mounted() {
        this.setUser()
    },
    computed: {
        ...mapState(['users'])
    }
}
</script>