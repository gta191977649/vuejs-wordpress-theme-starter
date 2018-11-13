<template>

    <div class="note">
        <div class="note-info"><strong>By:</strong> {{post._embedded.author[0].name}} <strong>日付：</strong>{{post.date}} </div>
        <div class="note-title" @mouseover="playerSelectAudio">
            <router-link :to="'/archives/'+post.slug"><h1 v-html="post.title.rendered"></h1></router-link>
        </div>
        <hr/>
        <div v-html="post.excerpt.rendered"></div>
        <post-info :post="post"/>

    </div>

</template>

<script>
import { mapGetters } from 'vuex'
import PostInfo from './PostInfo'
export default {
    props: ["post"],
    computed:{
        ...mapGetters({
            cats: 'allCategories',
            allCatLoaded: 'allCategoriesLoaded'
        }),
    },
    data(){
        return {
            selectAudio:null,
        }
    },
    methods:{
        playerSelectAudio(){
            this.selectAudio.play()
        }
    },
    mounted(){
        this.selectAudio = new Audio(window.SETTINGS.UI_POST_SELECT)
    },
    components:{
        PostInfo
    }
}
</script>

<style>
  .note{
    margin-top:50px;
  }
</style>
