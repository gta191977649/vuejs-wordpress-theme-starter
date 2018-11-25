import Vue from 'vue'
import VueRouter  from 'vue-router'

// Components
import Home from '../components/Home.vue'
import Post from '../components/Post/Post.vue'
import Page from '../components/Page/Page.vue'
import Search from '../components/Search/Search'
import Category from '../components/Category/Category'
import FriendlyLink from '../components/FriendlyLink/Link'
import PageNotFound from '../components/404'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { 
      path: '/404',
      name: '404',
      component: PageNotFound
    },
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
      path: '/category/:cat*',
      name: 'Category',
      component: Category
    },
    { //友情链接
      path: '/link/tomodachi',
      name: 'Friends',
      component: FriendlyLink
    },
    { //404
      path: '*',
      redirect: "/404"
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
