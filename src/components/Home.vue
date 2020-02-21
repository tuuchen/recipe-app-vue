<template>
  <div>
    <div class="main">
      <div v-show="!isLoaded">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </div>
      <div v-show="isLoaded">
        <img alt="Vue logo" src="@/assets/logo.png" @load="onImgLoad" />
        <HelloWorld msg="Welcome to our kickass Vue.js App" />
      </div>
    </div>
    <transition name="fade">
      <v-container v-show="show">
        <v-layout row>
          <v-flex xs12 md8 offset-md2>
            <v-card text class="card--flex-toolbar" color="transparent">
              <v-container fluid grid-list-lg>
                <v-layout row wrap>
                  <v-flex xs12>
                    <h2 class="white--text">Discover</h2>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs12 sm6 md6 lg6 v-for="item in links" :key="item.id">
                    <v-hover>
                      <v-card
                        slot-scope="{ hover }"
                        :class="`elevation-${hover ? 12 : 2}`"
                        :to="item.link"
                        :disabled="item.disabled"
                        min-height="255"
                      >
                        <v-img
                          :src="item.img"
                          aspect-ratio="2.75"
                          height="125px"
                          :class="item.color"
                        ></v-img>
                        <v-card-title primary-title>
                          <div>
                            <h3 class="headline mb-0">{{item.title}}</h3>
                          </div>
                        </v-card-title>
                        <v-card-text>
                          <div>{{item.description}}</div>
                        </v-card-text>
                        <!-- <v-card-actions>
                        <v-btn text color="primary" class="learn-more-btn">Learn more</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary">Get started</v-btn>
                        </v-card-actions>-->
                      </v-card>
                    </v-hover>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Recipes from '@/assets/Recipes.jpg'
import Cocktails from '@/assets/Cocktails.jpg'
import Mystery from '@/assets/Mystery.jpg'
import Favourites from '@/assets/Favourites.jpg'
import Nutritions from '@/assets/Nutritions.jpg'
import Admin from '@/assets/Admin.jpg'


export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data () {
    return {
      show: false,
      isLoaded: false,
      links: [
        {
          id: '1',
          title: 'Recipes',
          description: 'Remember: You can eat your way out of almost any problem.',
          color: 'yellow',
          img: Recipes,
          link: '/recipes'
        },
        {
          id: '2',
          title: 'Wines',
          description: 'The best recommendations.',
          color: 'blue',
          img: Cocktails,
          link: '/wines'
        },
        {
          id: '3',
          title: 'Trivia',
          description: 'Check out every little detail about what you eat.',
          color: 'blue',
          img: Nutritions,
          link: '/trivia'
        },
        {
          id: '4',
          title: 'Favourites',
          description: 'All your best moments stored here.',
          color: 'red',
          img: Favourites,
          link: '/favourites'
        },
        {
          id: '5',
          title: 'Admin panel',
          description: 'Only for the brave. And the one with password.',
          color: 'orange',
          img: Admin,
          link: '/admin'
        },
        {
          id: '6',
          title: 'Some new feature?',
          description: 'The world, even the smallest parts of it, is filled with things you don\'t know.',
          color: 'teal',
          disabled: true,
          img: Mystery
        }
      ]
    }
  },
  methods: {
    onImgLoad () {
      this.isLoaded = true
    }
  },
  mounted () {
    this.show = true
  }
}
</script>
<style scoped>
.main {
  text-align: center;
}
.outine-2 {
  border: 2px solid white;
}
.learn-more-btn {
  text-transform: initial;
  text-decoration: underline;
}
</style>
