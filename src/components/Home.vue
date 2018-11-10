<template>
    <div class="post-wapper" v-if="recentPostsLoaded">
        <h1>記事一覧</h1>
        <transition-group name="fade" mode="out-in" appear>
            <post-item v-for="post in recentPosts" :key="post.id" :post="post"/>
        </transition-group>
        <pagination v-on:pre="prevPage" v-on:next="nextPage" v-on:to="pageTo" :current="currentPage" :total="totalPage"/>
    </div>
    <loader v-else />
</template>
<script>
import { mapGetters } from 'vuex'
import PostItem from './Post/PostItem';
import Loader from './partials/Loader'
import Pagination from './Post/Pagination'
import util from '../utils/isNumber'
export default {

  computed: {
    ...mapGetters({
      recentPosts: 'recentPosts',
      totalPage: 'totalPostPage',
      recentPostsLoaded: 'recentPostsLoaded'
    })
  },
  data(){
      return {
          currentPage: 1,
      }
  },
  methods: {
      nextPage() {
          if(this.currentPage + 1 < this.totalPage) {
            this.currentPage = String(parseInt(this.currentPage) + 1)
            this.$router.push({name:'Home',params:{page:this.currentPage}})
          }
      },
      prevPage() {
          if(this.currentPage>1) this.currentPage = String(parseInt(this.currentPage) - 1)
          this.$router.push({name:'Home',params:{page:this.currentPage}})
      },
      pageTo(page) {
         this.currentPage = String(page)
         this.$router.push({name:'Home',params:{page:this.currentPage}})
      },
      loadPageFromParam() {
          if(this.$route.params.page && util.isNumber(this.$route.params.page)) {
                this.currentPage = this.$route.params.page
          } else {
                this.currentPage = 1
          }
            
      }
  },
  components: {
    PostItem,
    Loader,
    Pagination
  },
  watch:{
    currentPage(newWal) {
        this.$store.dispatch('getPosts', { page: this.currentPage })
    },
    '$route': 'loadPageFromParam'
  },
  mounted() {
    this.loadPageFromParam()
    
    this.$store.dispatch('getPosts', { page: this.currentPage })
  }
}
</script>