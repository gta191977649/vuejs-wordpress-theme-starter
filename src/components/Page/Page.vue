<template>
  <div class="page-wrap">
    <div class="note"  v-if="allPagesLoaded">
        <h1>{{ pageContent.title.rendered }}</h1>
        <hr/>
        <div v-html="pageContent.content.rendered" v-note></div>
    </div>
    <Loader v-else />
    <comment :postid="pageContent.id" v-if="pageContent.comment_status == 'open'"/>
  </div>
</template>

<script>
import Loader from '../partials/Loader.vue';
import Comment from '../Comment/Comment.vue';

import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      page: 'page',
      allPagesLoaded: 'allPagesLoaded'
    }),

    pageContent() {
      return this.page(this.$route.params.pageSlug)
    }
  },

  components: {
    Loader,
    Comment
  }
}
</script>
<style>
  .note{
    margin-top:50px;
  }
</style>