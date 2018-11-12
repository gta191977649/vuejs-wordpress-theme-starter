<template>
    <div class="link-wrapper" v-if="friendlyLinkPage">
        <div class="note">
            <h1>{{ friendlyLinkPage.title.rendered }}</h1>
            <hr/>
            <div class="friend-links">
                <ul>
                    <li v-for="(link,idx) in links" :key="idx">
                        <a :href="link.url">
                            <gravatar class="friend-avator" :email="extractImage(link.image)"/>
                        </a>
                        <h3><a :href="link.url">{{link.name}}</a></h3>
                        <p>{{link.description}}</p>
                    </li>
                </ul>
            </div>
            <hr/>
            <div v-html="friendlyLinkPage.content.rendered"></div>
        </div>
        <comment :postid="friendlyLinkPage.id" v-if="friendlyLinkPage.comment_status == 'open'"/>
    </div>
    <Loader v-else />
</template>

<script>
import { mapGetters } from 'vuex'
import Loader from '../partials/Loader.vue'
import Gravatar from 'vue-gravatar'
import Comment from '../Comment/Comment'
export default {
    components:{
        Loader,
        Gravatar,
        Comment
    },
    computed: {
        ...mapGetters({
            friendlyLinkPage: 'friendlyLinkPage',
            links:'getLinks'
        })
    },
    methods:{
        extractImage(wp_img_uri) {
            //去掉http开头
            wp_img_uri = wp_img_uri.replace("http://",'');
            wp_img_uri = wp_img_uri.replace("https://",'');
            return wp_img_uri
        }
        /*
        getFriendlyPage() {
            //找出FriendlyLink的页面的idx
            let targetId = null
            for(let i = 0; i < this.pages.length; i++) {
                if(this.pages[i]["template"] == window.SETTINGS.FRIENDLY_PAGE) {
                    targetId = i
                    break;
                }
            }
            if(targetId !== null) {
                this.friendlyLinkPage = this.pages[targetId]
            }
        }
        */
    }
}
</script>

<style>
  .note{
    margin-top:50px;
  }
</style>
