<template>
    <div>
        <v-toolbar>
            <router-link :to="{name: 'Home'}">
                <logo></logo>
            </router-link>
            <v-spacer></v-spacer>

            <v-btn to="/login" color="red darken-2 white--text" class="text-decoration-none" v-if="!currentUser.status">Ingresar</v-btn>

            <template v-else>
                <!-- Nombre de usuario -->
                <v-chip class="mx-1 p-3" color="primary" label>
                    <v-icon left>mdi-account-circle-outline</v-icon>
                    {{ headerName }}
                </v-chip>

                <v-chip class="p-3" color="red darken-2 white--text" label @click="logout()">
                    <v-icon center>mdi-location-exit</v-icon>
                </v-chip>
            </template>
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
        ...mapState(['currentUser', 'token', 'headerName']),
        setName: function() {
            let name = '',
                userType = parseInt(this.currentUser.type)

            if(userType === 1) {
                name = this.headerName
            } else if(userType === 2) {
                name = this.currentUser.data.name
            }

            return name
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('logout')
        }
    }
}
</script>

<style lang="scss" scoped>

</style>