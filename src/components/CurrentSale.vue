<template>
  <div>
     <div class="data public">
       <div class="content">

         <div class="buyingNow">
           <table width="100%" border="0" cellpadding="0" cellspacing="0">
             <tr style="background-color: rgb(245,245,245);">
               <td width="100px">饰品</td>
               <td>卖家</td>
               <td>价格</td>
               <td>操作</td>
             </tr>
			 <tr v-for="(orders,index) in orderInfo.records">
				<td width="350px" @mouseenter="show1(index)" @mouseleave="hidden1()">
          <div class="item" style="display: inline-block;vertical-align:middle">
            <img width="66px" height="66px" :src="orders.url"/>
            <div v-show="show==index" class="desc">
              <div class="desc_item" style="width:280px; height: 170px;">
                <img width="201px" height="138px" :src="orders.url" />
              </div>
              <p style="color: rgb(170,170,170);" align="left">
                价格 <span class="price">¥ {{orders.price}}</span>
              </p>
              <p>
                <p style="color: white" align="left">描述</p>
                <p style="color: rgb(170,170,170);" align="left">{{orders.desc}}</p>
              </p>
            </div>
          </div>
          {{orders.weaponsName}}|{{orders.name}}({{orders.attrasionName}})
        </td>
				<td><div style="border-radius: 50%; width: 30px;height: 30px;overflow: hidden;vertical-align:middle"><img width="30px" height="30px" :src="orders.sellUrl"/></div>{{orders.sellName}}</td>
				<td class="price" >￥ {{orders.price}}</td>
				<td>
					<div>
						<el-button type="primary" @click="buys(orders.orderId,
              orders.weaponsName+'|'+orders.name+'('+orders.attrasionName+')',
              orders.price,orders.skId)" id="blueBtn" size="mini">购买</el-button>
					</div>
          <el-dialog
            :visible.sync="dialogVisible"
            width="30%">
            <p style="margin: 20px;" align="center">饰品:{{name}}</p>
            <p style="margin: 20px;"  align="center">价格:<span class="price">¥ {{price}}</span></p>
            <el-radio-group v-model="radio">
                <el-radio :label="1">支付宝支付</el-radio>
                <el-radio @click="Balance()" :label="2">余额支付</el-radio>
            </el-radio-group>
            <p style="margin: 20px;" v-if="radio==2">
              密码
                <el-input style="width: 200px;" placeholder="请输入密码" v-model="input" show-password></el-input>
            </p>
            <p style="margin: 20px; color: red;" v-if="isBalance">
              余额不足
            </p>
            <p style="margin-top: 20px;">
              <el-button v-if="isBalance" type="primary" disabled="" >购买</el-button>
              <el-button v-if="!isBalance" type="primary" @click="buy()" >购买</el-button>
              <el-button type="warning" @click="dialogVisible=false" >取消</el-button>
            </p>
          </el-dialog>
					<div>
						<a href="javaScript:void(0)" @click="inputs(orders.orderId,orders.saleId)">还价</a>
					</div>
				</td>
			</tr>
     </table>
     </div>
		 <div id="page">
			 <el-pagination
			   background
			   :page-size=pagesize
			   :current-page=currentNo
			   @current-change="toPage"
			   layout="prev, pager, next"
			   :total="orderInfo.total">
			 </el-pagination>
		 </div>
       </div>
      </div>
   </div>

</template>

