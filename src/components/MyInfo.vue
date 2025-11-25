<template>
  <div>
    <el-container class="is-vertical" :style="{backgroundImage: 'url(' +headerurl+ ')'} ">
      <hpheader></hpheader>
      <div class="data public">
        <div class="content">
          <div class="userInfo">
            <div class="my-thum">
              <img :src="Show.avatar" height="50px" width="50px"   style="border-radius: 50%;"/>
              <h2>{{Show.username}}</h2>
            </div>
            <div class="my-menu">
              <ul id="menuInfo">
                <li>
                  <a href="/MyInfo/Wallet/Recharge"><i class="el-icon-wallet"></i>&nbsp;&nbsp;我的钱包</a>
                </li>
                <li>
                  <a href="/MyInfo/AccountSetting"><i class="el-icon-setting"></i>&nbsp;&nbsp;账号设置</a>
                </li>
                <li>
                  <a href="/MyInfo/MessageCenter/Transaction"><i class="el-icon-message"></i>&nbsp;&nbsp;消息中心</a>
                </li>
                <li>
                  <a href="/MyInfo/MyCollection"><i class="el-icon-star-off"></i>&nbsp;&nbsp;我的收藏</a>
                </li>
                <li>
                  <a href="/MyInfo/CustomerService"><i class="el-icon-s-comment"></i>&nbsp;&nbsp;联系客服</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="allShow">
            <router-view></router-view>
          </div>
        </div>



      </div>
    </el-container>
    <hpnav></hpnav>
    <hpfooter></hpfooter>
  </div>
</template>

<script>
  import hpheader from './header.vue'
  import hpnav from './nav.vue'
  import hpfooter from './footer.vue'

  export default {
    data(){
      return{
        Show:"",
         headerurl:require("../assets/imgs/header-bg_csgo.jpg")
      }
    },mounted() {
      this.$axios.get('http://localhost:8080/ums-user/loadinguser', {
            params: {
              id: sessionStorage.getItem("uid"),
            }
          })
          .then(response => {
            this.Show = response.data;
          })
          .catch(function(error) {
            console.log(error)
          })
    }
    ,
    components: {
      hpheader,
      hpnav,
      hpfooter
    }
  }
</script>

<style scoped>
  * {
    margin: 0px auto;
    padding: 0px;
    text-decoration: none;
  }
  .userInfo {
    width: 240px;
    float: left;
    color: white;
    background-color:rgb(24,28,35);
  }
  #menuInfo{
    margin: 0 30%;
    text-align: center;
  }
  #menuInfo li{
    float: none;
    display: block;
    line-height: 55px;
    font-size: 16px;
  }
  .my-thum{
    margin: 10%;
  }
  .my-thum img{
    width: 70px;
    height: 70px;
  }
  .my-thum h2{
    font-size: 19px;
    color: white;
    margin: 10%;
  }
  .my-menu{
    margin:15% 0;
  }
  .my-menu ul li a{
    color: white;
    text-decoration: none;
  }
</style>
