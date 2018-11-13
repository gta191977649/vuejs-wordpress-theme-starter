<template>
    <div class="note-status">
          <ul>
              <li v-for="(cat,idx) in post._embedded['wp:term'][0]" :key="idx"><font-awesome-icon icon="tag"/> <router-link :to="'/category/'+cat.slug">{{cat.name}}</router-link></li>
              <li><font-awesome-icon icon="comments"/> <router-link :to="'/archives/'+post.slug">{{post.replies ? post.replies.length : 0}}</router-link></li>
          </ul>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTag } from '@fortawesome/free-solid-svg-icons'
import { faComments } from '@fortawesome/free-solid-svg-icons'
export default {
    props:['post'],
    beforeMount(){
        library.add(faTag,faComments)
    }
}
</script>

<style>

</style>
