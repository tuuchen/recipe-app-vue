<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" dense router>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list v-if="isAdmin">
        <v-list-item
          v-for="(item, index) in adminItems"
          dense
          :key="index"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider />
      <v-list>
        <v-list-item dense @click.stop="miniVariant = !miniVariant">
          <v-list-item-action>
            <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
          </v-list-item-action>
          <v-list-item-content></v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed dense collapse-on-scroll app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="$route.name" />
      <v-spacer />
      <v-btn
        v-if="this.$route.path != '/' && this.$route.path != '/admin'"
        class="mx-2 hide-on-desktop"
        small
        @click.stop="rightDrawer = !rightDrawer"
        fab
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <breadcrumbs />
        <router-view />
      </v-container>
    </v-content>
    <v-navigation-drawer id="drawer" v-model="rightDrawer" :right="right" temporary fixed>
      <v-container>
        <hello v-if="Recipes" />
        <p class="max-2" v-else>To be done later!</p>
      </v-container>
    </v-navigation-drawer>
  </v-app>
</template>
<script>
import Breadcrumbs from '@/components/Breadcrumbs'
import hello from '@/components/RecipeSearch.vue'

export default {
  name: 'App',
  components: {
    Breadcrumbs,
    hello
  },
  data () {
    return {
      windowWidth: 0,
      windowHeight: 0,
      right: true,
      rightDrawer: false,
      isLogged: true,
      isAdmin: true,
      clipped: false,
      drawer: null,
      fixed: false,
      miniVariant: false,
      title: 'Search',
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/'
        },
        {
          icon: 'mdi-pizza',
          title: 'Recipes',
          to: '/recipes'
        },
        {
          icon: 'mdi-glass-cocktail',
          title: 'Wines',
          to: '/wines'
        },
        {
          icon: 'mdi-chat-processing-outline',
          title: 'Food trivia',
          to: '/trivia'
        },
        {
          icon: 'mdi-heart-outline',
          title: 'Favourites',
          to: '/favourites'
        }
      ],
      adminItems: [
        {
          icon: 'mdi-chart-bubble',
          title: 'Admin panel',
          to: '/admin'
        }
      ],
    }
  },
  mounted () {
    this.$nextTick(function () {
      window.addEventListener('resize', this.getWindowWidth);
      this.getWindowWidth()
    })
  },
  methods: {
    getWindowWidth () {
      if (document.documentElement.clientWidth > 600) {
        this.rightDrawer = false
      }
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.getWindowWidth);
  },
  computed: {
    Recipes () {
      if (this.$route.matched.some(({ path }) => path === '/recipes'))
        return true
      else return false
    }
  }
}
</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* color: #2c3e50; */
  color: white;
  background-color: rgb(25, 25, 25);
}
#drawer {
  width: 20rem !important;
}

.fade-enter-active,
.fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}
.fade-enter-active {
  transition-delay: 0.25s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
@media only screen and (min-width: 600px) {
  .hide-on-desktop {
    display: none;
  }
}
@media only screen and (max-width: 600px) {
  .hide-on-mobile {
    display: none;
  }
}
</style>
