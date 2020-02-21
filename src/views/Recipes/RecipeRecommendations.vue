<template>
  <div>
    <div style="text-align: center; margin-bottom: -3rem;">Random recipe</div>
    <v-carousel height="400" hide-delimiters cycle interval="5000" show-arrows-on-hover>
      <v-carousel-item v-for="item in links" :key="item.id">
        <v-row class="fill-height" align="center" justify="center">
          <v-flex xs11 sm8 md6 lg5 xl4>
            <v-flex>
              <h2 class="white--text">Placeholder</h2>
            </v-flex>
            <v-hover>
              <v-card
                slot-scope="{ hover }"
                :class="`elevation-${hover ? 12 : 2}`"
                :to="item.link"
                :disabled="item.disabled"
                min-height="255"
              >
                <v-img :src="item.img" aspect-ratio="2.75" height="125px" :class="item.color"></v-img>
                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">{{item.title}}</h3>
                  </div>
                </v-card-title>
                <v-card-text>
                  <div>{{item.description}}</div>
                </v-card-text>
                <v-card-actions>
                  <v-btn text color="primary" class="learn-more-btn">Learn more</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary">Get started</v-btn>
                </v-card-actions>
              </v-card>
            </v-hover>
          </v-flex>
        </v-row>
      </v-carousel-item>
    </v-carousel>
    <p style="text-align: center;">Some content here..</p>
    <div class="simple-view">
      <p>Links:</p>
      <v-layout row wrap>
        <v-flex v-for="(item, index) in btns" :key="index">
          <v-btn small class="search" to="/recipes/results">{{item.text}}</v-btn>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecipeRecommendations',
  data () {
    return {
      isLoaded: false,
      links: [
        { id: '1', title: 'Recipe #1', color: 'teal', link: '/recipes/details' },
        { id: '2', title: 'Recipe #2', color: 'yellow', link: '/recipes/details' },
        { id: '3', title: 'Recipe #3', color: 'blue', link: '/recipes/details' },
        { id: '4', title: 'Recipe #4', color: 'red', link: '/recipes/details' },
        { id: '5', title: 'Recipe #5', color: 'teal', link: '/recipes/details' },
        { id: '6', title: 'Recipe #6', color: 'yellow', link: '/recipes/details' },
        { id: '7', title: 'Recipe #7', color: 'blue', link: '/recipes/details' },
        { id: '8', title: 'Recipe #8', color: 'red', link: '/recipes/details' },
        { id: '9', title: 'Recipe #9', color: 'blue', link: '/recipes/details' }
      ],
      btns: [
        { text: 'Main Course' }, { text: 'Breakfast' }, { text: 'French' }, { text: 'Italian' }, { text: 'Nordic' }, { text: 'Vegetarian' },
        { text: 'Gluten free' }, { text: 'Low fodmap' },
      ]
    }
  },
}
</script>
<style scoped>
.main {
  text-align: center;
}
.simple-view {
  max-width: 40rem;
  margin: 2rem auto;
}
.search {
  width: 10rem;
  margin-top: 1rem;
  margin-left: 1rem;
}
.outine-2 {
  border: 2px solid white;
}
.learn-more-btn {
  text-transform: initial;
  text-decoration: underline;
}
.container {
  max-width: 50rem;
}
</style>
