<template>
 <div class="">
   <div class="block-header">
     <div class="l_left">
       <div class="w-OrderGroup">
         <div class="w-Order" @click="indexs() ">
           <span>价格<i class="icon_arrow"></i></span>
         </div>
       </div>
       <!-- <div class="select">
         <span class="select_num">已选 <big>0</big>/</span>XX</span>
       </div> -->
     </div>
    <!-- <div class="l_Right">
       <div class="l_Right_left" value="">
         <input class="all" type="checkbox" style="vertical-align: middle; margin-top: -2px;
           margin-bottom: 1px;" name="" id="" value="" @click="alll()"/>全选
       </div>
       <div class="l_Right_right">
         <a href="javascript:void(0)" class="i_Btn_sub" style="display: inline-block;" @click="repect()">刷新</a>
         <a href="" class="i_Btn">上架</a>
       </div>
     </div> -->
   </div>
   <div class="eq_if" style="background-color: #FFFFFF;min-height: 466px;">
     <div class="" style="background: #fafafa;padding: 20px 25px;">
       <div class="" style="min-height: 466px;">
         <ul class="goog" style="width: 1180px;">
           <li class="img_equipment"  v-for="goods in goods.records" @click="dialogShow(goods.currencyId,goods.userId)" >
             <a href="javascript:void(0)" style="height: 136px;" class="img_href">
               <img height="138" lazy width="138" :src="goods.url" />
             </a>
             <p class="eq_info"><a href="#">{{goods.weaponsName}}({{goods.categoryName}}) | {{goods.name}}({{goods.attrasionName}}</a></p>
             <p class="eq_price"><strong>¥<span>{{goods.recommendPrice}}</span></strong></p>
             <div class="">
               <a href="javascript:void(0)">解析</a>
             </div>
           </li>
         </ul>
         <!-- 分页 -->
         <!-- <el-pagination
           background
           :page-size=pagesize
           :current-page=currentNo
           @current-change="toPage"
           layout="prev, pager, next"
           :total="goodsInfo.total">
         </el-pagination> -->
         <el-pagination
           background
           :page-size=20
           :current-page=pageNo
            @current-change="toPage"
           layout="prev, pager, next"
           :total="goods.total">
         </el-pagination>
       </div>
     </div>
   </div>

   <!-- 上架商品 -->
	 <el-dialog  title="上架商品" :visible.sync="dialogFormVisible" :append-to-body="true" :close-on-click-modal="false">
	 	<div class="dialogHeader">
	 	<div v-for="bindingInfo in bindingInfo.records" class="buyNowDialog">
	 		<div class="iconWrapper">
	 			<img :src=bindingInfo.url height="80"/>
	 		</div>
	 		<div class="dialogContent">
	 			<ul>
	 				<li><span>上架饰品 | </span><span>{{bindingInfo.weaponsName}}|({{bindingInfo.categoryName}})|{{bindingInfo.name}}({{bindingInfo.attrasionName}})</span></li>
	 				<li><span>推荐价格 | </span><span style="color: #FFA500;"> ¥ {{bindingInfo.recommendPrice}}</span></li>
	 			</ul>
	 		</div>
	 	</div>
	 	<div class="dialogFrom">
	 		<p>
	 			<span>上架单价</span><el-input  placeholder="请输入价格" v-model="inputPrice" class="he" ></el-input> 元
	 		</p>
	 		<p>
	 			<span>应收总额</span><span style="color: #FFA500;">￥{{this.inputPrice}}</span>
	 		</p>
	 	</div>
	 </div>
	 	<div slot="footer" class="dialog-footer">
	 	  <el-button @click="dialogFormVisible = false">取 消</el-button>
	 	  <el-button type="primary" @click="addBuyNowInfo()">确 定</el-button>
	 	</div>
	 </el-dialog>
 </div>
</template>

<script>
  export default {
		props:["type1Id","type2Id","colore","qualityId","categoryId","abrasionId"],
    data() {
      return {
        aa: "",
        bb: "",
        num:"0",
        selectPrice:true,
		pageSize: 1, //总页码
		pageNo: 1 ,//当前页码
		status:0,//上架状态 0未寄售 1寄售 2未拥有
		numnum:0,
		goods:"",
		pageNow:1,
		dialogFormVisible: false,
		bindingInfo:"",
		inputPrice:"",
		price:"",
		innt:"",
		userId:""

        }
    },
    mounted() {
      $(".nav>ul>li:first>a").css("color","white").find("i").show();
	  this.index(this.$parent);
    },
    methods: {
      // 切换页码
      toPage:function(index){
        this.currentNo=index
        this.index(this.$parent);
      }
      ,
      alll(){
        if(this.num==0){
           $(".img_equipment").find("i").addClass("icon_select_second");
           this.num++
        }else{
           $(".img_equipment").find("i").removeClass("icon_select_second");
           this.num=0
        }
      },
	  show(event){
		$(event.target).parent().parent().find("i").toggleClass("icon_select_second")
	  },
	  index(parents) {
	  		  this.$axios.get("http://localhost:8080/pms-stock/show",{
	  			  params:{
	  				  //用户ID
	  				  id:sessionStorage.getItem("uid"),
	  				  //库存状态
	  				  status:this.status,
	  				  //当前页码
	  				  pageNo:this.pageNo,
					  //枪支分类
					  scid6:parents.type1Id,
              //模糊查询
            name:parents.selectInput,
					  scid:parents.type2Id,
					  scid2:parents.qualityId ,
					  scid4:parents.categoryId ,
					  scid5:parents.abrasionId ,
					  scid3:parents.colorId,
					  numnum:parents.numnum
	  			  }
	  		  }).then(response =>{
	  			  let info =response.data
				  if(this.numnum==1){
					  this.numnum=0
				  }else{
					  this.numnum++
				  }
	  			  console.log(info.data)
	  			  if(info.code ==200){
	  				  this.goods = info.data;
	  			  }
	  		  }).catch(function(error){
	  			  console.log(erro)
	  		  })
	  },
	  indexs(){
		  this.$axios.get("http://localhost:8080/pms-stock/show",{
		  	  			  params:{
		  	  				  //用户ID
		  	  				  id:sessionStorage.getItem("uid"),
		  	  				  //库存状态
		  	  				  status:this.status,
		  	  				  //当前页码
		  	  				  pageNo:this.pageNo,
		  					  //枪支分类
		  					  scid6:this.type1Id,
		  					  scid:this.type2Id,
		  					  scid2:this.qualityId ,
		  					  scid4:this.categoryId ,
		  					  scid5:this.abrasionId ,
		  					  scid3:this.colorId,
		  					  numnum:this.numnum
		  	  			  }
		  }).then(response =>{
		  	  			  let info =response.data
		  				  if(this.numnum==1){
		  					  this.numnum=0
		  				  }else{
		  					  this.numnum++
		  				  }
		  	  			  console.log(info.data)
		  	  			  if(info.code ==200){
		  	  				  this.goods = info.data;
		  	  			  }
		  }).catch(function(error){
		  	  			  console.log(erro)
		  })
	  },
	  //刷新页面
	repect(){
		window.location.reload();
	},
	dialogShow(id,userId){
		this.dialogFormVisible=true;
		this.innt = id
		this.userId = userId
		this.binding()
	},
	binding(){
		this.$axios.get("http://localhost:8080/pms-stock/show",{
			params:{
				id:sessionStorage.getItem("uid"),
				pk_id:this.innt,
				pageNo: this.pageNo,
			// headers:{"token":sessionStorage.getItem("login_info")}
			}
		}).then(response=>{
			let info=response.data;
			if(info.code==200){
				this.bindingInfo=info.data
			}
			console.log(this.bindingInfo)
			}).catch(function(error){
			  console.log(error);
			})
	},
	addBuyNowInfo(){
    if(this.inputPrice<=0||!/^\d+$/.test(this.inputPrice)){
    this.$message({
              message: '请输入大于0的数字',
              type: 'error',
              duration:1000,
              offset:200
            });
    return
    }
		this.$axios.get("http://localhost:8080/pms-stock/goodsShelves",{
			params:{
				user_id:sessionStorage.getItem("uid"),//用户ID
				skin_id:this.innt,//皮肤id
				seller_id:sessionStorage.getItem("uid"),//用户id
				skins_id:this.innt,//皮肤id
				price:this.inputPrice,//上架的售价
				stock_id:this.userId,//库存的主键
			}
			// headers:{"token":sessionStorage.getItem("login_info")}
		}).then(response=>{
			let info=response.data;
				this.dialogFormVisible=false;
        this.$message({
                  message: '上架成功',
                  type: 'success',
                  duration:1000,
                  offset:200
                });
				location.reload();
			}).catch(function(error){
        this.$message({
                  message: '求购添加失败',
                  type: 'erorr',
                  duration:1000,
                  offset:200
                });
				this.dialogFormVisible=false;
				console.log(error);
			})
	}
    }
  };
</script>

<style scoped="">
  ul::after{
    content: "";
    display: block;
    clear: both;
  }
  .el-pagination{
    white-space: normal;
  }
  /*  */
  .block-header {
    background: #1c202b;
    padding-bottom: 1px;
    min-height: 52px;
    margin-top: 15px;
  }

  .l_left {
    float: left;
    margin: 10px 0 0 25px;
  }

  .w-OrderGroup {
    margin-right: 12px;
    /* font-size: 0; */
    border-radius: 2px;
    border: 1px solid #45536C;
    border-right: none;
    display: inline-block;
    line-height: 32px !important;
  }

  .w-Order {
    padding: 0 12px;
    min-width: 60px;
    border-right: 1px solid #45536C;
    color: #63779B;
    display: inline-block;
    cursor: pointer;
    background: rgb(28, 32, 43);
    height: 32px;
    line-height: 32px;
    border-radius: 2px;
    font-size: 12px;
    text-align: center;
  }

  .w-Order span {
    color: rgb(color: #63779B; );
  }

  .icon_arrow {
    display: inline-block;
    overflow: hidden;
    vertical-align: middle;
    background-repeat: no-repeat !important;
    background: 0;
    width: 7px;
    height: 11px;
    margin: -2px 0 0 5px;
    margin-left: 9px;
    background-image: url(../assets/imgs/icon.less.png);
    background-position: -82px -564px;
    vertical-align: middle;
  }

  .select {
    display: inline-block;
    height: 40px;
    text-align: center;
    height: 32px;
    color: #9a9b9e;
    font-size: 12px;
  }

  big {
    color: #eea20e !important;
  }

  .l_Right {
    display: inline-block;
    float: right;
    line-height: 50px;
    margin: 0 25px 0 0;
  }

  .l_Right div {
    float: left;
  }

  .l_Right_left {
    font-size: 12px;
    color: rgb(115, 133, 104);
  }

  /*  .l_Right_right{
    text-align: center;
    padding: 4px 12px;
    font-size: 16px;
    display: inline-block;
    cursor: pointer;
    border-radius: 2px;
    vertical-align: middle;
    line-height: 30px;
    min-width: 96px;
  } */
  .i_Btn_sub {
    margin-left: 12px;
    background: #45536C;
    padding: 4px 12px;
    font-size: 16px;
    display: inline-block !important;
    cursor: pointer;
    border-radius: 2px;
    vertical-align: middle;
    line-height: 30px;
    min-width: 96px;
    text-align: left;
    color: #FFFFFF;
  }

  .i_Btn {
    margin-left: 12px;
    background: #4773C8;
    padding: 4px 12px;
    font-size: 16px;
    display: inline-block !important;
    cursor: pointer;
    border-radius: 2px;
    vertical-align: middle;
    line-height: 30px;
    min-width: 96px;
    text-align: left;
    color: #FFFFFF;
  }

  a {
    text-decoration: none;
  }

  .img_equipment {
    width: 208px;
    height: 220px;
    margin-right: 23px;
    padding-bottom: 0;
    border: 1px solid #E4E4E4;
    float: left;
    margin: 0 25px 20px 0;
    position: relative;
    border: 1px solid #E4E4E4;
  }

  .img_href {
    background: url(../assets/imgs/item_bg.png);
    display: block;
    padding-bottom: 25px;
    position: relative;
    width: 100%
  }

  .eq_info {
    margin-top: 6px !important;
    margin-bottom: 0;
    font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 15px;
    line-height: 24px;
    margin: 4px 12px;
  }

  .eq_price {
    margin-top: 4px;
    margin: 6px 12px;
    line-height: 18px;
  }

  .eq_price strong {
    text-align: left;
    font-size: 14px;
    color: #eea20e;
    display: block;
  }

  .eq_if::after {
    content: '';
    display: block;
    clear: both;
  }

  .img_equipment div {
    position: absolute;
    top: 127px;
    right: 5px;
  }

  .img_equipment div a {
    color: #EDEDED !important;
    border: 1px solid rgba(78, 76, 89, .4);
    background: rgba(168, 168, 174, .4);
  }

  .icon_select {
    background-image: url(../assets/imgs/icon.less.png);
    width: 40px;
    height: 40px;
    overflow: hidden;
    vertical-align: middle;
    background-repeat: no-repeat !important;
    display: block;
    bottom: 0;
    right: 0;
    position: absolute;
  }
  .icon_select_first{
    background-position: -144px -334px;
  }

  .icon_select_second{
    background-position: -242px -272px;
  }


  .buyNowDialog{
  	  background: #fff;
  	  padding: 2%;
  	  border: 1px solid #EBEBEB;
  	  width: 65%;
    }
    .iconWrapper{
  	  width: 122px;
  	  text-align: center;
  	  background: url(../assets/imgs/item_bg.png);
  	  background-size: cover;
    }
    .buyNowDialog>div{
  	  display: inline-block;
    }
    .dialogContent{
  	  margin-left: 2%;
    }
    .dialogContent>ul>li{
  	  float: none;
  	  line-height: 25px;
    }
    .dialogFrom{
  	  width: 65%;
    }
    .dialogFrom>p{
  	  margin-top: 2%;
    }
    .dialogFrom>p>.el-input{
  	  width: 50%;

    }
    .dialogFrom>p>span:first-of-type{
  	  margin-right: 5%;
  	  font-size: 16px;
    }
</style>
