<template>

    <div class="note">
        <div class="note-info"><strong>By:</strong> {{post._embedded.author[0].name}} <strong>日付：</strong>{{post.date}} </div>
        <div class="note-title">
            <router-link :to="'/archives/'+post.slug"><h1>{{ post.title.rendered }}</h1></router-link>
        </div>
        <hr/>
        <div v-html="post.excerpt.rendered"></div>
    </div>

</template>

<script>
export default {
    props: ["post"]
}
</script>

<style>
  .note{
    margin-top:50px;
  }
</style>
