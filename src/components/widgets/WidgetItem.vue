<template>
    <div class="widget-body">
        <div class="widget-content">
            <!--<h1>{{widget.name}}</h1> -->
            <div v-html="widget.rendered"></div>
        </div>
    </div>
</template>

<script>
export default {
    props:['widget']
}
</script>

<style>

</style>
