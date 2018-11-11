<template>

  <div id="my-app" class="page-wrapper" @mouseover="onMouseHover" @mousedown="onMouseDown">
    <transition
      name="loader-animation"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut">
      <div class="progress loader" v-if="showLoader">
        <div class="progress-bar" role="progressbar" :style="loaderStyle" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    </transition>
     <div class="backgound">
          <div class="sky"></div>
          <div class="clouds"></div>
          <div class="clouds-2"></div>
          <div class="moutain-0"></div>
          <div class="moutain-1"></div>
          <div class="moutain-2"></div>
          <div class="sea"></div>
          <div class="fields-area">
              <div class="fields-1"></div>
              <div class="fields-2"></div>
              <div class="fields-3"></div>
              <div class="fields-4"></div>
          </div>
      </div>
      <div class="container">
        <app-header></app-header>
        <app-widget></app-widget>
        <div class="content-area">
          <div class="content-head"></div>
          <div class="content">
            <app-search></app-search>
            <transition name="fade" mode="out-in" appear>
              <router-view></router-view>
            </transition>
          </div>
      </div>

    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Header from './components/partials/Header'
import Footer from './components/partials/Footer'
import Widget from './components/widgets/Widgets'
import SearchForm from './components/Search/SearchForm'

export default {
  mounted(){
    this.audio = new Audio()
  },
  methods:{
    onMouseHover(element) {
      if(element.target.tagName == "A" || element.target.tagName == "IMG") {
        this.playSfX(window.SETTINGS.UI_MOUSE_OVER)
      }
    },
    onMouseDown() {
       this.playSfX(window.SETTINGS.UI_CLICK)
    },
    playSfX(url){
      this.audio.src = url
      if(this.audio.paused) this.audio.play()
    }
  },
  data() {
    return {
      showLoader: true,
      audio: null,
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
      loadingProgress: 'loadingProgress'
    }),

    loaderStyle() {
      return `width: ${this.loadingProgress}%;`
    }
  },

  components: {
    appHeader: Header,
    appFooter: Footer,
    appWidget: Widget,
    appSearch: SearchForm
  },

  watch: {
    // watch the value of isLoading and once it's false hide the loader
    isLoading(val) {
      if (val == false) {
        let self = this
        setTimeout(function(){
          self.showLoader = false
        }, 1000)
      }
    }
  }
}
</script>

<style lang="scss">
  @import './styles/app.scss';

  
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
