<template>
    <div class="footer-area">
        <div class="props"></div>
        <div class="grassy"></div> 
        <p>{{info.name}} {{ new Date().getFullYear() }} - Theme by Episodes <br/>Powered by Vue.js</p>
        <p>当サイト内にある『MapleStory』に関連するコンテンツのデータ・画像等の著作権は、全て株式会社ネクソンおよび韓国NEXON社に帰属します</p>
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
