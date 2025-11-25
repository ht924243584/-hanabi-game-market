<template>
  <div id="app">
    <el-container class="is-vertical" :style="{backgroundImage: 'url(' +headerurl+ ')'} ">
      <hpheader></hpheader>
      <div class="data public">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item @click="item_cle()" style="cursor: pointer;color: white;">饰品市场</el-breadcrumb-item>
          <el-breadcrumb-item style="color: white;">{{type_name}}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="classification">
          <ul class="flex"  >
            <li v-for="weapon,index in weapons"  @mouseout="hide_item()" @mouseover="show_item(index)">
              <div @click="item_val1(index,weapon.id,weapon.name)">
                <p :class="'icon icon'+index" style="width: 32px;height: 32px;margin-left: 45px;" ></p>
                <p>{{weapon.name}}</p>
              </div>
              <ul class="class_item" v-show="type == index">
                <li @click="item_val2(kid.categoryName,kid.id,kid.categoryName)"  v-for="kid,indexs in weapon.kidList" >{{kid.categoryName}}</li>
              </ul>
            </li>
          </ul>
          <div class="dictionary">
            <ul>
              <li class="dc_item" v-for="quality,index in qualitys"  @mouseout="hide_item()" @mouseover="show_dc(index)">
                <h4><span>{{quality.name}}</span><i class="arrow"></i></h4>
                <ul v-show="category == index" >
                  <li @click="typeEmpty(index,$event)">不限</li>
                  <li v-for="kid in quality.kidList" @click="types(index,kid.id,$event,kid.categoryName)">{{kid.categoryName}}</li>
                </ul>
              </li>
            </ul>
            <div class="w-Search right" style="margin-top: 15px;">
                <span style=" background: #222E48;border-color: #3F5D97;">
                  <input v-model="skinName" class="i_Text" name="search" placeholder="输入物品名称" size="30" type="text">
                </span>
                <a class="find" style="float: right;" href="javascript:;" @click="serachInput()"><i class="icon_find"></i>
                  搜索
                </a>
            </div>

          </div>
        </div>
        <div class="block-header">
          <ul class="tag">
            <li @click="tag_changer($event,0)">
              <h6>出售</h6>
            </li>
            <li @click="tag_changer($event,1)">
              <h6>求购</h6>
            </li>
          </ul>
          <div class="right">
            ¥ <el-input v-model="minPrice"  placeholder="最低价"></el-input> - ¥ <el-input v-model="maxPrice" placeholder="最高价"></el-input>
             <div style="position: relative;" class="right">
               <el-select @change=priceSort(value)  v-model="value" placeholder="排序">
                   <el-option
                     v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
                   </el-option>
                 </el-select>
             </div>
          </div>
        </div>
        <div class="data_s">
          <span v-if="flag">暂无数据</span>
          <!-- 数据 -->
          <ul class="datas">
            <li class="datas_item" v-for="goods in goodsInfo.records" @click="goodsDetails(goods.id,goods.attributeId,goods.attrasionId)">
              <div class="data_bg">
                <a href="" >
                  <img height="138" lazy width="138" :src="goods.url" />
                </a>
              </div>
              <h3 style="font-weight: 400;">{{goods.weaponsName}}({{goods.categoryName}}) | {{goods.name}}({{goods.attrasionName}}) </h3>
              <p class="f_Strong">¥<span>{{goods.recommendPrice}}</span></p>
            </li>
          </ul>
            <el-pagination
              background
              :page-size=pagesize
              :current-page=currentNo
              @current-change="toPage"
              layout="prev, pager, next"
              :total="goodsInfo.total">
            </el-pagination>
        </div>
      </div>
    </el-container>
    <hpnav></hpnav>
    <hpfooter></hpfooter>
  </div>
</template>

