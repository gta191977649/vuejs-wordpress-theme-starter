<template>

  <div class="maple-ui-window" style="margin-top:50px;">
    <div class="maple-ui-window-header">
        少女祈祷中 (Now loading) ...
      
    </div>

    <div class="maple-ui-window-content">
      <div class="maple-ui-loading-img"></div>
    </div>
    <div class="maple-ui-controlwrapper">
        <button class="btn btn-ui-primary">読み込み中...</button>
    </div>
  </div>
  
</template>
<script>
import MapleWindow from '../Utils/MapleWindow'
export default {
  components:{
    MapleWindow,
  }
}
</script>
