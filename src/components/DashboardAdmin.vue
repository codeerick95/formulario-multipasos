<template>
<div>
  <!-- Alertas -->
  <div class="row justify-content-center text-center">
      <div class="col-md-6">
          <v-alert color="red" type="info" outlined dismissible v-if="formError">
              Error con tu red de internet, <a @click.prevent="getUsers()" class="link-retry">inténtalo nuevamente.</a>
          </v-alert>
      </div>
  </div>
  <loader v-if="loading"></loader>
  <div class="row" v-else>
    <div class="col-md-12">
      <div class="card py-1">
        <div class="card-body">
          <h2 class="form-title mb-5">Panel de administración</h2>
          <p class="font-weight-bold">Bienvenido {{ currentUser.data.name ? currentUser.data.name : headerName}}</p>

          <!-- Formulario de filtro -->
          <div class="form-row justify-content-center">
            <div class="col-md-6">
              <b-form-group class="d-flex justify-content-center py-5">
                <b-input-group size="sm" class="py-5">
                  <b-form-input
                    v-model="filter"
                    size="lg"
                    type="search"
                    id="filterInput"
                    autocomplete="off"
                    placeholder="Presione ENTER para buscar"
                    class="py-5"
                    :debounce="setDebounceTime"
                    @keypress.enter="filterActive()"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button variant="primary">Buscar</b-button>
                    <b-button :disabled="!filter" @click="filterOff()">Limpiar</b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </div>
          </div>

          <!-- Table -->
          <b-table
            hover
            bordered
            responsive
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
            empty-text="No se encontraron usuarios registrados."
            empty-filtered-text="No hay registros que coincidan con su solicitud."
          >
            <template v-slot:cell(name)="row">{{ row.value }}</template>

            <template v-slot:cell(actions)="row">
              <div class="d-flex justify-content-center align-items-center">
                <b-button size="sm" class="mr-1" variant="primary" @click="info(row.item)">Detalles</b-button>
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
</div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

// Components
import Loader from '@/components/Loader'

export default {
  data() {
    return {
      fields: [
        {
          key: "fullName",
          label: "Nombre completo",
          sortable: true,
          sortDirection: "desc"
        },
        {
          key: "document_number",
          label: "Nro Documento",
          sortable: true,
          class: "text-center"
        },
        {
          key: "course_type",
          label: "Tipo de curso",
          sortable: true,
          class: "text-center"
        },
        {
          key: "course_name",
          label: "Curso",
          sortable: true,
          class: "text-center"
        },
        {
          key: "state",
          label: "Estado",
          sortable: true,
          class: "text-center" 
        },
        { 
          key: "actions",
          label: "Acciones"
        }
      ],
      filter: null,
      filterOn: [],
      perPage: 10,
      currentPage: 1,
      sortBy: "state",
      sortDesc: true,
      sortDirection: "asc",
      totalRows: 1,
      filterButton: true
    };
  },
  mounted() {
    // Hace el pedido cuando el usuario inicia sesión
    this.getUsers()

    // Asignamos número de filas
    this.setRows()
  },
  components: {
    Loader
  },
  methods: {
    info(item) {
      let userId = item.iduser;

      this.$router.push({ name: "User", params: { id: userId } });
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    filterActive() {
      this.debounceTime = 0
    },
    filterOff() {
      this.debounceTime = 100000000
      this.filter = null
    },
    setUserFullName() {
      this.users.forEach(user => {
        user.fullName = `${user.name} ${user.last_name} ${user.surname}`;
      });
    },
    setTypeCourseName() {
      this.users.forEach(user => {
        if(user.course_type === 1) {
          user.course_type = 'Virtual'
        } else if(user.course_type === 2) {
          user.course_type = 'Presencial'
        }
        
      });
    },
    setStateName() {
      this.users.forEach(user => {
        if(user.state === 0) {
          user.state = 'Registrado'
        } else if(user.state === 1) {
          user.state = 'Aprobado'
        } else if(user.state === 2) {
          user.state = 'Datos por corregir'
        } else if(user.state === 3 || user.state === 4) {
          user.state = 'Validación pendiente'
        }
      });
    },
    getUsers() {
       // Limpiamos el error anterior
      this.$store.commit('setErrorFormMessage', '')

      if (this.parseIntUserType === 1) {
        // Mostrar cargando
        this.$store.commit("setLoading", true);

        const options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`
          },
          url: "http://174.138.39.59/form-api/api/v1/users"
        };

        // Petición
        axios(options)
          .then(res => {
            this.$store.state.users = res.data.message;

            // Concatena el nombre con cada uno de los apellidos
            this.setUserFullName()

            // Agrega un nombre para el tipo de curso, para que no se muestre como 1 ó 2
            this.setTypeCourseName()

            // Agrega un nombre para el estado, para que no se muestre como 1 ó 2
            this.setStateName()

            // Asignamos número de filas
            this.setRows()

            // Ocultar cargando
            this.$store.commit("setLoading", false);
          })
          .catch((error) => {
            this.$store.commit("setLoading", false);

            // Si el usuario no tiene permiso para ver una vista se cerrará su sesión
            if(error.message === 'Request failed with status code 401') {
              this.$store.dispatch('logout')
            }

            if(error.message === 'Network Error') {
              let errorMessage = 'Error con tu red de internet, inténtalo nuevamente.'

              // Envía el mensaje de error
              this.$store.commit('setErrorFormMessage', errorMessage)
            }
          });
      }
    },
    setRows() {
      this.totalRows = this.users.length;
    }
  },
  computed: {
    ...mapState(["users", "currentUser", "loading", "headerName", 'formError']),
    parseIntUserType: function() {
      return parseInt(this.currentUser.type);
    },
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    },
    setDebounceTime: function() {
      let time = 0
      if(this.filter === '' || this.filter === null) {
        time = 100000000
      }
      return time
    }
  }
};
</script>

<style lang="scss">
.link-retry {
  color: rgba(#F44336, .9) !important;

  &:hover {
    text-decoration: underline !important;
  }
}
</style>