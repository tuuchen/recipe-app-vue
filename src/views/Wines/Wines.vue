<template>
  <div>
    <div class="main">
      <h1>..Nothing here :(</h1>
      <br />
      <transition name="fade">
        <v-btn v-show="show" large color="primary" to="/wines/wines-menu">Submenu</v-btn>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    show: false
    // tba
  }),
  mounted () {
    this.show = true
  }
}
</script>

<style scoped>
.main {
  text-align: center;
}
</style>