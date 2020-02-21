import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Recipe App',
    component: () => import('@/components/Home.vue'),
  },
  {
    path: '/recipes',
    component: () => import('@/views/Recipes/Recipes.vue'),
    children: [
      {
        path: '/recipes',
        name: 'Recipes',
        component: () => import('@/views/Recipes/RecipeRecommendations.vue'),
        meta: {
          breadcrumb: [
            { name: 'Home', link: '/' },
            { name: 'Recipes' }
          ]
        },
      },
      {
        path: 'results',
        name: 'Search results',
        component: () => import('@/views/Recipes/RecipeResults.vue'),
        meta: {
          breadcrumb: [
            { name: 'Home', link: '/' },
            { name: 'Recipes', link: '/recipes' },
            { name: 'Search results' },
          ]
        }
      },
      {
        path: 'details',
        name: 'Random recipe',
        component: () => import('@/views/Recipes/RecipeDetails.vue'),
        meta: {
          breadcrumb: [
            { name: 'Home', link: '/' },
            { name: 'Recipes', link: '/recipes' },
            { name: 'Random recipe' },
          ]
        }
      },
      {
        path: 'results/details',
        name: 'Recipe details',
        component: () => import('@/views/Recipes/RecipeDetails.vue'),
        meta: {
          breadcrumb: [
            { name: 'Home', link: '/' },
            { name: 'Recipes', link: '/recipes' },
            { name: 'Search results', link: '/recipes/results' },
            { name: 'Recipe details' },
          ]
        }
      }
    ]
  },
  {
    path: '/wines',
    name: 'Wines',
    component: () => import('@/views/Wines/Wines.vue'),
    meta: {
      breadcrumb: [
        { name: 'Home', link: '/' },
        { name: 'Wines' }
      ]
    },
  },
  {
    path: '/wines/wines-menu',
    name: 'Wines menu',
    component: () => import('@/views/Wines/WinesMenu.vue'),
    meta: {
      breadcrumb: [
        { name: 'Home', link: '/' },
        { name: 'Wines', link: '/wines' },
        { name: 'Wines menu' },
      ]
    }
  },
  {
    path: '/trivia',
    name: 'Trivia',
    component: () => import('@/views/Trivia/Trivia.vue'),
    meta: {
      breadcrumb: [
        { name: 'Home', link: '/' },
        { name: 'Food trivia' },
      ]
    }
  },
  {
    path: '/favourites',
    name: 'Favourites',
    component: () => import('@/views/Favourites/Favourites.vue'),
    meta: {
      breadcrumb: [
        { name: 'Home', link: '/' },
        { name: 'Favourites' },
      ]
    }
  },
  {
    path: '/admin',
    name: 'Admin panel',
    component: () => import('@/views/Admin/Admin.vue'),
    meta: {
      breadcrumb: [
        { name: 'Home', link: '/' },
        { name: 'Admin panel' },
      ]
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
