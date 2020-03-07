<template>
  <v-app>
    <header-app></header-app>
    <router-view></router-view>
  </v-app>
</template>

<script>
import HeaderApp from '@/components/Header.vue'

export default {
  name: 'App',
  data: () => ({
    //
  }),
  components: {
    HeaderApp
  }
};
</script>
