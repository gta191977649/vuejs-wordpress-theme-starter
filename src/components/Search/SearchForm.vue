<template>
        <div class="search">
        <form v-on:submit.prevent="submit">
            <input name="keyword" v-model="keyword"/>
            <button class="btn-primary" type="submit">検索</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            keyword:null,
        }
    },
    methods:{
        submit() {
            this.$router.push({ name: 'Search', params: { keyword: this.keyword }})
        }
    }
};
</script>

<style>
</style>

