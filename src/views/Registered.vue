<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <v-card outlined class="p-3 text-center">
              <h1 class="mt-3">Gracias por registrarte</h1>
              <p class="lead">Validaremos tus datos y te enviaremos tus credenciales de acceso al email que registraste.</p>
              <v-btn
                  :to="{name: 'Home'}"
                  color="red darken-2 white--text"
                  class="mr-3"
              >
                  Regresar
              </v-btn>
            </v-card>
        </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
