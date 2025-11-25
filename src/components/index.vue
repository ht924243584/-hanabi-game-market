<template>
  <div>
    <el-container class="is-vertical">
      <hpheader></hpheader>
      <lbt></lbt>
    </el-container>
    <hpdata></hpdata>
    <hpnav></hpnav>
    <hpfooter></hpfooter>
  </div>
</template>

<script>
  import hpheader from './header.vue'
  import lbt from './lbt.vue'
  import hpdata from './homedata.vue'
  import hpnav from './nav.vue'
  import hpfooter from './footer.vue'

  export default{
    components:{
      hpheader,
      lbt,
      hpdata,
      hpnav,
      hpfooter
    }
  }
</script>

<style scoped="">
</style>
