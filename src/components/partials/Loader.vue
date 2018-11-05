<template>

  <div class="maple-ui-window" style="margin-top:50px;">
    <div class="maple-ui-window-header">
        少女祈祷中 (Now loading) ...
        <div class="maple-ui-win-control">
            <a href="#" class="btn-ui-disabled float-right">X</a>
        </div>
    </div>

    <div class="maple-ui-window-content">
      <div class="maple-ui-loading-img"></div>
    </div>
    <div class="maple-ui-controlwrapper">
        <button class="btn btn-ui-primary" v-on:click="btnClick">一生懸命読み込み中...</button>
    </div>
  </div>
</template>
<script>
export default {
  methods:{
    btnClick() {
      alert("少しお待ちくださいね~")
    }
  }
}
</script>
