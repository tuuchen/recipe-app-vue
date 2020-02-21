<template>
  <div>
    <transition name="fade">
      <div v-show="show" class="main">
        <h2>If you drink too much alcohol you are an alcoholic. If you drink too much Fanta, does that make you Fantastic?</h2>
      </div>
    </transition>
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
  margin: 0 auto;
}
</style>