<template>
    <div class="search-wrapper">
        <h1>検索結果: {{keyword}}</h1>
        <template v-if="results">
            <div class="note" v-for="post in results" :key="post.id">
            <div class="note-info"><strong>By:</strong> {{post._embedded.author[0].name}} <strong>日付：</strong>{{post.date}} </div>
            <div class="note-title">
                <router-link :to="'/archive/'+post.slug"><h1>{{ post.title.rendered }}</h1></router-link>
            </div>
            <hr/>
            <div v-html="post.excerpt.rendered"></div>
            </div>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            keyword:null,
            results:[]
        }
    },
    mounted(){
        this.keyword = this.$route.params.keyword
    },
    watch:{
        keyword: function (val) {
            this.keyword = val
            this.search(val)
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
