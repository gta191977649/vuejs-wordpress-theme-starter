<template>
    <div class="widget-area">
        <nav-menu/>
        <!-- Widgets -->
        <widget-content/>
    </div>
</template>
<script>
import NavMenu from './NavMenu';
import WidgetContent from './WidgetsContent'
export default {
    mounted() {
        
    },
    components: {
        NavMenu,
        WidgetContent
    },
   

}
</script>
