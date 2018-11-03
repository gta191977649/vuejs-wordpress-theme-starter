<template>
    <div>
    <template v-if="recentPostsLoaded">
        <h1>记事一览</h1>
        <div class="note" v-for="post in recentPosts(limit)" :key="post.id">
          <div class="note-info"><strong>By:</strong> episodes <strong>日付：</strong>十月 18, 2018</div>
          <div class="note-title">
            <router-link :to="'/archive/'+post.slug"><h1>{{ post.title.rendered }}</h1></router-link>
          </div>
          <hr/>
          <div v-html="post.excerpt.rendered"></div>
        </div>
    </template>
    <Loader v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ["limit"],
  computed: {
    ...mapGetters({
      recentPosts: 'recentPosts',
      recentPostsLoaded: 'recentPostsLoaded'
    })
  },

  mounted() {
    this.$store.dispatch('getPosts', { limit: this.limit })
  }
}
</script>