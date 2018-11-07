import Vue from 'vue'
import VueRouter  from 'vue-router'

// Components
import Home from '../components/Home.vue'
import Post from '../components/Post/Post.vue'
import Page from '../components/Page/Page.vue'
import Search from '../components/Search/Search'
import Category from '../components/Category/Category'
import FriendlyLink from '../components/FriendlyLink/Link'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/:page?',
      name: 'Home',
      component: Home
    },
    {
      // Assuming you're using the default permalink structure for posts
      path: '/archives/:postSlug',
      name: 'Post',
      component: Post
    },
    {
      path: '/page/:pageSlug',
      name: 'Page',
      component: Page
    },
    {
      path: '/search/:keyword',
      name: 'Search',
      component: Search
    },
    {
      path: '/category/:cat',
      name: 'Category',
      component: Category
    },
    { //友情链接
      path: '/link/tomodachi',
      name: 'Friends',
      component: FriendlyLink
    },

    
  ],
  mode: 'history',
  base: '',

  
  // Prevents window from scrolling back to top
  // when navigating between components/views
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }

})

export default router
