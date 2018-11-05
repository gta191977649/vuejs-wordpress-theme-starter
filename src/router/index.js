import Vue from 'vue'
import Router from 'vue-router'

// Components
import Home from '../components/Home.vue'
import Post from '../components/Post/Post.vue'
import Page from '../components/Page/Page.vue'
import Search from '../components/Search/Search'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      // Assuming you're using the default permalink structure for posts
      path: '/archive/:postSlug',
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
    }
    
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
