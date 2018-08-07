<template>
  <div class="nav">
    <div class="nav-header">
      <h3>Brightness & Contrast Developer Test</h3>
      <p>{{ date }}</p>
    </div>
    <img class="nav-image" src="../assets/beyond-the-valley.png" />
    <img src="../assets/me.jpeg" class="nav-header-profile" />
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
    position: relative;
    &-header {
      padding: $m-spacing * 2;
      h3, p {
        margin: 0px;
      }
      &-profile {
        width: 60px;
        border-radius: 50%;
        position: absolute;
        bottom: -10px;
        left: calc(50% - 30px);
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
      }
    }
    &-image {
      display: block;
      width: 100%;
      margin: 0px;
    }
  }
</style>
