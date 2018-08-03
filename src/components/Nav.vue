<template>
  <div class="nav">
    <div class="nav-header">
      <h3>Brightness & Contrast Developer Test</h3>
      <p>{{date}}</p>
    </div>
      <img class="nav-image" src="../assets/beyond-the-valley.png" />
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      date: new Date().toString().split(' ').splice(1,3).join(' ') // get simple date,
    }
  },
  props: {
    msg: String
  }
}
</script>

<style scoped lang="scss">
  .nav {
    color: #fff;
    background: $c-main-bg;
    margin: 0px;
    &-header {
      padding: $m-spacing * 2;
      h3, p {
        margin: 0px;
      }
    }
    &-image {
      display: block;
      width: 100%;
      margin: 0px;
    }
  }
</style>
