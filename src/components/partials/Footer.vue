<template>
    <div class="footer-area">
        <div class="props"></div>
        <div class="grassy"></div> 
        <p><router-link to="/">{{info.name}} {{ new Date().getFullYear() }}</router-link> - Theme by Episodes <br/>Powered by <a href="https://cn.vuejs.org/">Vue.js</a> and <a href="https://wordpress.org/">Wordpress</a></p>
        <p><small>(当サイト内にある『MapleStory』に関連するコンテンツのデータ・画像等の著作権は、全て株式会社ネクソンおよび韓国NEXON社に帰属します)</small></p>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex'
    export default {
        computed: {
            ...mapGetters({
                info: 'info',
            }),
            
        }
    }
</script>
