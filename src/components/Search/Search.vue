<template>
    <div class="search-wrapper">
        <h1>検索結果: {{keyword}}</h1>
        <div v-if="results">
            <transition-group name="fade" mode="out-in" appear>
                <post-item v-for="post in results" :key="post.id" :post="post"/>
            </transition-group>
        </div>
        <div v-if="results.length == 0">
            <p><strong>{{keyword}}</strong> に一致する文章は見つかりませんでした =w=</p>
        </div>
    </div>
</template>

<script>
import PostItem from '../Post/PostItem'
export default {
    components:{
        PostItem,
    },
    data() {
        return {
            keyword:null,
            results:[]
        }
    },
    mounted(){
        if(this.$route.params.keyword !== undefined)
            this.keyword = this.$route.params.keyword
        
    },
    watch: {
        '$route'(to,from) {
            console.log(to,from)
            this.keyword = to.params.keyword
        },
        keyword: function(newVal) {
            this.search(newVal);
        }
    },
    methods:{
        search(keyword) {
            axios.get(window.SETTINGS.API_BASE_PATH + 'posts?_embed&search=' + this.keyword)
            .then((response) => {
                this.results = response.data
            }).catch((err) => {
                alert("Errorr on search!\n",err)
            });
        }
    }
}
</script>

<style>

</style>
