<template>
    <post-main limit="10"></post-main>
</template>

<script>
import RecentPostsWidget from './widgets/RecentPosts'
import PagesWidget from './widgets/Pages'
//博文主页面
import PostMain from './Post/PostMain'
export default {
    components: {
        RecentPostsWidget,
        PagesWidget,
        PostMain
    }
}
</script>

<style lang="scss">
    .jumbotron {
        margin-top: 5%;
    }
</style>