<template>
    <div>
    <template v-if="recentPostsLoaded">
        <h1>記事一覧</h1>
        <post-item v-for="post in recentPosts(limit)" :key="post.id" :post="post"/>
    </template>
    <loader v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PostItem from './PostItem';
import Loader from '../partials/Loader'

export default {
  props: ["limit"],
  computed: {
    ...mapGetters({
      recentPosts: 'recentPosts',
      recentPostsLoaded: 'recentPostsLoaded'
    })
  },
  
  components: {
    PostItem,
    Loader
  },
  mounted() {
    this.$store.dispatch('getPosts', { limit: this.limit })
  }
}
</script>