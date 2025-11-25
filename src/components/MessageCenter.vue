<template>
  <div>
    <div class="messageInfo">
      <div class="tabs">
        <el-tabs v-model="activeName" @tab-click="messageClick(activeName)">
          <el-tab-pane label="交易消息" name="first"></el-tab-pane>
          <el-tab-pane label="系统消息" name="second"></el-tab-pane>
          <router-view></router-view>
        </el-tabs>
      </div>
    </div>

  </div>
</template>

<script>

  export default {
    data() {
      return {
        activeName:"first",
      };
    },
    methods: {
      messageClick(tab, event) {
        this.activeName=tab;
        if( this.activeName=="second"){
           this.$router.push({path:"/MyInfo/MessageCenter/System"});
        }else{
           this.$router.push({path:"/MyInfo/MessageCenter/Transaction"});
        }

      }
    }
  }


</script>

<style>

  *{
     margin: 0px auto;
     padding: 0px;
     text-decoration: none;
  }
  .messageInfo{
    float: left;
  }
  .tabs {
    width: 940px;
    margin: 0 2%;
  }
  .el-tabs{
    margin: 0px auto;
  }
  #tab-first {
    color: rgb(144, 150, 156);
    padding-left: 0px;
    font-size: 14px;
    background: none;
  }
  table>tr>th{
    padding: 1% 0;
  }

</style>
