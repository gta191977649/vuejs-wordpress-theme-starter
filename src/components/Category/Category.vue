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
import PostItem from '../Post/PostItem'
import Loader from '../partials/Loader'
import { mapGetters } from 'vuex';

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
            loading:true,
            audio: null,
        }
    },
    mounted() {
        this.audio = new Audio(window.SETTINGS.UI_LOAED)

        //用正则表达式取得url最后分类的名称
        this.catName = this.$route.params.cat.match('[^/]+(?=\/$|$)')[0]
        //this.getCategoriesIdByName(this.catName)

    },
    watch: {
        '$route': 'onQueryParamChanged',
        catName(val) {
            this.fetchPostByCatName(val)
        }
    },
    methods: {
        onQueryParamChanged(){
            if(this.$route.params.cat && this.$route.params.cat !== null) {
                this.catName = this.$route.params.cat.match('[^/]+(?=\/$|$)')[0]
            }
        },
        fetchPostByCat(catId) {
            this.loading = true
            axios.get(`/wp-json/wp/v2/posts?_embed&categories=${catId}`)
            .then(response =>{
                this.posts = response.data
                this.loading = false
                this.error = false
            })
            .catch(err =>{
                this.error = true
            })
        },
        fetchCatBySlug(catName) {
            return new Promise((resolve,reject) =>{
                axios.get(`/wp-json/wp/v2/categories?slug=${catName}`)
                .then(response=>{
                    //console.log(response.data)
                    resolve(response.data)
                })
                .catch(error=>{
                    reject(error)
                })
            })
        },
        async fetchPostByCatName(catName) {
            let cat = await this.fetchCatBySlug(catName)
            this.fetchPostByCat(cat[0].id)
            this.audio.play()
        }

    }
}
</script>

<style>

</style>
