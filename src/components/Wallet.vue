<template>
  <div>
      <div class="data public">
        <div class="content">
          <div class="showInfo">
            <div class="priceHeader">
              <div class="col">
                <div class="el-icon-coin"></div>
                <div class="info">
                  <div class="infoHed">
                    BUFF余额<a href="#">&nbsp;支付宝</a>
                  </div>
                  <div style="margin-left: 20px;" class="infoBot">
                    <strong> ￥{{Show.balance}}</strong>
                  </div>
                </div>
              </div>
              <div class="col">
                <div class="el-icon-bank-card"></div>
                <div class="info">
                  <div class="infoHed">
                    BUFF余额<a href="#">&nbsp;银行卡</a>
                  </div>
                  <div class="infoBot">
                    <strong>￥0</strong>
                  </div>
                </div>
              </div>
              <div class="col">
                <div></div>
                <div class="info">
                  <div class="infoHed">
                    锁定余额<a href="#">&nbsp;<i class="el-icon-money"></i></a>
                  </div>
                  <div class="infoBot">
                    <strong style="color: dodgerblue;">￥0</strong>
                  </div>
                </div>
              </div>
            </div>
            <div class="priceContent">
              <div class="tabs">
                <div class="capitalSelect" >
                  <!-- 未选中资金,则隐藏-->
                  <el-dropdown  v-if="selectbox==true">
                    <span class="el-dropdown-link">
                      {{Transaction}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>

                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item  divided><span @click="br('全部')">全部</span></el-dropdown-item>
                      <el-dropdown-item  divided><span @click="br('购买')">购买</span></el-dropdown-item>
                      <el-dropdown-item  divided><span @click="br('出售')">出售</span></el-dropdown-item>
                      <el-dropdown-item  divided><span @click="br('充值')">充值</span></el-dropdown-item>
                      <el-dropdown-item  divided><span @click="br('提现')">提现</span></el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>

                <el-tabs v-model="activeName" @tab-click="handleClick(activeName)">

                  <el-tab-pane label="充值" name="first">
                  </el-tab-pane>
                  <el-tab-pane label="提现" name="second">
                  </el-tab-pane>
                  <el-tab-pane label="资金流水" name="third">
                  </el-tab-pane>
                  <router-view></router-view>
                </el-tabs>

              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import hpheader from './header.vue'
  import hpnav from './nav.vue'
  import hpfooter from './footer.vue'

  export default {
    components: {
      hpheader,
      hpnav,
      hpfooter
    },
    data() {
      return {
        activeName:"first",
        selectbox:false,
        Transaction:'交易类型',
        Show:"",
      };
    },
    methods: {
      handleClick(tab, event) {
        this.activeName=tab;
        this.selectbox=false;
        if( this.activeName=="second"){
          this.$router.push({path:"/MyInfo/Wallet/Withdrawal"});
        }else if( this.activeName=="first"){
          this.$router.push({path:"/MyInfo/Wallet/Recharge"});
         }else{
           this.selectbox=true;
           this.$router.push({path:"/MyInfo/Wallet/Capital"});
         }
      },
      br(value){
         this.$router.push({path:"/MyInfo/Wallet/Capital",query:{"Transaction":value}});
      },
      changer_tc(){
        // alert(1)
      }

    },mounted() {
      this.$axios.get("http://localhost:8080/ums-user/loadinguser",{
              params: {
                id:sessionStorage.getItem("uid"),
              }
            })
      .then(response=>{
      this.Show=response.data
      }).catch(function(error){
        console.log(error);
      })
    }

      }




</script>

<style scoped>

  .el-dropdown-menu__item{
    text-align: center;
    padding: 0px 10px;
    width: 100px;
    margin: 0px 10px;
  }
  * {
    margin: 0px auto;
    padding: 0px;
    text-decoration: none;
  }
  .showInfo {
    float: left;
    margin: 0px auto;
  }

  .priceHeader {
    height: 90px;
    width: 940px;
    margin: 0 2%;
    background: url(../assets/imgs/user-header-bg.png)no-repeat;
  }

  strong {
    margin-left: -80%;
    color: orange;
    font-size: 17px;
  }

  .col {
    float: left;
    width: 200px;
    border-style: solid;
    border-width: 0 1px 0 0;
    margin: 2% 3%;
  }
  .infoHed{
    color: rgb(144, 150, 156);
  }
  .infoHed a {
    color: royalblue;
  }

  .info {
    font-size: 14px;
  }
  .el-dropdown-menu>li{
    float: none;
  }
  .col>div {
    display: inline-block;
  }

  .col>div:first-of-type {
    font-size: 45px;
  }

  .tabs {
    position: relative;
    width: 940px;
    margin: 0 2%;
  }

  #tab-first {
    color: rgb(144, 150, 156);
    padding-left: 0px;
    font-size: 14px;
    background: none;
  }

  .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
  }
  .el-icon-arrow-down {
      font-size: 12px;
  }
  .capitalSelect{
    width: 90px;
    display: inline-block;
    margin-left: 90%;
    position: absolute;
    right: 0;
    top: 2%;
    z-index: 10;
  }

</style>
