<template>
   <div class="comment">
        <h1 v-if="loading">Loading...</h1>
        <div class="comment-info">コメント: {{comments ? comments.length : 0}}</div>
        
        <div class="comment-list" v-for="comment in comments" :key="comment.id" v-show="comments">
            <!-- 楼主 -->
            <div  v-if="comment.parent === 0">
                <div class="comment-owner">
                    <div class="comment-avatar"><a target="_blank" :href="comment.author_url"><img :src="comment.author_avatar_urls['96']"></a></div>
                    <div class="comment-body">
                        <div class="comment-date"><strong>日付：</strong>{{comment.date}}</div>
                        <div class="comment-nickname"><a target="_blank" :href="comment.author_url">{{comment.author_name}}</a></div>
                        <hr/>
                        <div class="comment-content" v-html="comment.content.rendered"></div>
                    </div>
                </div>
                <!-- 回复 -->
                <div v-for="(reply,idx) in reverse(comments)" :key="idx">
                   
                    <div class="comment-reply" v-if="reply.id !== comment.id && getCommentParent(reply.id) === comment.id">
                        <div class="comment-avatar"><a target="_blank" :href="comment.author_url"><img :src="reply.author_avatar_urls['96']"></a></div>
                        <div class="comment-body">
                            <div class="comment-date"><strong>日付：</strong>{{reply.date}}</div>
                            <div class="comment-nickname"><a target="_blank"  :href="reply.author_url">{{reply.author_name}}</a></div>
                            <hr/>
                            <div class="comment-content" v-html="reply.content.rendered"></div>
                        </div>
                    </div>
                    
                </div>
            </div>
            <button v-on:click="setReply(comment)" class="comment-btn-reply btn btn-primary" v-if="comment.parent === 0">返信する</button>

        </div>
        <!-- 发布评论 -->
        <comment-form v-on:comment-ok="updateComment" :parentComment="parentComment" :postid="postid" v-on:cancelReply="cancelReply"/>

    </div>
</template>

<script>
import CommentForm from './CommentForm';
export default {
    data() {
        return {
            comments: false,
            parentComment: null,
            loading: true,
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
        reverse: function (value) {
            return value.slice().reverse();
        },
        getComments: function(id) {
            axios.get(`${window.SETTINGS.SITE_URI}/wp-json/wp/v2/comments?post=${id}` )
                .then(response => {
                    this.comments = response.data;
                    console.log(this.comments);
                    this.loading = false;
                })
                .catch(e => {
                    console.log(e);
                    this.loading = false;
                }
            );
        },
        getCommentParent: function(comment_id) {
            
            for(let i = 0; i < this.comments.length; i++) {
                if(this.comments[i].id === comment_id) {
                    //如果找到了，并且 该评论parent id 并不=0，继续递归直到0
                    if(this.comments[i].parent !== 0) return this.getCommentParent(this.comments[i].parent)
                    else return this.comments[i].id;
                }
            }
            //没找到评论，return null
            return null;
        },
        setReply(parentComment) { //设置回复
            this.parentComment = parentComment
        },
        cancelReply(){
            this.parentComment = null
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
