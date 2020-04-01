<template>
    <div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <v-card outlined class="p-3 text-center">
              <h1 class="mt-3 mb-5">Página no encontrada</h1>
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

<style lang="scss" scoped>

</style>