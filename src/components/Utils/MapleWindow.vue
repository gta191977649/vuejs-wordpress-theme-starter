<template>
    <div class="maple-ui-window">
    <div class="maple-ui-window-header"> 
        {{title}}
    </div>
    <div class="maple-ui-window-content" v-html="content">
    </div>
    <div class="maple-ui-controlwrapper">
        <button class="btn btn-ui-primary" v-on:click="btnClick">一生懸命読み込み中...</button>
    </div>
  </div>
</template>

<script>
export default {
    props:["title","content"]
}
</script>

<style>

</style>
