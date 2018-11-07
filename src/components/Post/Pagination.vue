<template>
    <div class="pagination-wrapper">
        <div class="pager">
            <ol>
                <li class="prev">
                    <a v-on:click="$emit('pre')">前へ</a>
                </li>
                    <li v-for="idx in parseInt(total)" :key="idx">
                        <a v-if="idx == current" class="current" v-on:click="$emit('to',idx)">{{idx}}</a>
                        <a v-else v-on:click="$emit('to',idx)">{{idx}}</a>
                    </li>                
                <li class="next">
                    <a v-on:click="$emit('next')">次へ</a>
                </li>
            </ol>
        </div>
    </div>
</template>

<script>
export default {
    props:["current","total"]
}
</script>

<style>

</style>
