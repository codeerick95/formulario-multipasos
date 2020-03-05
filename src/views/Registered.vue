<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <h1 class="mt-5">Gracias por registrarte</h1>
            <p class="lead">Validaremos tus datos y te enviaremos tus credenciales de acceso al email que registraste.</p>
            <router-link :to="{name: 'Home'}" class="btn btn-danger mt-3 py-md-2 px-md-5">Regresar</router-link>
            <router-link :to="{name: 'Dashboard'}" class="btn btn-primary mt-3 ml-md-3 py-md-2 px-md-5">Ver usuarios</router-link>
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
