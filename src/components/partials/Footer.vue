<template>
    <div class="footer-area">
        <div class="props"></div>
        <div class="grassy"></div> 
        <p>{{info.name}} {{ new Date().getFullYear() }} - Theme by Episodes <br/>Powered by Vue.js</p>
        
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
