<template>
   <div class="comment">
        <div class="comment-info">コメント: {{comments ? comments.length : 0}}</div>
      
        <div class="comment-list" v-for="comment in comments" :key="comment.id" v-show="comments">
            <!-- 楼主 -->
            <div class="comment-owner" v-if="comment.parent === 0">
                <div class="comment-avatar"><img :src="comment.author_avatar_urls['96']"></div>
                <div class="comment-body">
                    <div class="comment-date"><strong>日付：</strong>{{comment.date}}</div>
                    <div class="comment-nickname">{{comment.author_name}}</div>
                    <hr/>
                    <div class="comment-content" v-html="comment.content.rendered"></div>
                </div>
            </div>
            <!-- 回复 -->
            <div v-for="reply in comments" :key="reply.id">
                <div class="comment-reply" v-if="reply.parent == comment.id">
                    <div class="comment-avatar"><img :src="reply.author_avatar_urls['96']"></div>
                    <div class="comment-body">
                        <div class="comment-date"><strong>日付：</strong>{{reply.date}}</div>
                        <div class="comment-nickname">{{reply.author_name}}</div>
                        <hr/>
                        <div class="comment-content" v-html="reply.content.rendered"></div>
                    </div>
                </div>
            </div>
            <a href="#" class="btn btn-primary">返信する</a>
        </div>
        <!-- 发布评论 -->
        <div class="maple-ui-window">
            <div class="maple-ui-window-header">
                コメントを残す
                <div class="maple-ui-win-control">
                    <a href="#" class="btn-ui-disabled float-right">X</a>
                </div>
            </div>
            <form action="#" method="post" id="commentform" class="comment-form">
                <div class="maple-ui-window-content">
                    <label for="comment">コメント: ご自由にコメント可能です。(承認制)</label>
                    <textarea id="comment" class="form-control" name="comment" rows="3"></textarea>
                    
                    <label for="author">ニックネーム</label>
                    <input style="width:100%;" id="author" name="author" class="form-control" type="text" value="" size="30">
                    
                    <label for="email">メールアドレス</label>
                    <input style="width:100%;" id="email" name="email" class="form-control" type="text" value="" size="30">
                    
                    <label for="url">サイト</label>
                    <input style="width:100%;" id="url" name="url" class="form-control" type="text" value="" size="30">
                </div>
                <div class="maple-ui-controlwrapper">
                    <button class="btn btn-ui-primary" type="submit">コメントを送信</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      comments: false
    };
  },
  mounted() {
    this.getComments(this.postid);
  },
  props: {
    postid: {
      required: true
    }
  },

  methods: {
    getComments: function(id) {
      axios
        .get(window.SETTINGS.API_BASE_PATH + "comments?post=" + id)
        .then(response => {
          this.comments = response.data;
          console.log(this.comments)
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

<style>
</style>
