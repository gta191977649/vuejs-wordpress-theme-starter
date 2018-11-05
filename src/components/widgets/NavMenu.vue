<template>
    <!-- 导航 -->
    <nav>
        <div class="nav-menu-left">
            <div class="title">導航</div>
            <ul>
                <li v-for="item in navmenu" :key="item.id"><a :href="handleLinkUri(item.object,item.url)">{{item.title}}</a></li>
                <li>
                    <a href="#">清单</a>
                    <ul>
                        <li><a href="#">开坑一览</a></li>
                        <li><a href="#">课程记录</a></li>
                        <li><a href="#">其他</a></li>
                    </ul>
                </li>         
            </ul>
            
        </div>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            navmenu: 'navmenu',
            loaded: 'loaded'
        })
    },
    methods: {
        handleLinkUri(objecType,url) { //处理页面URI
            if(objecType === 'page') { //当是个页面
                alert(url.match('[^/]+(?=\/$|$)'));
                return "#"
            }
        }
    }
}
</script>

<style>

</style>
