<template>
  <div id="app">
    <Nav />
    <Image-Container />
  </div>
</template>

<script>
import Nav from './components/Nav.vue'
import ImageContainer from './components/ImageContainer.vue'

export default {
  name: 'app',
  components: {
    Nav,
    ImageContainer
  }
}
</script>

<style lang="scss">
#app {
  max-width: 375px;
  margin: auto;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
p {
  font-size: 12px;
}
h3 {
  font-size: 16px;
}
</style>
