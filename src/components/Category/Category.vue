<template>
    <div class="cat-wrapper" v-if="!loading">
        <h1>カテゴリー {{catName}}</h1>
        <p>合計: {{posts.length}}</p>
        <transition-group name="fade" mode="out-in" appear>
            <post-item v-for="post in posts" :key="post.id" :post="post"/>
        </transition-group>
    </div>
    <loader v-else/>
</template>

<script>
import PostItem from '../Post/PostItem';
import Loader from '../partials/Loader'
export default {
    components:{
        PostItem,
        Loader
    },
    data() {
        return {
            catName:null,
            posts:[],
            error:false,
            loading:false
        }
    },
    mounted() {
        this.catName = this.$route.params.cat
        this.fetchPostByCat(this.catName)
    },
    methods: {
        fetchPostByCat(catName) {
            this.loading = true
            axios.get('/wp-json/wp/v2/posts?_embed&[categories]='+catName)
            .then(response =>{
                this.posts = response.data
                this.loading = false
                this.error = false
            })
            .catch(err =>{
                this.error = true
            })
        }
    }
}
</script>

<style>

</style>
