<template>
  <div>
     <div class="data public">
       <div class="content">
         <div class="buyingNow">
           <table width="100%" border="0" cellpadding="0" cellspacing="0">
             <tr style="background-color: rgb(245,245,245);">
               <td width="100px">饰品</td>
               <td>买家</td>
               <td>求购价格</td>
               <td>操作</td>
             </tr>
        <tr v-for="buy,index in buyInfo.records">
			 	<td width="350px"  @mouseenter="show1(index)" @mouseleave="hidden1()">
          <div class="item"style="display:inline-block; vertical-align:middle" >
            <img width="66px" height="66px" :src="buy.url"/>
            <div v-show="show==index" class="desc">
              <div class="desc_item" style="width:280px; height: 170px;">
                <img width="201px" height="138px" :src="buy.url" />
              </div>
              <p style="color: rgb(170,170,170);" align="left">
                价格 <span class="price">¥ {{buy.price}}</span>
              </p>
              <p>
                <p style="color: white" align="left">描述</p>
                <p style="color: rgb(170,170,170);" align="left">{{buy.desc}}</p>
              </p>
            </div>
          </div>
          {{buy.weaponsName}}|{{buy.name}}({{buy.attrasionName}})

        </td>
			 	<td><div style="display: inline-block; border-radius: 50%; width: 30px;height: 30px;overflow: hidden;vertical-align:middle"><img style="vertical-align:middle" width="30" height="30" :src="buy.buyerUrl"/></div>{{buy.buyerName}}</td>
			 	<td style="color: #FFA500;">¥ {{buy.price}}</td>
			 	<td>
			 		<div>
			 			<el-button type="primary" @click="buys(buy.price,buy.buyerId,buy.id)" size="mini" id="blueBtn" >供应</el-button>
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
			   :total="buyInfo.total">
			 </el-pagination>
		 </div>

       </div>
      </div>
   </div>

</template>

<script>
  export default {
    props:["allNewAttrasionId"],
	  data(){
		  return{
        price:'',
        skinId:'',
        buyId:'',
        show:'-1',
			  buyInfo:"",
			  currentNo:1,
			  current:1,
			  pagesize:5,
        childNewId:this.allNewAttrasionId,
        nowPage:2
		  }
	  },
	  mounted() {
		$(".nav>ul>li").eq(1).find("a").css("color","white").find("i").show();

		this.findBuyInfo();

	},
	methods:{
    buys(price,buyId,skinId){
      this.price=price
      this.buyId=buyId
      this.skinId=skinId
      this.supply()
    }
    ,
    supply(){
      this.$axios.get("http://localhost:8080/ums-user/supply",{
        params:{
          id:sessionStorage.getItem("uid"),
          balance:this.price,
          skinId:this.skinId,
          buyId:this.buyId
        }
      }).then(response=>{
        let result=response.data;
        if(result.code=="200"){
          this.$message({
                    message: '供应成功',
                    type: 'success',
                    duration:1000,
                    offset:200
                  });
          location.reload()
        }else {
          this.$message({
            center:true,
            message: result.message,
            type: 'error',
            duration:1000,
            offset:100
          });
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
		findBuyInfo(parents){
      if(parents){
        this.childNewId=parents.allNewAttrasionId;
      }
			this.$axios.get("http://localhost:8080/oms-buy/findBuy",{
				params:{attributeId:this.$route.query.attributeId,
				attrasionId:this.childNewId,
				currentNo:this.currentNo,
				uId:sessionStorage.getItem("uid")}
				// headers:{"token":sessionStorage.getItem("login_info")}
			}).then(response=>{
				let info=response.data;
				if(info.code==200){
					this.buyInfo=info.data;
          console.log(this.buyInfo.records)
				}}).catch(function(error){
				  console.log(error);
				})
		},
		toPage:function(index){
		this.currentNo=index
		this.findBuyInfo()
		}
	}

  }

</script>

<style >
  .buyInfo{
    background-color: white;
  }
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
    margin: 5px;
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

  * {
    margin: 0px auto;
    padding: 0px;
    text-decoration: none;
  }
  .buyingNow{
    min-height: 600px;
    width: 1200px;
  }
  .buyingNow>table>tr>td{
    padding: 0px;
    font-size: 15px;
  }
  #page{
  	  margin: 1% 0;
  }
</style>
