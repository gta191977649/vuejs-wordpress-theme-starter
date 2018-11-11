<template>
    <transition name="alert">
    <div class="mask" v-if="showAlert">
        <div class="alert alert-primary">
            <div class="alert alert-content">
                {{content}}
            </div>
        </div>
    </div>
    </transition>
</template>

<script>
export default {
    props:['show','content'],
    mounted(){
        this.audio = new Audio(window.SETTINGS.UI_ALERT)
    },
    data(){
        return{
            showAlert:this.show,
            audio:null,
        }
    },
    methods:{
        hide() {
            this.showAlert = false
            this.$emit("onTimeout",false)
        }
    },
    watch:{
        show(newVal) {
           if(newVal !== this.showAlert)
                this.showAlert = newVal
        },
        showAlert(val) {
            if(val) {
                this.audio.play()
                setTimeout(this.hide, 5000)
            }
        }
    }
}
</script>

<style scoped>
    .mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100px;
        display: table;
        transition: opacity .3s ease;
        margin-top: 30px;
    }
    .alert {
        width: 80%;
        margin-right: auto;
        margin-left: auto;
    }
    .alert-enter {
        opacity: 0;
    }

    .alert-leave-active {
        opacity: 0;
    }

    .alert-enter .alert-container,
    .alert-leave-active .alert-container {
        -webkit-transform: scale(1.1);
        transform: scale(1.1);
    }
</style>