<script>
 import hpheader from './header.vue'
  import lbt from './lbt.vue'
  import hpdata from './homedata.vue'
  import hpnav from './nav.vue'
  import hpfooter from './footer.vue'

  export default{
    components:{
      hpheader,
      lbt,
      hpdata,
      hpnav,
      hpfooter
    },
    data(){
      return{
        options: [{
                  value: '-1',
                  label: '默认'
                }, {
                  value: '0',
                  label: '价格 ↑'
                }, {
                  value: '1',
                  label: '价格 ↓'
                }],
        value: '-1',
        input2:'',
        headerurl:require("../assets/imgs/header-bg_csgo.jpg"),
        type:"-1",
        category:"-1",
        tab:'selling',
        type_name:'',
		weapons:"",
		qualitys:"",
		type1Id:"",
		type2Id:"",
		colorId:"",
		qualityId:"",
		categoryId:"",
		abrasionId:"",
		skinName:"",
		maxPrice:"",
		minPrice:"",
		currentNo:1,
		current:1,
		pagesize:20,
		goodsInfo:"",
		priceIndex:'',
		sellOrBuy:"0",
    flag:false
      }
    },
	mounted() {
		this.initWeapon();
		this.initQuality();
		this.findGoods();
	},
    methods:{
      show_item:function(index){
          this.type = index
      },
      hide_item:function(){
        this.type='-1';
        this.category='-1';
      },
      show_dc(index){
        this.category=index
      },
      item_val1(val,id,name){
        this.type2Id=""
        this.type_name=name
        this.type1Id=id;
		if(this.sellOrBuy==0){
			this.findGoods();
		}else if(this.sellOrBuy==1){
			this.findBuyGoods();
		}

      },
      item_val2(val,id,name){
        this.type1Id=""
        this.type_name=name
	  	this.type2Id=id
        if(this.sellOrBuy==0){
        	this.findGoods();
        }else if(this.sellOrBuy==1){
        	this.findBuyGoods();
        }
      },
      types(index,id,event,name){
        $(event.target).parent().siblings("h4").html(name)
		  if(index==0){
			  this.qualityId=id;
		  }else if(index==1){
			  this.categoryId=id;
		  }else if(index==2){
			  this.abrasionId=id;
		  }else if(index==3){
			  this.colorId=id;
		  }
		  this.hide_item();
		  this.findGoods();
	  },
	  typeEmpty(index,event){
      $(event.target).parent().siblings("h4").html("不限")
		  if(index==0){
		  	this.qualityId="";
		  }else if(index==1){
		  	this.categoryId="";
		  }else if(index==2){
		  	this.abrasionId="";
		  }else if(index==3){
		  	this.colorId="";
		  }
		  this.hide_item();
		  this.findGoods();
	  },
      item_cle(){
        alert(1)
        this.$router.push({path:"/Market"})
      },
      tag_changer(event,num){
		let my=event.target;
		$(my).parent().addClass("no");
		$(my).parent().siblings().removeClass("no");
		if(num==1){
			this.sellOrBuy=1;
			this.findBuyGoods();
		}else{
			this.sellOrBuy=0;
			this.findGoods();
		}
      },
	  initWeapon(){
	  	this.$axios.get("http://localhost:8080/skin-category/initWeapon")
	  	.then(response=>{
	  	  let info=response.data;
	  	  if(info.code==200){
	  		  this.weapons=info.data;
	  	  }
	  	}).catch(function(error){
	  	  console.log(error);
	  	})
	  },
	  initQuality(){
	  	this.$axios.get("http://localhost:8080/skin-category/initQuality")
	  	.then(response=>{
	  	  let info=response.data;
	  	  if(info.code==200){
	  		  this.qualitys=info.data;
	  	  }
	  	}).catch(function(error){
	  	  console.log(error);
	  	})
	  },
	  findGoods(){
      this.$router.push({path:"/Market",query:{"type":this.type1Id,"color":this.colorId}});
		  this.$axios.get("http://localhost:8080/pms-skins/findGoods",{
			  params:{typelevel1:this.type1Id,typelevel2:this.type2Id,colors:this.colorId,
					  quality:this.qualityId,category:this.categoryId,abrasion:this.abrasionId,
					  skinName:this.skinName,minPrice:this.minPrice,
					  maxPrice:this.maxPrice,currentNo:this.currentNo,
					  index:this.priceIndex},
		  })
		  .then(response=>{
		    let info=response.data;
		    if(info.code==200){
		  	  this.goodsInfo=info.data;
          console.log(info);
		    }
		  }).catch(function(error){
		    console.log(error);
		  })
	  },
	  toPage:function(index){
      this.currentNo=index
      this.findGoods()
	  },
	  goodsDetails(skinId,abId,asId){
      sessionStorage.setItem("sellOrBuy",this.sellOrBuy)
		  this.$router.push({path:"/GoodsInfo/CurrentSale",query:{goodsId:skinId,attributeId:abId,attrasionId:asId,sellOrBuy:this.sellOrBuy}});
	  },
	  priceSort(index){
		  this.priceIndex=index;
		  if(this.sellOrBuy==0){
		  	this.findGoods();
		  }else if(this.sellOrBuy==1){
		  	this.findBuyGoods();
		  }
	  },
		findBuyGoods(){
			this.$router.push({path:"/Market",query:{"type":this.type1Id,"color":this.colorId}});
			this.$axios.get("http://localhost:8080/pms-skins/findBuyGoodsByInfo",{
			  params:{typelevel1:this.type1Id,typelevel2:this.type2Id,colors:this.colorId,
					  quality:this.qualityId,category:this.categoryId,abrasion:this.abrasionId,
					  skinName:this.skinName,minPrice:this.minPrice,
					  maxPrice:this.maxPrice,currentNo:this.currentNo,
					  index:this.priceIndex},
			})
			.then(response=>{
			  let info=response.data;
			  if(info.code==200){
				  this.goodsInfo=info.data;
			  console.log(this.goodsInfo);
			  }
			}).catch(function(error){
			  console.log(error);
			})
		},
		serachInput(){
			if(this.sellOrBuy==0){
				this.findGoods();
			}else if(this.sellOrBuy==1){
				this.findBuyGoods();
			}
		}


  }

  }

