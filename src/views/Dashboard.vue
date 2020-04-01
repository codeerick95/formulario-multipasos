<template>
    <div class="container mt-3">
        <template>
            <!-- Aquí se verifica que tipo de usuario es y según ello se muestra un componente -->
            <dashboard-admin v-if="currentUser.status && parseIntUserType === 1"></dashboard-admin>

            <dashboard-client v-if="currentUser.status && parseIntUserType === 2"></dashboard-client>
        </template>
    </div>
</template>

<script>
import { mapState } from 'vuex'

// Components
import DashboardAdmin from '@/components/DashboardAdmin'
import DashboardClient from '@/components/DashboardClient'

export default {
    components: {
        DashboardAdmin,
        DashboardClient
    },
    computed: {
        ...mapState(['currentUser']),
        parseIntUserType: function() {
            return parseInt(this.currentUser.type);
        }
    }
}
</script>