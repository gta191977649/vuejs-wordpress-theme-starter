<template>
    <div class="comments" >
        {{comments}}
    </div>
</template>

<script>
export default {
    data() {
        return {
            comments:false,
        }
    },
    mounted() {
        this.getComments(this.postid)
    },
    props: {
        postid:{
            required: true
        }
    },
   

    methods:{
        
        getComments: function(id)  {

            axios.get(window.SETTINGS.API_BASE_PATH + 'comments?post=' + id)
            .then(response => {
                this.comments = response.data[0];
                console.log(this.comments)
            })
            .catch(e => {
                console.log(e);
            })
        }
    }
}
</script>

<style>

</style>
