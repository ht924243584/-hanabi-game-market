<template>
	  <el-header>
	    <el-row class="public">
        <el-col :span="2">
          <p @click="index()" style="line-height: 70px;z-index: ; cursor: pointer;" class="left"><img src="../assets/imgs/logo.png" /></p>
	      </el-col>
          <el-col :span="10">
              <el-menu
                  class="el-menu-demo"
                  mode="horizontal"
                  text-color="#fff"
                  :default-active="rtindex"
                  active-text-color="#ffd04b">
                <el-menu-item index="1" @click="index()">首页</el-menu-item>
                <el-menu-item index="2" @click="inventory()">饰品市场</el-menu-item>
              </el-menu>
	        </el-col>
	        <el-col :span="12">
	          <ul v-if="islog" class="menu_right right">
	            <li @click="mysell()">我的库存</li>
	            <li @click="mysale()">我的出售</li>
	            <li @click="mybuy()">我的求购</li>
	            <li>
	              <img class="img_log" :src="log_img">
                <span>{{selectvalue}}</span>
	           </li>
	            <li @click="message()" style="max-width: 50px;"><div ><i class="el-icon-message"></i></div></li>
	            <li @click="myInfo()" style="position: relative;" @mousemove="userinfoshow()" @mouseout="userinfohide()">
              <ul>
                <li class="left" sty>
                  <img style="border-radius: 50%;" height="15px" width="15px":src="userinfo.avatar" />
                  </li>
                <li @mousemove="userinfoshow()" @mouseout="userinfohide()" class="left" style="position: relative;">
                  <p>{{userinfo.username}}</p>
                  <div class="user_info" style="display: none;">
                    <div class="user_info_top" align="left">
                      <div
                        style="display: inline-block; overflow: hidden; border-radius: 50%; height: 40px;width: 40px;">
                        <img height="100%" width="100%" :src="userinfo.avatar" />
                      </div>
                      <div style="display: inline-block;">
                        <p style="">{{userinfo.username}}</p>
                        <p>
                          <a href="" style="color: #1E90FF;" @click="logout()">注销</a>
                        </p>
                      </div>
                    </div>
                    <div class="user_info_bottom">
                      <p>余额 <span class="f_Strong">¥ <span>{{userinfo.balance}}</span></span></p>
                      <div>
                        <el-button @click="chongzhi()" type="primary">充值</el-button>
                        <el-button @click="tixian()" type="warning">提现</el-button>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
	            </li>
	          </ul>
	          <ul v-if="!islog" class="right">
	            <li>
	              <img class="img_log" :src="log_img">
	              <span>{{selectvalue}}</span>
	            </li>
	            <li>
	              <p @click="dialogVisible = true">登录/注册</p>
	            </li>
	          </ul>
	        </el-col>
	    </el-row>

      <!-- 登录/注册 -->
	  <el-dialog
	    :visible.sync="dialogVisible"
	    width="400px">
      <h2 align="left">登录/注册</h2>
      <div v-if="!flag" class="log_item">
        <p @click="pwdlog()" style="cursor: pointer;" align="right"><i class="el-icon-s-goods"></i>使用密码登录</p>
        <p>
          <el-input
            placeholder="请输入手机号"
            v-model="phone"
            maxlength="11"
            clearable>
          </el-input>
        </p>
        <p style="position: relative;">
          <el-input v-if="show1" placeholder="向右滑动" v-model="input1">
              <div @mouseover="exit()" slot="prepend">
                <i class="el-icon-right"></i>
              </div>
            </el-input>
          <slide-verify style="position: absolute;z-index: 10;top: -180px;" v-show="ve1"  :l="42"
                         :r="10"
                         :w="350"
                         :h="155"
                         slider-text="向右滑动"
                         @success="onSuccess"
                         @fail="onFail"
                         @refresh="onRefresh"
                         ></slide-verify>
        </p>

        <p>
          <el-input  placeholder="请输入验证码" v-model="code">
              <template slot="append">
                <span style="cursor: pointer;" v-show="show" @click="getCode($event)">获取验证码</span>
                <span v-show="!show" class="count">{{count}} s</span>
                <!-- <el-button @click="getCode($event)" >获取验证码</el-button> -->
              </template>
          </el-input>
        </p>
        <p>
          <el-button v-if="!checked2" @click="nocurrency()" type="info">登录/注册</el-button>
          <el-button v-if="checked2" type="primary" @click="login2()">登录/注册</el-button>
        </p>
      </div>
      <div v-if="flag" class="log_item">
        <p @click="phlog()" style="cursor: pointer;" align="right"><i class="el-icon-s-comment"></i>短信快捷登录</p>
        <p>
          <el-input
            placeholder="请输入手机号"
            v-model="phone"
            maxlength="11"
            clearable>
          </el-input>
        </p>
        <p style="position: relative;">
          <el-input v-if="show2" placeholder="向右滑动" v-model="input1">
              <div @mouseover="exit1()" slot="prepend">
                <i class="el-icon-right"></i>
              </div>
            </el-input>
          <slide-verify style="position: absolute;z-index: 10;top: -180px;" v-show="ve2"  :l="42"
                         :r="10"
                         :w="350"
                         :h="155"
                         slider-text="向右滑动"
                         @success="onSuccess1"
                         @fail="onFail1"
                         @refresh="onRefresh"
                         ></slide-verify>
        </p>
        <p>
          <el-input
            placeholder="请输入密码"
            v-model="pwd"
            show-password>
          </el-input>
        </p>
        <p>
          <el-button v-if="!checked2" @click="nocurrency()" type="info">登录</el-button>
          <el-button v-if="checked2" type="primary" @click="login()">登录</el-button>
        </p>
      </div>

      <p  align="left" v-if="isempty" style="color: red; margin-left:10px;">{{content}}</p>

      <p style="margin-left: 40px;" align="left">
        <el-checkbox v-model="checked1">10天内免登录</el-checkbox>
        <el-checkbox v-model="checked2">我同意<用户协议>和<隐私政策></el-checkbox>
      </p>


    </el-dialog>
    </el-header>
