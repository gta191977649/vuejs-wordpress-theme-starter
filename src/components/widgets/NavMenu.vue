<template>
    <!-- 导航 -->
    <nav>
        <div class="nav-menu-left">
            <div class="title">導航</div>
            <ul>
                <li v-for="item in getNavMenu(0)" :key="item.ID">
                    <a href="#" v-on:click="handleLinkUri(item.object,item.url)">{{item.title}}</a>
                    <!-- 便利继续查找属于该菜单的二级菜单 -->
    
                    <ul v-if="getNavMenu(item.ID)">
                        <li v-for="secondItem in getNavMenu(item.ID)" :key="secondItem.ID">
                            <a href="#" v-on:click="handleLinkUri(secondItem.object,secondItem.url)">{{secondItem.title}}</a>
                        </li>
                    </ul>
                </li>
                <!-- HTML样式模板 
                <li>
                    <a href="#">清单</a>
                    <ul>
                        <li><a href="#">开坑一览</a></li>
                        <li><a href="#">课程记录</a></li>
                        <li><a href="#">其他</a></li>
                    </ul>
                </li>        
                --> 
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
    mounted() {
        this.getNavMenu(0);
    },
    methods: {
        handleLinkUri(objecType,url) { //处理页面URI
            if(url) {
                switch(objecType) {
                    case 'custom': //外部链接
                        return window.location.href = url
                    case 'page': //页面指向
                        let urlPostfix = url.match('[^/]+(?=\/$|$)')
                        //console.log({name:'Page',params:{pageSlug:urlPostfix[0]}})
                        return this.$router.push({name:'Page',params:{pageSlug:urlPostfix[0]}})
                        
                }
            }
        },
        getNavMenu(parent) { //根据Parent查询菜单
            /*console.log("find ",parent)*/
            let menu = []
            this.navmenu.forEach(item => {
                if(item.menu_item_parent == parent) {
                    menu.push(item)
                }
            });
            return menu
        }
    }
}
</script>

<style>

</style>
