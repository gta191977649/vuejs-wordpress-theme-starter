window.SETTINGS = {
  // How many different dispatched actions determine loading progress
  // This is likely determined by how many dispatched actions you have below
  // in the created() method
  LOADING_SEGMENTS: 2,
  SITE_URI: '', //默认可以不填，前提是你的博客在你域名下面，而不是在子目录里
  NAV_MENU_NAME: 'nav',
  WIDGET_MENU_NAME: 'main',
  POST_PAGE_LIMIT: 10,
  FRIENDLY_PAGE:"friendly_links.php",

  // UI EFFECT
  UI_CLICK: "https://api.buncho.moe/mapleeffect/BtMouseClick.mp3",
  UI_MOUSE_OVER: "https://api.buncho.moe/mapleeffect/Tab.mp3",
  UI_ALERT:"https://api.buncho.moe/mapleeffect/DlgNotice.mp3",
  UI_LOAED:"https://api.buncho.moe/mapleeffect/ScrollUp.mp3",
  UI_POST_SELECT:"https://api.buncho.moe/mapleeffect/WorldSelect.mp3",
}
require('./bootstrap')

import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueLazyload from 'vue-lazyload'

import BootstrapVue from 'bootstrap-vue'
//import 'bootstrap/dist/css/bootstrap.css'
//import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
// import { auth, database } from './firebase.config.js' - Uncomment if you need firebase
import App from './App.vue'
import store from './store'
import * as types from './store/mutation-types'
import {Luminous} from 'luminous-lightbox'; 
import hljs from 'highlight.js';
//Font aswome
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.use(VueLazyload)
Vue.use(BootstrapVue)

router.afterEach((to, from) => {
  // Add a body class specific to the route we're viewing
  $("body").removeClass (function (index, className) {
    return (className.match (/(^|\s)vue--page--\S+/g) || []).join(' ');
  });
  $("body").addClass("vue--page--"+_.toLower(to.name))
})

Vue.directive('note', (el) =>{
  /*
    解决图片Lightbox问题
    参考: https://wemo.tech/1169
  */
  let Imgblocks = el.querySelectorAll('img');
  Imgblocks.forEach((block)=>{
    new Luminous(block,{namespace:'img',sourceAttribute:'src',caption:block.src})
  })
  /*
    解决代码高光问题
  */
  let Codeblocks = el.querySelectorAll('code');
  Codeblocks.forEach((block)=>{
    hljs.highlightBlock(block);

  })
})
/*
Vue.directive('app',function(el) {

  el.addEventListener('mouseover',function(element){
    if(element.target.nodeName == "A") {
      let audio = new Audio('http://wp.site/wp-content/themes/vuejs-wordpress-theme-starter/dist/assets/static/effect/BtMouseOver.mp3');
      audio.play();
    }
  })

})
*/
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  created () {
    this.$store.commit(types.RESET_LOADING_PROGRESS)
    this.$store.dispatch('getAllCategories')
    this.$store.dispatch('getAllPages')
    this.$store.dispatch('getAllInfo')
    this.$store.dispatch('getAllNavMenu')
    this.$store.dispatch('getAllWidgets')
    this.$store.dispatch('getAllLinks')

    // Once user is signed in/out, uncomment if you need Firebase authentication
    // auth.onAuthStateChanged(user => {
    //   if (user) {
    //     this.$store.commit(types.LOGIN_USER)
    //     this.$store.commit(types.STORE_FETCHED_USER, user)
    //   } else {
    //     this.$store.commit(types.LOGOUT_USER)
    //   }
    // })
  }
})
