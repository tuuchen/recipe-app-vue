<template>
  <div>
    <v-container>
      <search class="hide-on-mobile" />
    </v-container>
    <transition name="fade">
      <router-view v-show="show" />
    </transition>
  </div>
</template>

<script>
import search from '@/components/RecipeSearch.vue'
export default {
  name: 'Recipes',
  components: {
    search
  },
  data: () => ({
    show: false,
  }),
  mounted () {
    this.show = true
  }
}
</script>

<style scoped>
</style>