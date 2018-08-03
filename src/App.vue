<template>
  <div id="app">
    <Nav />
    <Image-Adjust />
  </div>
</template>

<script>
import Nav from './components/Nav.vue'
import ImageAdjust from './components/ImageAdjust.vue'

export default {
  name: 'app',
  components: {
    Nav,
    ImageAdjust
  }
}
</script>

<style>
#app {
  max-width: 375px;
  margin: auto;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
