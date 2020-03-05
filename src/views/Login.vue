<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-4">
            <validation-observer v-slot="{ handleSubmit }">
                <form action="" @submit.prevent="handleSubmit(submit)">

                    <div class="card">
                        <h1 class="title mt-3">Ingresa a tú cuenta</h1>
                        <div class="card-body">
                            <div class="form-group">
                                <ValidationProvider rules="required|email" v-slot="{ errors }">
                                    <input v-model="email" type="email" placeholder="Email" class="form-control">
                                    <span class="text-danger">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>
                            <div class="form-group">
                                <ValidationProvider rules="required" v-slot="{ errors }">
                                    <input v-model="password" type="password" placeholder="Contraseña" class="form-control">
                                    <span class="text-danger">{{ errors[0] }}</span>
                                </ValidationProvider>
                            </div>
                        </div>

                        <div class="card-footer d-flex justify-content-between align-items-center bg-dark">
                            <router-link :to="{name: 'Home'}" class="text-white">Quiero registrarme</router-link>
                            <input type="submit" value="Ingresar" class="btn btn-danger" />
                        </div>
                    </div>

                </form>
            </validation-observer>
        </div>  
    </div>
  </div>
</template>

<script>
import { ValidationObserver } from 'vee-validate';

export default {
    components: {
        ValidationObserver
    },
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        submit() {
            this.$router.push({name: 'Dashboard'})
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
