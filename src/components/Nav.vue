<template>
  <div class="nav">
    <div class="nav-header">
      <h3>Brightness & Contrast Developer Test</h3>
      <p>{{ date }}</p>
    </div>
    <img class="nav-image" src="../assets/beyond-the-valley.png" />
    <a href="https://github.com/cain" target="_blank">
      <img src="../assets/me.jpeg" class="nav-header-profile" />
    </a>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  data() {
    return {
      date: new Date().toString().split(' ').splice(1,3).join(' ') // get simple date,
    }
  },
}
</script>

<style scoped lang="scss">
  $profile-width: 60px;
  .nav {
    color: #fff;
    background: $c-main-bg;
    margin: 0px;
    position: relative;
    text-align: center;
    &-header {
      padding: $m-spacing * 2;
      h3, p {
        margin: 0px;
      }
      &-profile {
        width: $profile-width;
        border-radius: 50%;
        position: absolute;
        bottom: -10px;
        left: calc(50% - #{$profile-width / 2});
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
