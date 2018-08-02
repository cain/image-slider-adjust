<template>
  <div id="app">
    <Nav msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Nav from './components/Nav.vue'

export default {
  name: 'app',
  components: {
    Nav
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
