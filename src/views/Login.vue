<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-3">
        <img src="@/assets/logo.png" alt="Logo JB Enterprise Group" class="img-fluid w-75">
      </div>
    </div>
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card">
                <div class="card-body">
                    <h1 class="title mb-3">Ingresa a tú cuenta</h1>
                    <validation-observer v-slot="{ handleSubmit }">
                        <form action="" @submit.prevent="handleSubmit(submit)">
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
                            <div class="form-group mb-0">
                                <input type="submit" value="Ingresar" class="btn btn-primary" />
                            </div>
                            <div class="form-group mt-4">
                                <router-link :to="{name: 'Home'}">Quiero registrarme</router-link>
                            </div>
                        </form>
                    </validation-observer>
                </div>
            </div>
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
            email: ''
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.title {
    font-size: 1.5rem;
}
</style>
