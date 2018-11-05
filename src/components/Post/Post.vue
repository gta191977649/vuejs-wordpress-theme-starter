<template>
  <div class="note-wrapper" v-if="post">
    <div class="note">
      <div class="note-info"><strong>By:</strong> {{post._embedded.author[0].name}} <strong>日付：</strong>{{post.date}}</div>
      <h1>{{ post.title.rendered }}</h1>
      <hr/>
      <div v-html="post.content.rendered"></div>
    </div>
    <comment :postid="post.id"/>
  </div>
  <div v-else>
    <loader/>
  </div>
</template>

<script>
import Loader from '../partials/Loader.vue';
import Comment from '../Comment/Comment.vue';
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      post: false
    }
  },

  computed: {

  },
  beforeMount() {
    this.getPost()
  },

  methods: {
    getPost: function() {
      axios.get(window.SETTINGS.API_BASE_PATH + 'posts?_embed&slug=' + this.$route.params.postSlug)
      .then(response => {
        this.post = response.data[0]
        console.log(response.data[0])
      })
      .catch(e => {
        console.log(e);
      })
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
