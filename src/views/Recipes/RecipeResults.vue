<template>
  <div>
    <div class="main">
      <h2>Give a man a fish and he will eat for a day. Teach him how to fish and he will sit in a boat and drink beer all day.</h2>
      <br />
    </div>

    <v-container fluid grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12>
          <h2 id="results" class="white--text">Results:</h2>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg4 v-for="item in links" :key="item.id">
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
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  components: {
    // tba
  },
  data: () => ({
    links: [
      { id: '1', title: 'Result #1', color: 'teal', link: '/recipes/results/details' },
      { id: '2', title: 'Result #2', color: 'yellow', link: '/recipes/results/details' },
      { id: '3', title: 'Result #3', color: 'blue', link: '/recipes/results/details' },
      { id: '4', title: 'Result #4', color: 'red', link: '/recipes/results/details' },
      { id: '5', title: 'Result #5', color: 'teal', link: '/recipes/results/details' },
      { id: '6', title: 'Result #6', color: 'yellow', link: '/recipes/results/details' },
      { id: '7', title: 'Result #7', color: 'blue', link: '/recipes/results/details' },
      { id: '8', title: 'Result #8', color: 'red', link: '/recipes/results/details' },
      { id: '9', title: 'Result #9', color: 'blue', link: '/recipes/results/details' }
    ]
  }),
}
</script>

<style scoped>
.main {
  text-align: center;
  margin: 0 auto;
}
.container {
  width: 60rem;
}
</style>