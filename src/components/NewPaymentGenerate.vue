<template>
    <b-card no-body class="mt-3 mb-1">
        <b-card-header header-tag="header" class="py-3 bg-light" role="tab">
            <a href="#" v-b-toggle.accordion-7 class="btn-link text-dark lead font-weight-bold">Nueva cuota</a>
        </b-card-header>
        <b-collapse id="accordion-7" visible accordion="my-accordion" role="tabpanel">
            <b-card-body class="text-center">
                <v-alert type="success">
                    Se ha generado una nueva cuota.
                </v-alert>
                <p>
                    <a href="" class="text-danger" @click.prevent="deleteCuote()">Eliminar cuota generada</a>
                </p>
            </b-card-body>
        </b-collapse>
    </b-card>
</template>

<script>
    export default {
        methods: {
            deleteCuote() {
                this.$emit('deleteCuote')
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>