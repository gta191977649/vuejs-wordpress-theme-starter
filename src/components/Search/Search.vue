<template>
    <div class="search-wrapper">
        <h1>検索結果: {{keyword}}</h1>
        <div v-if="results">
            <transition-group name="fade" mode="out-in" appear>
                <post-item v-for="post in results" :key="post.id" :post="post"/>
            </transition-group>
        </div>
        <div v-if="results.length == 0 && !onProcessing">
            <p><strong>{{keyword}}</strong> に一致する文章は見つかりませんでした =w=</p>
        </div>
        <loader v-if="onProcessing"/>
    </div>
</template>

<script>
import PostItem from '../Post/PostItem'
import Loader from '../partials/Loader'
export default {
    components:{
        PostItem,
        Loader,
    },
    data() {
        return {
            keyword:null,
            onProcessing:false,
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
            this.onProcessing = true
            axios.get(window.SETTINGS.API_BASE_PATH + 'posts?_embed&search=' + this.keyword)
            .then((response) => {
                this.results = response.data
                this.onProcessing = false
            }).catch((err) => {
                alert("Errorr on search!\n",err)
                this.onProcessing = false
            });
        }
    }
}
</script>

<style>

</style>
