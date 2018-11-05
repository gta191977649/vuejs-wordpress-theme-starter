<template>
   <div class="comment">
        <div class="comment-info">コメント: {{comments ? comments.length : 0}}</div>
      
        <div class="comment-list" v-for="comment in comments" :key="comment.id" v-show="comments">
            <!-- 楼主 -->
            <div class="comment-owner" v-if="comment.parent === 0">
                <div class="comment-avatar"><a target="_blank" :href="comment.author_url"><img :src="comment.author_avatar_urls['96']"></a></div>
                <div class="comment-body">
                    <div class="comment-date"><strong>日付：</strong>{{comment.date}}</div>
                    <div class="comment-nickname"><a target="_blank" :href="comment.author_url">{{comment.author_name}}</a></div>
                    <hr/>
                    <div class="comment-content" v-html="comment.content.rendered"></div>
                </div>
            </div>
            <!-- 回复 -->
            <div v-for="reply in comments" :key="reply.id">
                <div class="comment-reply" v-if="reply.parent == comment.id">
                    <div class="comment-avatar"><a target="_blank" :href="comment.author_url"><img :src="reply.author_avatar_urls['96']"></a></div>
                    <div class="comment-body">
                        <div class="comment-date"><strong>日付：</strong>{{reply.date}}</div>
                        <div class="comment-nickname"><a target="_blank"  :href="reply.author_url">{{reply.author_name}}</a></div>
                        <hr/>
                        <div class="comment-content" v-html="reply.content.rendered"></div>
                    </div>
                </div>
            </div>
            <button v-on:click="setReply(comment.id)" class="comment-btn-reply btn btn-primary" v-if="comment.parent === 0">返信する</button>

        </div>
        <!-- 发布评论 -->
        <comment-form v-on:comment-ok="updateComment" :parentid="parent" :postid="postid"/>
    </div>
</template>

<script>
import CommentForm from './CommentForm';
export default {
    data() {
        return {
            comments: false,
            parent: 0
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
            axios.get(window.SETTINGS.API_BASE_PATH + "comments?post=" + id)
            .then(response => {
                this.comments = response.data;
                console.log(this.comments)
            })
            .catch(e => {
                console.log(e);
            });
        },
        setReply(parent) { //设置回复
            this.parent = parent
        },
        updateComment:function() { //触发UI重新更新
            this.getComments(this.postid)
        }
    },
    components: {
        CommentForm,
    }
};
</script>

<style>
</style>
