<template>
  <div id="whiteBck">
    <div class="firstPrice">
      提现金额
      <p>
         <el-input @change="changge()" type="text" placeholder="请输入支付宝提现金额" v-model="money" />
      </p>
    </div>
    <div class="secondPrice">
      收款账号
      <div class="alipayNumber" @click="numberhows()">
        <div class="selectNum">
          <i class="el-icon-bank-card"></i>
          <span class="selectAliPay">请选择支付宝账号</span>
          <i class="el-icon-arrow-down"></i>
        </div>
      </div>
      <div class="hideNum" @click="open()">
        <div>
          <i class="el-icon-circle-plus-outline"></i>
          <span>使用其他支付宝</span>
        </div>
      </div>
    </div>
    <!-- 服务费-->
    <div class="secondPrice">
      服务费
      <div class="serviceCharge"><h3>￥{{fuwufei}}</h3></div>
    </div>
    <div class="thirdPrice">
      <p>
        <el-button type="primary" id="blueBtn" @click="tixian()">确认提现</el-button>
      </p>
    </div>
    <div class="line"></div>
    <div class="payDesc">
      <ul class="alipay">
        <li>充值须知</li>
        <li>1.每日最多可提现3次；</li>
        <li>2.提现服务费1%,最低2元,向上取整；</li>
        <li>3.支付宝提现2小时内到账.</li>
      </ul>
    </div>
    <div class="line"></div>
    <div class="priceCount">
      <h3>提现记录</h3>
      <table width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr>
          <th>充值金额(元)</th>
          <th>手续费(元)</th>
          <th>收款账户</th>
          <th>进度</th>
          <th>创建时间</th>
        </tr>
      </table>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        fuwufei:0,
        money:0,
        zhanghao:"",
        balanceInfo:"",
        sum:0,
      };
    },
    methods: {
      changge(){
        if(/^\d+$/.test(this.money)){
          this.fuwufei= Math.ceil(this.money*0.01);
          this.sum=(parseInt(this.fuwufei))+(parseInt(this.money));
        }


      },
       open() {
         this.$prompt('支付宝账号', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           }).then(({ value }) => {
             $(".selectAliPay").text(value);
           this.zhanghao=value;
             }).catch(() => {
             });
        },
       numberhows(){
         $(".hideNum").toggle();
       },tixian(){
         if(this.money==null||this.money==""){
           this.$message({
                     message: '请输入提现金额!',
                     type: 'error',
                     duration:1000,
                     offset:200
                   });
         }else if(this.money<=0||!/^\d+$/.test(this.money)){
           this.$message({
                     message: '请输入正确的数字!',
                     type: 'error',
                     duration:1000,
                     offset:200
                   });
         }else if(this.zhanghao==null||this.zhanghao==""){
            this.$message({
                      message: '请输入收款人账户!',
                      type: 'error',
                      duration:1000,
                      offset:200
                    });
         }else if(this.sum>this.balanceInfo){
           this.$message({
                     message: '对不起，余额不足!',
                     type: 'error',
                     duration:1000,
                     offset:200
                   });
         }
         else{
           this.$axios.get("http://localhost:8080/ums-user/Withdrawals",{
                   params: {
                     id:sessionStorage.getItem("uid"),
                    balance:this.sum
                   }
                 })
           .then(response=>{
           this.$message({
                     message: '提现成功!',
                     type: 'success',
                     duration:1000,
                     offset:200
                   });
           location.reload()
           }).catch(function(error){
             console.log(error);
           })
         }

       }
    },mounted() {

      this.$axios.get("http://localhost:8080/ums-user/loadinguser",{
              params: {
                id:sessionStorage.getItem("uid")
       }
            })
      .then(response=>{

        this.balanceInfo=response.data.balance;


      }).catch(function(error){
        console.log(error);
      })
    }, beforeRouteUpdate(to,from,next) {

      next();

    }
  }

</script>

<style scoped="">


  .firstPrice {
     text-align: left;
     padding: 2% 5%;
   }

   .firstPrice>p {
     margin: 1% 2%;
     display: inline-block;
     width: 30%;
   }
   #inputPrice{
     color: black;
   }
   .secondPrice {
     text-align: left;
     padding: 2% 5%;
   }

   .secondPrice>button {
     margin: 0 2%;
   }

   #secondPriceSpan {
     font-size: 10px;
   }

   .thirdPrice {
     text-align: left;
     padding: 2% 14%;
   }

   #blueBtn>span {
     color: white;
   }

   #whiteBck {
     background-color: white;
      /* min-height: 600px; */
      /*height: 600px; */
   }
   .payDesc{
     margin: 0 3%;
     height: 150px;
     background-color: rgb(254,252,247);
   }
   .line{
     height: 1px;
     font-size: 0;
     overflow: hidden;
     background-image: linear-gradient(
     -90deg
     ,rgba(250,250,250,0) 0,#eea20e 49%,rgba(250,250,250,0) 100%);
   }
   .payDesc ul{
     margin: 3% 5%;
   }
   .payDesc ul li{
     text-align: left;
     line-height: 25px;
     float: none;
   }
   .priceCount{
     margin: 0 3%;
     padding: 0;
   }
   .priceCount h3{
     width: 10%;
     margin: 1% 0;
     text-align:left;
   }
   .priceCount table tr:first-of-type{
     background-color: rgb(245,245,245);
   }
   #secondP{
     display: inline-block;
     margin-left: 10%;
   }
   .firstPrice span{
     font-size: 12px;
     text-align: left;
   }
   .alipayNumber{
     cursor: pointer;
     width: 254px;
     height: 40px;
     background-color: rgb(248,248,248);
     border: 1px solid rgb(227,227,227);
     display: inline-block;
     margin: 0 2%;
   }
  .selectNum{
     margin-left: 5%;
     margin-top: 5%;
   }
   .selectNum>i:last-of-type{
     float: right;
     margin-right: 5%;
   }
   .hideNum{
     display: none;
     cursor: pointer;
     width: 254px;
     height: 40px;
     background-color: white;
     border: 1px solid rgb(227,227,227);
     margin: 5px 10%;
   }
   .hideNum>div{
     margin-left: 5%;
     margin-top: 3%;
   }
   .serviceCharge{
     display: inline-block;
     margin: 0 2%;

   }
   .serviceCharge h3{
     color: dodgerblue;
   }
</style>
