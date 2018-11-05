<template>
    <div class="widget-area">
        <nav-menu/>
        <!-- Widgets -->
        <div class="widget" v-for="(widget,idx) in widgets" :key="idx">
            <div class="widget-body">
                <div class="widget-content">
                    <!--<h1>{{widget.name}}</h1> -->
                    <div v-html="widget.rendered"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import NavMenu from './NavMenu';
import { mapGetters } from 'vuex';

export default {
    mounted() {
    
    },
    components: {
        NavMenu
    },
    computed: {
        ...mapGetters({
            widgets: 'widgets'
        }),
    }

}
</script>
