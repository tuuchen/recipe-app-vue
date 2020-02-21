<template>
  <div>
    <div v-if="!advanced">
      <div class="search-bar simple">
        <v-layout>
          <v-text-field hint="Optional" persistent-hint label="Recipe search"></v-text-field>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                to="/recipes/results"
                @click="scroll"
                rounded
                small
                class="search-icon"
              >
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </template>
            Search
          </v-tooltip>
        </v-layout>
        <v-layout row wrap>
          <v-col>
            <v-btn small class="search" color="primary" @click="advanced = !advanced">Detailed</v-btn>
          </v-col>
        </v-layout>
      </div>
    </div>
    <div v-if="advanced">
      <div class="search-bar">
        <v-layout>
          <v-text-field :hint="checkedOptions" persistent-hint label="Keyword"></v-text-field>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                to="/recipes/results"
                @click="scroll"
                rounded
                small
                class="search-icon"
              >
                <v-icon>mdi-magnify</v-icon>
              </v-btn>
            </template>
            Search
          </v-tooltip>
        </v-layout>
        <v-layout row wrap>
          <v-col>
            <v-btn small class="search" color="primary" @click="advanced = !advanced">Simple</v-btn>
            <v-btn small class="search" @click="clearAllCheckbox">Clear all</v-btn>
          </v-col>
        </v-layout>
      </div>
      <v-layout>
        <v-flex>
          <v-col class="detailed-button-group">
            <v-row align="center">
              <v-col cols="12" sm="12" md="4">
                <v-select
                  tags
                  ref="cuisine"
                  v-model="checkedCuisines"
                  :counter="checkedCuisines.toString()"
                  :items="cuisines"
                  :menu-props="{ maxHeight: '400' }"
                  label="Cuisine type"
                  multiple
                  hint="Optional"
                  persistent-hint
                >
                  <template v-slot:prepend-item>
                    <v-btn color="red darken-1" text @click="checkedCuisines = []">Clear</v-btn>
                    <v-btn
                      style="float: right;"
                      color="blue darken-1"
                      text
                      @click="$refs.cuisine.isMenuActive = false"
                    >Save</v-btn>
                    <v-divider class="mb-2"></v-divider>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-select
                  tags
                  ref="diet"
                  v-model="checkedDiets"
                  :counter="checkedDiets.toString()"
                  :items="diets"
                  :menu-props="{ maxHeight: '400' }"
                  label="Diet options"
                  multiple
                  hint="Optional"
                  persistent-hint
                >
                  <template v-slot:prepend-item>
                    <v-btn color="red darken-1" text @click="checkedDiets = []">Clear</v-btn>
                    <v-btn
                      style="float: right;"
                      color="blue darken-1"
                      text
                      @click="$refs.diet.isMenuActive = false"
                    >Save</v-btn>
                    <v-divider class="mb-2"></v-divider>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-select
                  tags
                  ref="intolerance"
                  v-model="checkedIntolerances"
                  :counter="checkedIntolerances.toString()"
                  :items="intolerances"
                  :menu-props="{ maxHeight: '400' }"
                  label="Intolerances"
                  multiple
                  hint="Optional"
                  persistent-hint
                >
                  <template v-slot:prepend-item>
                    <v-btn color="red darken-1" text @click="checkedIntolerances = []">Clear</v-btn>
                    <v-btn
                      style="float: right;"
                      color="blue darken-1"
                      text
                      @click="$refs.intolerance.isMenuActive = false"
                    >Save</v-btn>
                    <v-divider class="mb-2"></v-divider>
                  </template>
                </v-select>
              </v-col>
            </v-row>
            <v-row align="center">
              <v-col cols="12" sm="12" md="4">
                <v-select
                  tags
                  ref="type"
                  v-model="checkedTypes"
                  :counter="checkedTypes.toString()"
                  :items="types"
                  :menu-props="{ maxHeight: '400' }"
                  label="Recipe type"
                  multiple
                  hint="Optional"
                  persistent-hint
                >
                  <template v-slot:prepend-item>
                    <v-btn color="red darken-1" text @click="checkedTypes = []">Clear</v-btn>
                    <v-btn
                      style="float: right;"
                      color="blue darken-1"
                      text
                      @click="$refs.type.isMenuActive = false"
                    >Save</v-btn>
                    <v-divider class="mb-2"></v-divider>
                  </template>
                </v-select>
              </v-col>
              <v-col cols="12" sm="12" md="4">
                <v-row dense justify="space-around">
                  <v-dialog :max-width="valueDialogMaxWidth" v-model="valueDialog" scrollable>
                    <template v-slot:activator="{ on }">
                      <v-col cols="12">
                        <v-btn
                          small
                          :width="dialogBtnMaxWidth"
                          :color="nutritionColor"
                          v-on="on"
                        >Nutritions</v-btn>
                      </v-col>
                    </template>
                    <v-card>
                      <v-card-title>Recipe values</v-card-title>
                      <v-divider></v-divider>
                      <v-card-text class="dialog-card-text">
                        <v-flex v-for="(item, index) in nutritions" :key="index">
                          <v-subheader>{{item.label}} ({{item.unit}})</v-subheader>
                          <v-checkbox v-model="item.state"></v-checkbox>
                          <v-slider
                            :disabled="!item.state"
                            :key="index"
                            v-model="item.value"
                            :min="item.min"
                            :max="item.max"
                            thumb-label="always"
                            :thumb-size="22"
                          >
                            <template v-slot:append>
                              <v-text-field
                                v-model="item.value"
                                class="mt-0 pt-0"
                                hide-details
                                single-line
                                :rules="item.rules"
                                type="number"
                                style="width: 50px"
                              ></v-text-field>
                            </template>
                          </v-slider>
                        </v-flex>
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-btn color="red darken-1" text @click="resetSliders">Clear</v-btn>
                        <v-spacer />
                        <v-btn color="blue darken-1" text @click="valueDialog = false">Save</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-row>
              </v-col>
              <v-col cols="12" sm="4">
                <!-- Reserved -->
              </v-col>
            </v-row>
          </v-col>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecipeSearch',
  data: () => ({
    dialogBtnMaxWidth: '10rem',
    valueDialogMaxWidth: '50rem',
    dialogMaxWidth: '300px',
    cuisineDialog: false,
    dietDialog: false,
    intoleranceDialog: false,
    mealDialog: false,
    valueDialog: false,
    advanced: false,
    showCuisine: false,
    showDiet: false,
    showIntolerances: false,
    showType: false,
    checkedCuisines: [],
    checkedDiets: [],
    checkedIntolerances: [],
    checkedTypes: [],
    cuisines: ['African', 'Chinese', 'Japanese', 'Korean', 'Vietnamese', 'Thai',
      'Indian', 'British', 'Irish', 'French', 'Italian', 'Mexican', 'Spanish', 'Middle eastern',
      'Jewish', 'American', 'Cajun', 'Southern', 'Greek', 'German', 'Eastern European',
      'Caribbean', 'Latin American', 'Nordic', 'Asian'
    ],
    diets: [
      'Pescetarian', 'Lacto vegetarian', 'Ovo vegetarian', 'Vegan',
      'Paleo', 'Primal', 'Vegetarian', 'Fodmap friendly'
    ],
    intolerances: [
      'Dairy', 'Egg', 'Gluten', 'Peanut', 'Sesame', 'Seafood',
      'Shellfish', 'Tree nut', 'Wheat', 'Soy'
    ],
    types: [
      'Main course', 'Side', 'Dish', 'Dessert', 'Appetizer', 'Salad',
      'Bread', 'Breakfast', 'Soup', 'Beverage', 'Sauce', 'Drink'
    ],
    nutritions: [
      { label: 'Min fiber', unit: 'g', min: 1, max: 30, value: 1, state: false, rules: [v => v < 30] },
      { label: 'Min protein', unit: 'g', min: 1, max: 100, value: 1, state: false, rules: [v => v < 100] },
      { label: 'Max sugar', unit: 'g', min: 0, max: 100, value: 0, state: false, rules: [v => v < 100] },
      { label: 'Max saturated fat', unit: 'g', min: 0, max: 50, value: 0, state: false, rules: [v => v < 50] },
      { label: 'Max cholesterol', unit: 'mg', min: 0, max: 2000, value: 0, state: false, rules: [v => v < 2000] },
      { label: 'Max caffeine', unit: 'mg', min: 0, max: 150, value: 0, state: false, rules: [v => v < 150] },
      { label: 'Max alcohol', unit: 'g', min: 0, max: 200, value: 0, state: false, rules: [v => v < 200] },
    ]
  }),
  methods: {
    scroll () {
      var results = document.getElementById('results');
      if (results) {
        results.scrollIntoView({ behavior: 'smooth' });
      }
    },
    clearAllCheckbox () {
      this.checkedCuisines = []
      this.checkedDiets = []
      this.checkedIntolerances = []
      this.checkedTypes = []
      this.resetSliders()
    },
    resetSliders () {
      for (var i = this.nutritions.length; i--;) {
        this.nutritions[i].state = false
      }
    },
  },
  computed: {
    checkedOptions () {
      var arr = []
      for (var i = this.nutritions.length; i--;) {
        if (this.nutritions[i].state == true)
          arr.push([this.nutritions[i].label + ' ' + this.nutritions[i].value + ' ' + this.nutritions[i].unit])
      }
      arr = arr.join(', ')
      if (arr.length > 0)
        return 'Nutritions: ' + arr
      else return 'Optional'
    },
    nutritionColor () {
      var arr = []
      var isTrue = (value) => value == true
      // var positive = (value) => value > 0 // check for numbers
      for (var i = this.nutritions.length; i--;) {
        if (this.nutritions[i].state == true)
          arr.push(this.nutritions[i].state)
      }
      if (arr.some(isTrue))
        return 'warning'
      else return 'primary'
    }
  }
}
</script>

<style scoped>
.detailed-button-group {
  max-width: 50rem;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 3rem;
}
.checked-info {
  font-size: small;
  word-break: break-all;
}
.search-icon {
  margin-top: 1rem;
  margin-left: 1rem;
}
.search-bar {
  max-width: 60rem;
  margin: 0 auto 2rem;
}
.search {
  width: 10rem;
  margin-top: 1rem;
  margin-left: 1rem;
}
.simple {
  margin-bottom: 3rem;
}
</style>