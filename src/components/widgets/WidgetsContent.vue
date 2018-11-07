<template>
    <div class="widget-content-wrapper">
        <div class="widget" v-for="(widget,idx) in allWidgets" :key="idx" v-if="allWidgets.length">
            <widget-item  :widget="widget"/>
        </div>
    </div>
</template>

<script>
import WidgetItem from './WidgetItem'
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            allWidgets: 'allWidgets',
            widgetsLoaded: 'widgetsLoaded'
        }),
    },

    components: {
        WidgetItem
    },
    mounted() {
       

    }
}
</script>

<style>

</style>