</script>

<style scoped>
  .icon{
    background-image:url(../assets/imgs/icon_csgo.png);
  }
  .icon0{
    background-position: -34px 0;
  }
  .icon1{
    background-position: 0 -68px;
  }
  .icon2{
    background-position: -68px 0;
  }
  .icon3{
    background-position: -34px -68px;
  }
  .icon4{
    background-position: -68px -34px;
  }
  .icon5{
    background-position: 0 -34px;
  }
  .icon6{
    background-position: -102px 0;
  }
  .yes{
    background-color:rgb(39,44,52);
    color:#fff;
    font-weight:800;
  }
  .no{
    background-color: rgb(39,44,52);
	color: white;
  }
  .no>h6{
	  color: white;
  }
  .datas:after{
    content: "";
    display: block;
    clear: both;
  }
  .el-input__inner{
    color: white;
  }
  .order{
    position: relative;
  }
  .order>li{
    float: none;
    background-color: rgb(45,47,62);
    width: 100px;
    border-top: rgb(55,58,76) solid 1px;
  }

  .el-breadcrumb__inner {
    color: white;
  }
  .i_Text {
    width: 240px;
    font-size: 12px;
    border-color: #3F5D97;
    color: #E4E8EE;
    background: #1c2942;
    border: 1px solid rgb(63, 93, 151);
    padding: 3px 6px;
    line-height: 24px;
    min-height: 24px;
    border-radius: 2px;
    vertical-align: middle;
  }
  .icon_find {
    background-image: url(../assets/imgs/icon.less.png);
    margin: 0 6px 0 0;
    background-position: 0 -570px;
    width: 14px;
    height: 14px;
    display: inline-block;
    overflow: hidden;
    vertical-align: middle;
    background-repeat: no-repeat !important;
  }
  .find {
    display: inline-block;
    height: 32px;
    line-height: 30px;
    padding: 0 22px;
    background: #3F5D97;
    color: #E1E5EC;
    font-size: 14px;
    vertical-align: middle;
    border-radius: 0 2px 2px 0;
    margin-left: -2px;
  }
  li{
    line-height: 30px;
  }
  .arrow {
      top: 20px;
      right: 10px;
      position: absolute;
      display: inline-block;
      background-image: url(/static/img/icon.less.32416e7.png);
      background-position: -28px -262px;
      width: 6px;
      height: 6px;
  }
  .el-breadcrumb__inner.is-link{
    color: white;
  }
  ul{
    float: none;
  }
  .el-pagination{
    white-space:inherit
  }
  .class_item{
    z-index: 2;
    width: 185px;
    position: absolute;
    background-color: rgb(45,47,62);
  }
  .class_item>li{
    z-index: 4;
    line-height: 30px;
    margin: 5px;
    width: 80px;
    height: 30px;
    background-color: rgb(53,55,72);
    border: 1px solid rgb(53,55,72);
  }
  .class_item>li:hover{
    color: #FFFFFF;
    background-color: rgb(72,75,95);
  }
  .data_s{
    padding: 20px 25px;
    background-color: white;
    border: 1px solid white;
  }
  .data_s::after{
    content: "";
    display: block;
    clear: both;
  }
  .datas_item{
	  cursor: pointer;
  }
  .datas_item:not(:nth-child(5n+1)){
    margin:0px 0px 20px 25px;
  }
  .datas_item>h3{
	 text-overflow: ellipsis;
	 overflow: hidden;
	 white-space: nowrap;
	 font-size: 14px;
  }
  .right>.right{
    cursor: pointer;
    width: 100px;
    height: 40px;
    margin: 8px;
    background-color: rgb(45,47,62);
  }
   .right>.el-input>input {
     color: #FFFFFF;
    background-color: rgb(28,32,43);
    border: 1px solid rgb(72,75,95);
  }
  .right>.el-input{
    margin: 8px;
    width: 80px;
    background-color: rgb(255,255,255,0.0001);
  }
  .block-header{
    height: 53px;
    background-color: rgb(28,32,43);
  }
  .block-header>*{
    color: rgb(136,141,148);
  }
  .block-header>ul>li{
    cursor: pointer;
    width: 170px;
    color: #929394;
    border-right: solid 1px rgb(48,59,79);
  }
  .tag>li:hover{
    background: rgb(39,44,52);
    color: #FFFFFF;
  }
  .block-header>ul>li>h6{
    font-size: 15px;
    line-height: 53px;
  }
  .el-input-group__append{
    background-color: rgb(63,93,151);
  }
  .no>.class_item{
    display: inline-block;
  }
  .dc_item{
    position: relative;
    margin:15px 10px 10px 0px;
    width: 80px;
    z-index: 1;
    color: #9a9b9e;
    font-size: 12px;
    border-radius: 5%;
    background-color: rgb(45,47,62);
  }
  .dc_item:hover{
    cursor: pointer;
    background-color: rgb(58,69,90);
    color: #FFFFFF;
  }
  .dc_item>ul{
    z-index: 1;
    position: absolute;
    top: 30px;
  }
  .dc_item li{
    color: rgb(228,232,238);
    background-color: rgb(45,47,62);
    width: 80px;
    cursor: pointer;
    border-top: solid 1px rgb(55,58,76);
    margin-top: 0px;
    float: none;
  }
  .dc_item li:hover{
    background-color: rgb(58,69,90);
  }
  .el-input__inner{
    color: #000000;
  }
    .el-input {
      width: 200px;
    }
    .input-with-select .el-input-group__prepend {
      background-color: #fff;
    }


  .flex{
    color: #8d9297;
    display: flex;
    width: 100%;
    padding: 20px 0px;
    border-bottom: 1px solid rgb(44,47,56);
  }
  .flex>li{
    position: relative;
    margin-right: 40px;
    cursor: pointer;
    flex: 1;
  }
  .flex>li:hover{
    background-color: rgb(45,47,62);
  }
  .classification{
    padding: 0px 40px;
    background-image: url(../assets/imgs/marcket-header-bg.png);
    background-repeat: no-repeat;
  }
  .classification:after{
    content:"";
    display:block;
    clear:both;
  }
  .el-breadcrumb{
    margin: 30px 0px;
  }
  .el-breadcrumb__inner{
    color: white;
  }
  .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link{
    color: white;
  }
  .el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover{color: white;}
</style>