</template>

<script>
  import data from './homedata.vue'
  export default{
    mounted() {
      // localStorage.setItem("currIndex","")
      // let userPhone=sessionStorage.getItem("userPhone")
      let userPhone=this.getCookie("session")
      if(userPhone==null){

      }else{
        this.$axios.get("http://localhost:8080/ums-user/isLog",{
          headers:{
            // token:sessionStorage.getItem("userPhone")
            token:this.getCookie("session")
          }
        }).then(response => {
            let result = response.data;
            if (result.code == 200) {
              this.islog = true;
              this.userinfo  = result.data;
              sessionStorage.setItem("uid",this.userinfo.id)
            }
            if(result.code==401){
              this.$message({
                        message: result.message,
                        type: 'erorr',
                        duration:1000,
                        offset:200
                      });
            }
        })
      }
    }
    ,
    data(){
      return{
        input1:'',
        show1:true,
        show2:true,
        ve1:false,
        ve2:false,
        flag1:false,
        flag2:false,
        ve:false,
        content:'',
        isempty:false,
        show: true,
        count: '',
        timer: null,
        selectvalue: 'CS:GO',
        dialogVisible: false,
        phone:'',
        code:null,
        checked1:false,
        checked2:false,
        pwd:'',
        flag:false,
        log_img:require('@/assets/imgs/logo_csgo_black.png'),
        islog:false,
        logval:null,
        userinfo:'',
        rtindex:localStorage.getItem("currIndex","1")
      }
    },
    methods:{

      chongzhi(){
        this.$router.push("/MyInfo/Wallet/Recharge")
      }
      ,
      tixian(){
        this.$router.push("/MyInfo/Wallet/Withdrawal")
      }
      ,
      exit(){
        this.show1=false
        this.ve1=true
      },
      exit1(){
        this.show2=false
        this.ve2=true
      }
      ,
      onSuccess(){
        this.$message({
                  message: '滑块验证成功',
                  type: 'success',
                  duration:1000,
                  offset:200
                });
        this.show1=false
        this.ve1=false
        this.flag1=true
      },
      onSuccess1(){
        this.$message({
                  message: '滑块验证成功',
                  type: 'success',
                  duration:1000,
                  offset:200
                });
        this.show1=false
        this.ve2=false
        this.flag2=true
      },
      onFail(){
        this.$message({
                  message: '滑块验证失败请重新验证!',
                  type: 'error',
                  duration:1000,
                  offset:200
                });
      },
      onFail1(){
        this.$message({
                  message: '滑块验证失败请重新验证!',
                  type: 'error',
                  duration:1000,
                  offset:200
                });
      },
      onRefresh(){
        // this.ve=false
      }
      ,
      logdata(){
        if(!this.checked1){
        }else{
          this.logval=10;
        }
      },
      userinfoshow:function(){
        $(".user_info").show();
      },
      userinfohide:function(){
        $(".user_info").hide();
      },
      inventory:function(){
        localStorage.setItem("currIndex","2")
        // console.log(this.rtindex)
        this.$router.push({path:"/Market"});
      },
      index:function(){
        localStorage.setItem("currIndex","1")
        // console.log(this.rtindex)
        this.$router.push({path:"/index",query:{"game":"csgo"}});
      },
      pwdlog(){
        $(".slide-verify-refresh-icon").click()
        this.show1=true
        this.show2=true
        this.ve1=false
        this.ve2=false
        this.flag1=false
        this.flag2=false
        this.flag=true
      },
      phlog(){
        $(".slide-verify-refresh-icon").click()
        this.show1=true
        this.show2=true
        this.ve1=false
        this.ve2=false
        this.flag1=false
        this.flag2=false
        this.flag=false
      },
      myInfo(){
        localStorage.setItem("currIndex","")
        this.$router.push({path:"/MyInfo/Wallet/Recharge"});
      },
      mybuy(){
        localStorage.setItem("currIndex","")
        this.$router.push({path:"/MyBuying/BuyingNow"});
      },
      mysell(){
        localStorage.setItem("currIndex","")
        this.$router.push({path:"/inventory/insTock"});
      },
      mysale(){
        localStorage.setItem("currIndex","")
        this.$router.push({path:"/Mysale/onsale"});
      },
      message(){
        localStorage.setItem("currIndex","")
        this.$router.push({path:"/MyInfo/MessageCenter/Transaction"});
      },
      handleClose() {
        // $(".el-dialog").hide()
        $(".v-modal").toggle()
      },
      nocurrency(){
        this.$message({
                  message: '请同意用户协议和隐私政策',
                  type: 'error',
                  duration:1500,
                  offset:300
                });
      },
      checkPhone(data) {
        if (/^1[3|4|5|7|8][0-9]{9}$/.test(data)) {
          return true;
        }
        return false;
      },
      checkLogin() {
        var phone = this.phone;
        if (this.checkPhone(phone)) {
          return true
        } else {
          this.$message({
                    message: '手机号错误!',
                    type: 'error',
                    duration:1500,
                    offset:200
                  });
        }
        return false
      },
      login(){//账号密码登录
        this.logdata()
        if(this.phone==""||this.phone==null){
          this.$message({
                    message: "请输入手机号",
                    type: 'error',
                    duration:1000,
                    offset:200
                  });
        }else if(!this.flag2){
          this.$message({
                    message: "滑块未验证",
                    type: 'error',
                    duration:1000,
                    offset:200
                  });
        }else if(this.pwd==""||this.pwd==null){
          this.$message({
                    message: "请输入密码",
                    type: 'error',
                    duration:1000,
                    offset:200
                  });
        }else{
          this.isempty=false;
          this.content=""
          if (this.checkLogin()) {
            this.$axios.get("http://localhost:8080/ums-user/userlogin", {
              params: {
                phone: this.phone,
                pwd: this.pwd
              }
            }).
            then(response => {
              let result = response.data;
              if (result.code == 200) {
                 this.dialogVisible=false
                this.islog = true;
                this.userinfo  = result.data;
                sessionStorage.setItem("uid",this.userinfo.id)
                if(this.logval!=null){
                  this.setCookie("session",result.data.phone,"d10");
                }
                this.setCookie("session",result.data.phone,"d1");
              }
              if(result.code == 201){
                this.$message({
                          message: result.message,
                          type: 'error',
                          duration:1500,
                          offset:200
                        });
              }
              if(result.code == 0){
                this.$message({
                          message: result.message,
                          type: 'error',
                          duration:1500,
                          offset:200
                        });
              }
              if(result.code == 401){
                this.$message({
                          message: result.message,
                          type: 'error',
                          duration:1500,
                          offset:200
                        });
              }

            })
          }
        }
      },
      login2(){//验证码登录
        this.logdata()
        if(this.phone==""||this.phone==null){
          this.$message({
                    message: "请输入手机号",
                    type: 'error',
                    duration:1000,
                    offset:200
                  });
        }else if(!this.flag1){
          this.$message({
                    message: "滑块未验证",
                    type: 'error',
                    duration:1000,
                    offset:200
                  });
        }else if(this.code==""||this.code==null){
          this.$message({
                    message: "请输入验证码",
                    type: 'error',
                    duration:1000,
                    offset:200
                  });
        }else{
          this.isempty=false;
          this.content=""
          if (this.checkLogin()) {
            this.$axios.get("http://localhost:8080/ums-user/userlogin", {
              params: {
                phone: this.phone,
                code: this.code
              }
            }).
            then(response => {
              let result = response.data;
              if (result.code == 200) {
                this.dialogVisible=false
                this.islog = true;
                this.userinfo  = result.data;
                sessionStorage.setItem("uid",this.userinfo.id)
                if(this.logval!=null){
                  this.setCookie("session",result.data.phone,"d10");
                }
                this.setCookie("session",result.data.phone,"d1");
              }
              if(result.code == 202){
                this.$message({
                          message: result.message,
                          type: 'error',
                          duration:1500,
                          offset:200
                        });
              }
              if(result.code == 401){
                this.$message({
                          message: result.message,
                          type: 'error',
                          duration:1500,
                          offset:200
                        });
              }

            })
          }
        }

      },
      getCode: function(event) {
        $(event.target).text("重新获取")
        const TIME_COUNT = 60;
        if(!this.checkLogin()){

        }else{
          if (!this.timer) {
            this.count = TIME_COUNT;
            this.show = false;
            this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
             } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
             }
            }, 1000)
           }
        }
        if (this.checkLogin()) {
          this.$axios.get("http://localhost:8080/ums-user/sendCode", {
              params: {
                phone: this.phone
              }
            })
            .then(response => {
              let info = response.data;
            })
        }
          //手机号在前台验证成功后，发送手机号到后台，由后台发送短信验证码到用户手机
      },
      logout(){
        sessionStorage.removeItem("uid");
        this.delCookie("session")
        // location.reload()
      },
      //读取cookies
      getCookie(name)
      {
          var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

          if(arr=document.cookie.match(reg))

              return unescape(arr[2]);
          else
              return null;
      },
      //写
      setCookie(name,value,time)
      {
          var strsec = this.getsec(time);
          var exp = new Date();
          exp.setTime(exp.getTime() + strsec*1);
          // document.cookie.setPath("/")
          document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+";path=/";
      },
      //删除cookie
      delCookie(name)
      {
          var exp = new Date();
          exp.setTime(exp.getTime() - 1);
          var cval=this.getCookie(name);
          if(cval!=null){
            // this.getCookie(name,cval,-1)
            document.cookie= name + "="+cval+";expires="+exp.toGMTString()+";path=/";
          }
      },
       getsec(str){

         var str1=str.substring(1,str.length)*1;
         var str2=str.substring(0,1);
         if (str2=="s")
         {
              return str1*1000;
         }
         else if (str2=="h")
         {
             return str1*60*60*1000;
         }
         else if (str2=="d")
         {
             return str1*24*60*60*1000;
         }
      }
    }
  }
</script>

<style scoped>
  #slideVerify>canvas{
    display: none;
  }
  .el-input__inner{
    color: #000000;
  }
  p>.el-checkbox{
    padding: 5px;
  }
  p>.el-button{
    width: 98%;
  }
  .el-input__inner{
    color: #000000;
  }
  .log_item>*{
    padding:15px 1%;
  }
  h2{
    color: #666666;
    font-weight: 500;
  }
</style>
