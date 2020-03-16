<template>
    <div>
        <v-toolbar>
            <router-link :to="{name: 'Home'}">
                <logo></logo>
            </router-link>
            <v-spacer></v-spacer>
            <v-btn to="/login" color="red darken-2 white--text" class="text-decoration-none" v-if="!currentUser.status">Ingresar</v-btn>
            <v-btn @click="logout()" color="red darken-2 white--text" class="text-decoration-none" v-else>Cerrar sesión</v-btn>
        </v-toolbar>
        <!-- <div class="container-fluid bg-light">
            <div class="row justify-content-center">
                <div class="col-md-2">
                    <logo></logo>
                    <div>
                        <router-link :to="{name: 'Home'}" class="btn btn-link">Home</router-link>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
import Logo from '@/components/Logo.vue'
import { mapState } from 'vuex'

export default {
    name: 'HeaderApp',
    components: {
        Logo
    },
    computed: {
        ...mapState(['currentUser', 'token'])
    },
    methods: {
        logout() {
            this.$store.dispatch('logout').then(() => {
                this.$router.push('/login')
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>