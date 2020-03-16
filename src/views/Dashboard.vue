<template>
    <div class="container mt-3">
        <div class="row" v-if="currentUser.data.type === 1">
            <div class="col-md-12">

                <div class="card py-1">
                    <div class="card-body">
                        <h2 class="title mb-5">Panel de administración</h2>

                        <!-- Formulario de filtro -->
                        <div class="form-row justify-content-center">
                            <div class="col-md-6 col-lg-4">
                                <b-form-group class="d-flex justify-content-center">
                                    <b-input-group size="sm">

                                        <b-form-input v-model="filter" size="lg" type="search" id="filterInput" placeholder="Filtrar" class="py-3"
                                        >
                                        </b-form-input>

                                        <b-input-group-append>
                                            <b-button :disabled="!filter" @click="filter = ''">Limpiar filtros</b-button>
                                        </b-input-group-append>
                                    </b-input-group>
                                </b-form-group>
                            </div>
                        </div>

                        <!-- Table -->
                        <b-table hover bordered responsive
                            show-empty
                            :items="users"
                            :fields="fields"
                            :current-page="currentPage"
                            :per-page="perPage"
                            :filter="filter"
                            :filterIncludedFields="filterOn"
                            :sort-by.sync="sortBy"
                            :sort-desc.sync="sortDesc"
                            :sort-direction="sortDirection"
                            @filtered="onFiltered"
                            >
                            <template v-slot:cell(name)="row">
                                {{ row.value }}
                            </template>

                            <template v-slot:cell(actions)="row">
                                <div class="d-flex justify-content-center align-items-center">
                                    <b-button size="sm" class="mr-1" variant="primary" @click="info(row.item)">
                                    Detalles
                                </b-button>
                                <b-button size="sm" variant="danger">
                                    Eliminar
                                </b-button>
                                </div>
                            </template>
                        </b-table>

                    </div>

                    <div class="card-footer">
                        <div class="d-flex justify-content-center justify-content-md-end">
                            <b-pagination
                            v-model="currentPage"
                            :total-rows="totalRows"
                            :per-page="perPage"
                            align="fill"
                            class="my-0"
                            ></b-pagination>
                        </div>
                    </div>

                </div>

            </div>
        </div>
        <div class="row justify-content-center" v-else>
            <div class="col-md-8">
                <h2>Ingresaste como usuario</h2>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
     mounted() {
      this.totalRows = this.users.length
    },
    data() {
        return {
            fields: [
                { key: 'name', label: 'Nombre completo', sortable: true, sortDirection: 'desc' },
                { key: 'typeDocumentField', label: 'Nro Documento', sortable: true, class: 'text-center' },
                { key: 'typeCourse', label: 'Tipo de curso', sortable: true, class: 'text-center' },
                { key: 'course', label: 'Curso', sortable: true, class: 'text-center' },
                { key: 'status', label: 'Estado', sortable: true, class: 'text-center' },
                { key: 'actions', label: 'Acciones' }
            ],
            filter: null,
            filterOn: [],
            perPage: 3,
            currentPage: 1,
            sortBy: '',
            sortDesc: false,
            sortDirection: 'asc',
            totalRows: 1
        }
    },
    methods: {
      info(value) {
        let user = value,
            id = user.id

        this.$router.push({name: 'User', params: {id}})
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }
    },
    computed: {
        ...mapState(['users', 'currentUser'])
    }
}
</script>