<script>
  export default {
	  props:["minPrice","maxPrice","allNewAttrasionId"],
	  data(){
		  return{
        isBalance:false,
        input:'',
        stockId:'',
        price:'',
        name:'',
        oid:'',
        radio:'-1',
        show:'-1',
        dialogVisible: false,
			  orderInfo:"",
			  currentNo:1,
			  current:1,
			  pagesize:5,
        orderId:"",
        saleId:"",
        money:"",
        childNewId:this.allNewAttrasionId,
        nowPage:1
		  }
	  },
    watch:{
      radio:function(val){
        if(val==2){
          this.Balance()
        }else{
          this.isBalance=false
        }
      }
    }
    ,
	  mounted() {
		$(".nav>ul>li:first>a").css("color","white").find("i").show();
		this.findOrderInfo();
	},
	methods:{
    buys(oid,name,price,skid){
      this.radio=1
      this.oid=oid
      this.stockId=skid
      this.name=name
      this.price=price
      this.dialogVisible=true
      // buy(oid,name,price)
    }
    ,
    buy(){
      if(this.radio=="-1"){
        this.$message({
          center:true,
          message: '请选择支付方式',
          type: 'error',
          duration:1000,
          offset:100
        });
      }else if(this.radio=="1"){
        this.aliPay(this.price,this.name)
      }else{
        if(this.input==""){
          this.$message({
            center:true,
            message: '请输入密码',
            type: 'error',
            duration:1000,
            offset:100
          });
        }else{
          //验证密码,付款
          this.Payment()
        }
      }
    },
    Payment(){
      this.$axios.get("http://localhost:8080/ums-user/payment",{
        params:{
          id:sessionStorage.getItem("uid"),
          balance:this.price,
          oid:this.oid,
          skId:this.stockId,
          password:this.input
        }
      }).then(response=>{
        let result=response.data;
        if(result.code=="200"){
          //购买成功
          this.$message({
            center:true,
            message: '购买成功',
            type: 'success',
            duration:1000,
            offset:100
          });
          this.$router.push("/inventory/insTock")
        }else {
          this.$message({
            center:true,
            message: '密码错误',
            type: 'error',
            duration:1000,
            offset:100
          });
        }
      })
    }
    ,
    Balance(){
      this.$axios.get("http://localhost:8080/ums-user/isBalance",{
        params:{
          id:sessionStorage.getItem("uid"),
          balance:this.price
        }
      }).then(response=>{
        let rsult=response.data
        if(rsult.code=="200"){

        }else{
          this.isBalance=true
        }
      })
    }
    ,
    show1(index){
      this.show=index
    },
    hidden1(){
      this.show='-1'
    }
    ,
    aliPay:function(price,name){
      let uid=sessionStorage.getItem("uid");
       this.$axios.get("http://localhost:8080/pay/aliapy",{
        params:{
          price:price,
          sellName:name,
          uid:uid,
          oid:this.oid,
          skId:this.stockId
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
       }).catch(function(eroor){
         console.log(eroor)
       })
    },
		findOrderInfo(parents){
      if(parents){
        this.childNewId=parents.allNewAttrasionId;
      }
			this.$axios.get("http://localhost:8080/oms-order/findOderInfo",{
				params:{attributeId:this.$route.query.attributeId,
				attrasionId:this.childNewId,
				currentNo:this.currentNo,
				minPrice:this.minPrice,
				maxPrice:this.maxPrice,
				uId:sessionStorage.getItem("uid")}
				// headers:{"token":sessionStorage.getItem("login_info")}
			}).then(response=>{
				let info=response.data;
				if(info.code==200){
					this.orderInfo=info.data;
          console.log(this.orderInfo.records)
				}}).catch(function(error){
				  console.log(error);
				})
		},
		toPage:function(index){
		this.currentNo=index
		this.findOrderInfo()
		},inputs(orderId,saleId){
      this.orderId=orderId;
      this.saleId=saleId;
         this.$prompt('请输入还价价格', '提示', {
                 confirmButtonText: '确定',
                 cancelButtonText: '取消',
                 inputPattern: /^\d+$/,
                 inputErrorMessage: '价格输入有误'
               }).then(({ value }) => {
                  this.money=value;
                  this.Counteroffer();
               }).catch(() => {
                 this.$message({
                   type: 'info',
                   message: '取消输入'
                 });
               });

    },Counteroffer(){
      this.$axios.get("http://localhost:8080/ums-counter-offer/insert",{
                  params: {
                      buyerId:sessionStorage.getItem("uid"),
                      sellerId:this.saleId,
                      orderId:this.orderId,
                      money:this.money
              }
                }).then(response=>{
                  let result=response.data
                  alert(result.message)
                location.reload()
                }).catch(function(error){
                console.log(error);
                })
    }
	}

  }
</script>

<style >
  .desc>p{
    margin: 20px;
  }
  .price{
    color: #FFA500;
  }
  .item{
    position: relative;
    width: 88px;
    height: 66px;
    margin: 20px;
    background-image: url(../assets/imgs/item_bg.png);
  }
  .desc_item{
    background-image: url(../assets/imgs/goods_bg.png);
  }
  .desc{
    background-color: rgb(40,43,48);
    position: absolute;
    top: 10px;
    left: 100px;
    width: 300px;
  }
  .data{
    min-height: 500px;

  }
  * {
    margin: 0px auto;
    padding: 0px;
    text-decoration: none;
  }
  .buyingNow{
    min-height: 600px;
    width: 1200px;
    background-color:white;
  }
  .buyingNow>table>tr>td{
    padding: 5px 0;
    font-size: 15px;
  }
  .buyingNow td>div{
	  display: inline-block;
	  margin: 0 2%;
  }
  #page{
  	  margin: 1% 0;
  }
</style>
