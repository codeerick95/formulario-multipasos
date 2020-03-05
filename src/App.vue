<template>
  <div id="app">
    <headerApp></headerApp>
    <router-view/>
  </div>
</template>

<script>
import HeaderApp from '@/components/Header.vue'

export default {
  components: {
    HeaderApp
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Open Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
