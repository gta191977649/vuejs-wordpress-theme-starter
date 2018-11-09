<template>
    <div class="maple-ui-window">
            <div class="maple-ui-window-header">
                コメントを残す {{comment.parent}}
                <!--
                <div class="maple-ui-win-control">
                    <a href="#" class="btn-ui-disabled float-right">X</a>
                </div>
                -->
            </div>
        <form v-on:submit.prevent="submit">
            <div class="maple-ui-window-content">
                <label for="author_name">ニックネーム</label>
                <input v-model="comment.author_name" id="author" name="author_name" class="form-control" type="text" value="" size="30">
                
                <label for="author_email">メールアドレス</label>
                <input v-model="comment.author_email" id="email" name="author_email" class="form-control" type="text" value="" size="30">
                
                <label for="author_url">サイト</label>
                <input v-model="comment.author_url" id="url" name="author_url" class="form-control" type="text" value="" size="30">

                <label for="content">コメント: ご自由にコメント可能です。(承認制)</label>
                <textarea v-model="comment.content" id="comment" class="form-control" name="content" rows="3"></textarea>
                

            </div>
            <div class="maple-ui-controlwrapper">
                <button class="btn btn-ui-primary" type="submit">コメントを送信</button>
            </div>
        </form>
    </div>
    
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            comment: {
                author_name:null,
                author_email:null,
                author_url:null,
                content:null,
                post:this.postid,//对于博文
                parent:this.parentid,//对应楼主
            }
        }
    },
    props: {
        postid: {
            required: true
        },
        parentid: {
            required: true
        }
    },
    computed: {
        ...mapGetters({
            info: 'info',
        }),    
    },
    watch: {
        parentid:function(newVal, oldVal) {
          this.comment.parent = newVal
        }
    },
    methods: {
        submit() {
            let formData = this.comment
            //console.log(formData)
            //异步提交评论
            axios.post(`${this.info.url}/wp-json/wp/v2/comments`,formData)
            .then(response => { //当评论发布成功后
                this.clearForm();
                //触发父组件UI更新
                this.$emit('comment-ok')
                alert("送信成功していました")
            })
            .catch(err => {
                console.log(err);
                alert(err.message)
            })
        },
        clearForm() {
            //清空表单
            this.comment.author_name = null
            this.comment.author_email = null
            this.comment.author_url = null
            this.comment.content = null
        }
        
    }
}
</script>

<style>

</style>
