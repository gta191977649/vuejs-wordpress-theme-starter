<template>
    <div class="widget-area">
        <nav-menu/>
        <!-- Widgets -->
        <div class="widget" v-for="(widget,idx) in widgets" :key="idx" v-if="widgetsLoaded && widgets.length">
            <widget-item :widget="widget"/>
        </div>
    </div>
</template>
<script>
import NavMenu from './NavMenu';
import WidgetItem from './WidgetItem'
import { mapGetters } from 'vuex';

export default {
    mounted() {
    
    },
    components: {
        NavMenu,
        WidgetItem
    },
    computed: {
        ...mapGetters({
            widgets: 'allWidgets',
            widgetsLoaded: 'widgetsLoaded'
        }),
    }

}
</script>
