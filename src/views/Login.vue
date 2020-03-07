<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-5">
            <v-card outlined class="">
                <h1 class="title mt-3 text-center">Ingresa a tú cuenta</h1>

                <v-form @submit.prevent="submit()" ref="formLogin" v-model="valid" lazy-validation>
                    <!-- Email -->
                    <div class="px-3 mt-5">
                        <v-text-field
                        v-model="email"
                        :rules="rules.email"
                        label="Email principal"
                        outlined
                        ></v-text-field>
                    </div>

                    <!-- Password -->
                    <div class="px-3">
                        <v-text-field
                            :type="showPassword ? 'text' : 'password'"
                            v-model="password"
                            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="rules.password"
                            label="Contraseña"
                            outlined
                            @click:append="showPassword = !showPassword"
                        ></v-text-field>
                    </div>
                    <v-card-actions class="bg-dark d-flex justify-content-between mt-5">
                        <router-link :to="{name: 'Home'}" class="text-white">Quiero registrarme</router-link>
                        <v-btn type="submit" color="red darken-2 white--text">
                            Ingresar
                        </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </div>  
    </div>
  </div>
</template>

<script>

export default {
    data() {
        return {
            valid: true,
            rules: {
                email: [
                    v => !!v || 'Este campo es requerido',
                    v => /.+@.+/.test(v) || 'El email debe ser válido',
                ],
                password: [
                    v => !!v || 'Este campo es requerido'
                ],
            },
            email: '',
            password: '',
            showPassword: false
        }
    },
    methods: {
        submit() {
            if(this.$refs.formLogin.validate()) {
                this.$router.push({name: 'Dashboard'})
            }
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.title {
    font-size: 1.5rem;
}
</style>
