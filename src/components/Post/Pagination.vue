<template>
    <div class="pagination-wrapper">
        <div class="pager">
            <ol>
                <li class="prev">
                    <a v-on:click="$emit('pre')">前へ</a>
                </li>
                    <!--
                    <li><a v-on:click="$emit('to',1)">1</a></li>
                    <li><a v-on:click="$emit('to',2)">2</a></li>
                    -->
                <li class="next">
                    <a v-on:click="$emit('next')">次へ</a>
                </li>
            </ol>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
