<template>
  <div>
    <div class="data public">
      <div class="content">
        <div class="userSetting">
          <h3>基本设置</h3>
          <table class="listTb" width="100%">
            <tbody>
              <tr>
                <td class="leftTd">头像</td>
                <td class="leftTd">
                    <img :src="tx" width="46px" height="46px" style="border-radius: 50%;"/>
                </td>
                <td class="rightTd">
                  <el-button type="primary" @click="dialogVisible = true" size="mini" >修改头像</el-button>
                </td>
              </tr>
              <!-- 头像上传 -->
              <el-dialog
                :visible.sync="dialogVisible"
                width="30%">
                <span>头像上传</span>
                <el-upload
                  class="avatar-uploader"
                  action="http://localhost:8080/ums-user/file"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img ref="imgFile" v-if="imageUrl" :src="imageUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="submitUpload()">确 定</el-button>
                </span>
              </el-dialog>
              <tr>
                <td class="leftTd">昵称</td>
                <td class="leftTd">
                  <span class="userName"></span>
                  <span class="updateUserName" style="display: none;">
                    <input type="text" size="20" id="inputName" v-model="name" @blur="Verify_nicknames()"/><span class="a">{{exits}}</span>
                    <div class="tips">
                      昵称必须为包含数字、英文、中文在内的4-14个字符，三个月内只能修改一次。
                      <br>
                      <strong>(请勿带有辱骂、广告、诱导等其他违反法规的词汇，违者帐号将作封禁处理)</strong>
                    </div>
                  </span>
                </td>
                <td class="rightTd">
                  <div class="updateNameShow">
                    <el-button type="primary" size="mini" @click="showInput()">修改昵称</el-button>
                  </div>
                  <div class="okOrCancel" style="display: none;">
                    <el-button type="primary" size="mini" @click="showInput()">取消</el-button>
                    <el-button type="primary" size="mini" @click="showInput(1)">确定</el-button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="blank20"></div>
          <div class="blank20"></div>
          <h3>安全设置</h3>
          <table class="listTb" width="100%">
            <tbody>
              <tr>
                <td class="leftTd">手机账号</td>
                <td class="leftTd">
                  <span style="color:limegreen;">
                    <i class="el-icon-check" style="color:limegreen;"></i>
                    已绑定
                  </span>
                  <span>
                    绑定手机号<span>:此处绑定手机号</span>
                  </span>
                </td>

              </tr>
              <tr>
                <td class="leftTd">密码设置</td>
                <td class="leftTd">
                  <input type="password" class="userPwd" disabled="" style="border: solid 0px; background-color: white;"/>

                  <span class="updateUserPwd" style="display: none;">
                    <input type="text" size="20" id="inputPwd" v-model="pwd"/>
                  </span>
                </td>
                <td class="rightTd">
                  <div class="updatePwdShow">
                    <el-button type="primary" size="mini" @click="showPwd()">修改密码</el-button>
                  </div>
                  <div class="okOrCancelPwd" style="display: none;">
                    <el-button type="primary" size="mini" @click="showPwd()">取消</el-button>
                    <el-button type="primary" size="mini" @click="showPwd(1)">确定</el-button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="blank20"></div>
          <div class="blank20"></div>
          <h3>偏好设置</h3>
          <table class="listTb" width="100%">
            <tbody>
              <tr>
                <td class="leftTd">还价设置</td>
                <td class="leftTd">
                  <p>
                    <input type="radio" checked="checked"/>
                     允许买家还价
                  </p>
                </td>
              </tr>
              <tr>
                <td class="leftTd">收款设置</td>
                <td class="leftTd">
                  <p>
                    <input type="radio" checked="checked"/>
                     允许买家支付宝付款
                  </p>
                </td>
              </tr>
              <tr>
                <td class="leftTd">显示货币</td>
                <td class="leftTd">
                  <p>
                    <input type="radio" checked="checked"/>
                     人名币
                     <span>(交易使用人民币结算)</span>
                  </p>
                </td>
              </tr>
              <tr>
                <td class="leftTd">库存估值</td>
                <td class="leftTd">
                  <p>
                    <input type="radio" checked="checked"/>
                     Buff参考价
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
   export default{
     data(){
       return{
         imageUrl: '',
         userinfo:'',
         dialogVisible:false,
         name:"",
         pwd:"123456",
         exits:"",
         code:"",
         tx:"",
       }
     },
     methods:{
       submitUpload() {
         this.dialogVisible=false
         location.reload()
       }
       ,
       handleAvatarSuccess(res, file) {
               this.imageUrl = URL.createObjectURL(file.raw);
             },
             beforeAvatarUpload(file) {
               let isJPG = file.type === 'image/jpeg';
               let isJPG1 = file.type === 'image/png';
               if(isJPG1){
                 isJPG=true
               }
               const isLt2M = file.size / 1024 / 1024 < 2;

               if (!isJPG) {
                 this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
               }
               if (!isLt2M) {
                 this.$message.error('上传头像图片大小不能超过 2MB!');
               }
               return isJPG && isLt2M;
             }
       ,
       showInput(index){
         if(index==1){
           $(".userName").toggle();
           $(".updateUserName").toggle();
           $(".updateNameShow").toggle();
           $(".okOrCancel").toggle();
           this.name=$("#inputName").val();
           $(".userName").text(this.name);
           if(this.name==null||this.name==""){
              this.load();
           }else{
            if(this.code==500){
              this.load();
            }else{
             this.$axios.get('http://localhost:8080/ums-user/updateNickname', {
                          params: {
                            id:sessionStorage.getItem("uid"),
                            username: this.name
                          }
                        })
                        .then(response => {
                          this.name=response.data.data
                          console.log(response)
                          this.load();
                          location.reload()
                        })
                        .catch(function(error) {
                          console.log(error)
                        })


            }
          }
         }else{
           $(".userName").text(this.name);
           $(".userName").toggle();
           $(".updateUserName").toggle();
           $(".updateNameShow").toggle();
           $(".okOrCancel").toggle();

         }
       },
       showPwd(index){
        if(index==1){
          $(".userPwd").toggle();
          $(".updateUserPwd").toggle();
          $(".updatePwdShow").toggle();
          $(".okOrCancelPwd").toggle();
          this.pwd=$("#inputPwd").val();
          $(".userPwd").text(this.pwd);
          if(this.pwd==null||this.pwd==""){
           this.load();
          }
          else{
            this.$axios.get('http://localhost:8080/ums-user/updatepassword', {
              params: {
                id:sessionStorage.getItem("uid"),
                password: this.pwd
              }
            })
            .then(response => {
              this.load();
              var exp = new Date();
              exp.setTime(exp.getTime() - 1);
              let name="session";
              var cval=this.getCookie(name);
              if(cval!=null){
                document.cookie= name + "="+cval+";expires="+exp.toGMTString();
              }
              location.reload()
              this.$message({
                        message: '修改成功!',
                        type: 'success',
                        duration:1500,
                        offset:200
              });

            })
            .catch(function(error) {
              console.log(error)
            })
          }
        }else{
          $(".userPwd").text(this.pwd);
          $(".userPwd").toggle();
          $(".updateUserPwd").toggle();
          $(".updatePwdShow").toggle();
          $(".okOrCancelPwd").toggle();
        }
       },
       getCookie(name)
       {
           var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");

           if(arr=document.cookie.match(reg))

               return unescape(arr[2]);
           else
               return null;
       }
       ,
       Verify_nicknames(){
         if(this.name==""||this.name==null){
          $(".a").html("不能为空")
         }else{
           this.$axios.get('http://localhost:8080/ums-user/exits', {
             params: {
               username: this.name
             }
           })
           .then(response => {
               this.code=response.data.code;
               if( this.code==200){
                 $(".a").html("昵称可以使用")
               }else{
                  $(".a").html("昵称已经存在")
               }
               this.exits=response.data.message
             console.log(response)

           })
           .catch(function(error) {
             console.log(error)
           })
         }

       },
       load(){
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
                 $(".userName").text(result.data.username);
                 this.userinfo=result.data
                 this.name=result.data.username
                 this.pwd=result.data.password
                 this.tx=result.data.avatar
                 sessionStorage.setItem("uid",this.userinfo.id)
               }
           })
         }
         // this.$axios.get('http://localhost:8080/ums-user/loadinguser', {
         //                           params: {
         //                             id:sessionStorage.getItem("uid"),
         //                           }
         //                         })
         //                         .then(response => {
         //                             $(".userName").text(response.data.username);
         //                             this.name=response.data.username
         //                             this.pwd=response.data.password
         //                             this.tx=response.data.avatar
         //                           console.log(response)

         //                         })
         //                         .catch(function(error) {
         //                           console.log(error)
         //                         })
       }
     },
     /* 加载事件*/
      mounted(){
        this.load()
        $(".userPwd").val(this.pwd);

      }
   }


</script>

<style >
  .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  * {
    margin: 0px auto;
    padding: 0px;
    text-decoration: none;
  }
  .userSetting{
    margin: 0 2%;
    background-color: white;
    min-width: 860px;
    min-height: 600px;
    float: left;
    padding: 2%;
  }
  .blank20{
    height: 20px;
    overflow: hidden;
    font-size: 0;
    line-height: 0;
  }
  .userSetting>h3{
    font-size: 14px;
    font-weight: bolder;
  }
  .listTb{
    margin: 0 2%;
  }
  .listTb>tbody>tr>td{
    height: 50px;
    border-bottom: 1px solid #E9E9E9;
  }
  .listTb>tbody>tr>td:first-of-type{
    width: 120px;
  }
  .leftTd{
    text-align: left;
    font-size: 14px;
    color: #959595;
  }
  .rightTd{
    text-align: right;
  }
  .tips{
    font-size: 12px;
  }
  .updateUserName>input,.updateUserPwd>input{
    margin:1% 0;
    height: 20px;
  }
  .updateUserName{
    line-height: 16px;
  }
</style>
