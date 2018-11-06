<template>
    <div>
    <template v-if="recentPostsLoaded">
        <h1>記事一覧</h1>
        {{currentPage}}
        <post-item v-for="post in recentPosts" :key="post.id" :post="post"/>
        <pagination v-on:pre="prevPage" v-on:next="nextPage"  v-on:to="pageTo"/>

    </template>
    <loader v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PostItem from './PostItem';
import Loader from '../partials/Loader'
import Pagination from './Pagination'
export default {
  props: ["page"],
  computed: {
    ...mapGetters({
      recentPosts: 'recentPosts',
      recentPostsLoaded: 'recentPostsLoaded'
    })
  },
  data(){
      return {
          currentPage: this.page,
      }
  },
  methods: {
      nextPage() {
          this.currentPage = String(parseInt(this.currentPage) + 1)
      },
      prevPage() {
          if(this.currentPage>1) this.currentPage = String(parseInt(this.currentPage) - 1)
      },
      pageTo(page) {
         this.currentPage = String(page)
      }
  },
  components: {
    PostItem,
    Loader,
    Pagination
  },
  watch:{
    currentPage(newWal) {
      this.$store.dispatch('getPosts', { page: newWal })
    }
  },
  mounted() {
    this.$store.dispatch('getPosts', { page: this.currentPage })
  }
}
</script>