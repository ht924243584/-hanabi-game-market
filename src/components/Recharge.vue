<template>
  <div id="whiteBck">
    <div class="firstPrice">
      充值金额
      <p id="click">
        <el-input type="text" placeholder="请输入充值金额" id="inputPrice" v-model="rechargePrice"/>
      </p>
      <el-button @click="priceClick(100)">￥<span>100</span></el-button>
      <el-button @click="priceClick(500)">￥<span>500</span></el-button>
      <el-button @click="priceClick(1000)">￥<span>1000</span></el-button>
    </div>
    <div class="secondPrice">
      充值方式
      <el-button v-model="mode" @click="Modes()">支付宝</el-button>
      <el-button v-model="mode" @click="Modes()">信用卡花呗 <span id="secondPriceSpan">1%服务费</span></el-button>
      <el-button disabled>微信支付</el-button>
    </div>
    <div class="thirdPrice">
      <p>
        <el-button type="primary" id="blueBtn"  @click="Confirm_recharge()">确认充值</el-button>
      </p>
    </div>
    <div class="line"></div>
    <div class="payDesc">
      <ul class="alipay" v-if="descShow==1">
        <li>充值须知</li>
        <li>1.单笔限额5-20000元；</li>
        <li>2.充值退款或提现会产生1%服务费；</li>
        <li>3.帐号违规资金转移套现将被冻结处理.</li>
      </ul>
      <ul class="pcredit"v-if="descShow==2">
        <li>充值须知</li>
        <li>1.单笔限额5-20000元；</li>
        <li>2.信用卡花呗充值收取1%服务费，不可提现；</li>
        <li>3.帐号违规资金转移套现将被冻结处理.</li>
      </ul>
    </div>
    <div class="line"></div>
    <div class="priceCount">
      <h3>充值记录</h3>
      <table width="100%" border="0" cellpadding="0" cellspacing="0">
        <tr style="background-color: rgb(245,245,245);">
          <th>流水号</th>
          <th>充值金额(元)</th>
          <th>付款账户</th>
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
        descShow:1,
        rechargePrice:"",
        mode:"",
      };
    },
    methods: {
      priceClick(price){
        this.rechargePrice=price;
      },Confirm_recharge(){
        if(this.rechargePrice<=0||!/^\d+$/.test(this.rechargePrice)){
          this.$message({
                    message: '请输入正确的数字!',
                    type: 'erorr',
                    duration:1000,
                    offset:200
                  });
        }else{
          if(!this.mode==1){
            this.$message({
                      message: '请选择充值方式!',
                      type: 'erorr',
                      duration:1000,
                      offset:200
                    });
          }else{
            this.aliPay("Buff充值");
            }
          }


      },Modes(){
        this.mode=1;
      },
      aliPay:function(name){
         this.$axios.get("http://localhost:8080/pay/aliapy1",{
          params:{
            id: sessionStorage.getItem("uid"),
            balance:this.rechargePrice,
            sellName:name
          }
         }).then(response=>{
           const divForm = document.getElementsByTagName('div')
                          if (divForm.length) {
                              document.body.removeChild(divForm[0])
                          }
                          const div = document.createElement('div')
                          div.innerHTML = response.data // data就是接口返回的form 表单字符串
                          document.body.appendChild(div)
                          document.forms[0].setAttribute('target', '_blank') // 新开窗口跳转
                          document.forms[0].submit()
         })
      }
    }
  }

</script>

<style>
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
     /* height: 600px; */
     /* min-height: 600px; */
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

   .priceCount>table>tr>th{
     padding:1% 0;
   }
</style>
