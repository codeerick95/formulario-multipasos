<template>
<div>
    <!-- Validado -->
    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
        <span v-on="on" class="circle-info bg-warning" v-if="validate === '0'"></span>
        </template>
        <span>Verificando datos</span>
    </v-tooltip>

    <!-- Validado -->
    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
        <span v-on="on" class="circle-info bg-success" v-if="validate === '1'"></span>
        </template>
        <span>Validado</span>
    </v-tooltip>

    <!-- Validado -->
    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
        <span v-on="on" class="circle-info bg-danger" v-if="validate === '2'"></span>
        </template>
        <span>Corregir</span>
    </v-tooltip>

    <!-- Validado -->
    <v-tooltip bottom>
        <template v-slot:activator="{ on }">
        <span v-on="on" class="circle-info bg-info" v-if="validate === '4'"></span>
        </template>
        <span>Pendiente</span>
    </v-tooltip>
</div>
</template>

<script>
export default {
    props: ['dataToValidate'],
    data() {
        return {
            validate: this.dataToValidate
        }
    }
}
</script>

<style lang="scss" scoped>

</style>