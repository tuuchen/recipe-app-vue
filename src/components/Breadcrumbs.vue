<template>
  <div class="container">
    <div class="breadcrumb-class">
      <ul>
        <li
          v-for="(breadcrumb, i) in breadcrumbs"
          :key="i"
          @click="routeTo(i)"
          :class="{'linked': !!breadcrumb.link}"
        >{{ breadcrumb.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  data () {
    return {
      breadcrumbs: []
    }
  },
  mounted () { this.updateList() },
  watch: { '$route' () { this.updateList() } },
  methods: {
    routeTo (route) {
      if (this.breadcrumbs[route].link) this.$router.push(this.breadcrumbs[route].link)
    },
    updateList () { this.breadcrumbs = this.$route.meta.breadcrumb }
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Nunito&display=swap");
.container {
  margin-bottom: 2rem;
}
.breadcrumb-class {
  float: left;
  font-family: "Nunito", sans-serif;
}
ul {
  display: flex;
  justify-content: center;
  list-style-type: none;
  margin: 0;
  padding: 0;
}
ul > li {
  display: flex;
  float: left;
  height: 10px;
  width: auto;
  color: gray;
  font-weight: bold;
  font-size: 0.8em;
  cursor: default;
  align-items: center;
}
ul > li:not(:last-child)::after {
  content: "/";
  float: right;
  font-size: 0.8em;
  margin: 0 0.5em;
  cursor: default;
  color: gray;
}
.linked {
  cursor: pointer;
  font-size: 1em;
  font-weight: normal;
  color: #1976d2;
}
</style>