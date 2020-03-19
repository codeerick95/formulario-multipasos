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
                <v-chip class="mx-3 mt-1 p-3" color="primary" label>
                    <v-icon left>mdi-account-circle-outline</v-icon>
                    {{ setName }}
                </v-chip>
                
                <v-btn @click="logout()" color="red darken-2 white--text" class="text-decoration-none">Cerrar sesión</v-btn>
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
        ...mapState(['currentUser', 'token', 'nameAdmin', 'userType']),
        setName: function() {
            let name = ''

            if(this.userType === '1' || this.userType === 1) {
                name = this.nameAdmin
            } else if(this.userType === '2' || this.userType === 2) {
                name = this.currentUser.data.user.name
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