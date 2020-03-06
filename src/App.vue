<template>
  <div>
    <header-app></header-app>
    <router-view></router-view>
  </div>
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
