<template>
  <div>
    <el-container class="is-vertical" :style="{backgroundImage: 'url(' +headerurl+ ')'} ">
      <hpheader></hpheader>
      <div class="data public">
        <div class="content">
          <div>
            <div class="mid_nav">
              <div class="nav">
                <ul>
                  <li>
                    <a href="javascript:void(0)" @click="clickwhite(1,$event)">
                      正在求购<i class="el-icon-caret-top" style="color: royalblue;"></i>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" @click="clickwhite(2,$event)">
                      求购记录<i class="el-icon-caret-top" style="color: royalblue;"></i>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" @click="clickwhite(3,$event)">
                      发布求购<i class="el-icon-caret-top" style="color: royalblue;"></i>
                    </a>
                  </li>
                </ul>
                <!-- <div class="nav_right" v-if="selectPrice==true">
                  <span>
                    正在求购:<span>0</span>
                  </span>
                  <span>
                    支出估算:<span>￥0</span>
                  </span>
                </div> -->
                <div class="fenge"></div>
              </div>
          <div class="nav_two">
            <div class="zcc" @mouseout="ina()" @mousemove="ind(1)">
              <p>筛选</p>
              <i class="arrow"></i>
              <ul v-show="aa==1"  class="address" style="width: 98px;">
                <li>
                  <p @click="ended($event)">不限</p>
                </li>
                <li v-for="weapon,index in weapons" class="" @mouseout="ina()" @mousemove="inb(index)">
                  <p value="" @click="item_val1(index,$event,weapon.id,weapon.name)">{{weapon.name}}</p> <i class="arrow"></i>
                  <div v-show="bb==index" class="dagger" style="left: 99px; top: 1px; bottom: auto; ">
                    <p v-for="kid,indexs in weapon.kidList" value="weapon_knife_survival_bowie" @click="item_val2(kid.categoryName,$event,kid.id,kid.categoryName)">{{kid.categoryName}}</p>
                  </div>
                </li>
              </ul>
            </div>
           <div class="zcc" v-for="quality,index in qualitys"  @mouseout="ina()" @mousemove="inc(index)">
              <p >{{quality.name}}</p>
              <i class="arrow"></i>
              <ul>
                <li @click="endeds(index,$event)" v-show="cc==index" style="width: 98px;">
                  <p>不限</p>
                </li>
                <li v-show="cc==index"  v-for="kid in quality.kidList" value="" style="width: 98px;" @click="types(index,kid.id,$event,kid.categoryName)">
                  <p >{{kid.categoryName}}</p>
                </li>
              </ul>
            </div>
            <div class="right_find" style="float: right;width: auto;">
              <div class="">
                <span style=" background: #222E48;border-color: #3F5D97;">
                  <input class="i_Text" name="search" placeholder="输入物品名称" v-model="selectInput" size="30" type="text">
                </span>
                <a @click="parentFindGoods()" class="find" style="float: right;" href="javascript:;"><i class="icon_find"></i>
                  搜索
                </a>
              </div>
            </div>
          </div>
            </div>
          </div>
          <router-view ref="info" :type1Id="type1Id" :type2Id="type2Id" :colore="colorId" :qualityId="qualityId" :categoryId="categoryId" :abrasionId="abrasionId"></router-view>
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
    components: {
      hpheader,
      hpnav,
      hpfooter
    },
    data() {
      return {
        aa: "",
        bb: "",
        cc:"-1",
        num:"0",
        weapons:"",
        qualitys:"",
        goodsInfo:"",
        headerurl:require("../assets/imgs/header-bg_csgo.jpg"),
        selectPrice:true,
        selectInput:"",//模糊查询名称
        type_name:"",//武器名字
        type1Id:"",//武器分类名字
        type2Id:"",//武器名字
        colorId:"",//颜色id
        qualityId:"",//品质ID
        categoryId:"",//类别id
        abrasionId:"",//外观id 磨损id
        skinName:"",
        currentNo:1,
        current:1,
        pagesize:5
      }
    },
	mounted() {
	  $(".nav>ul>li:first>a").css("color","white").find("i").show();
	  this.initQuality()
	  this.initWeapon()
	},
    methods: {
      ended(event){
         $(event.target).parent().parent().siblings("p").html("不限")
        this.type1Id="";
        this.type2Id="";
        this.parentFindGoods();
      }
      ,
      endeds(index,event){
        if(index==0){
          this.qualityId="";
          $(event.target).parent().parent().siblings("p").html("不限")
          this.parentFindGoods();
        }else if(index==1){
          this.categoryId="";
          $(event.target).parent().parent().siblings("p").html("不限")
          this.parentFindGoods();
        }else if(index==2){
          this.abrasionId="";
          $(event.target).parent().parent().siblings("p").html("不限")
          this.parentFindGoods();
        }else if(index==3){
          this.colorId="";
          $(event.target).parent().parent().siblings("p").html("不限")
          this.parentFindGoods();
        }
      }
      ,
			ind(index) {
				this.aa = index
			},
			inb(index) {
				this.bb = index
			},
			inc(index) {
				this.cc = index
			},
			ina() {
				this.aa = "-1"
				this.bb = "-1"
				this.cc = "-1"
			},
	item_val1(val,event,id,name){
		$(event.target).parent().parent().siblings("p").html(name)
		//武器分类id
        this.type2Id=""
        this.type_name=name
        this.type1Id=id
		// this.$refs.info.index(this);
		this.parentFindGoods();
      },
	  item_val2(val,event,id,name){
		  $(event.target).parent().parent().parent().siblings("p").html(name)
		//武器的具体名称id
	     this.type1Id=""
		 this.type_name=name
	  	 this.type2Id=id
		  // this.$refs.info.index(this);
		  this.parentFindGoods();
	  },
	  types(index,id,event,name){
		  $(event.target).parent().parent().siblings("p").html(name)
	    if(index==0){
	  	  this.qualityId=id;
		  // this.$refs.info.index(this);
		  this.parentFindGoods();
	    }else if(index==1){
	  	  this.categoryId=id;
		  // this.$refs.info.index(this);
		  this.parentFindGoods();
	    }else if(index==2){
	  	  this.abrasionId=id;
		  // this.$refs.info.index(this);
		  this.parentFindGoods();
	    }else if(index==3){
	  	  this.colorId=id;
		  // this.$refs.info.index(this);
		  this.parentFindGoods();
	    }

	  },
	  parentFindGoods(){
	  	   if(this.$refs.info.pageNow==1){
			   this.$refs.info.index(this)
		   }else if(this.$refs.info.pageNow==2){
			   this.$refs.info.index(this)
		   }else if(this.$refs.info.pageNow==3){
			   this.$refs.info.index(this)
		   }
	  },

      noCollection(){
        this.$confirm('确定要移除收藏吗?', '移除收藏', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
        }).then(() => {
          /* 收藏表删除相对应的收藏id,然后刷新页面*/
            }).catch(() => {
            });
      },
      clickwhite(index,event){
        this.selectPrice=false;
        if(index==3){
          this.$router.push({path:"/MyBuying/PostShopsInfo"});
        }else if(index==2){
          this.$router.push({path:"/MyBuying/BuyingRecord"});
        }else{
         this.selectPrice=true;
         this.$router.push({path:"/MyBuying/BuyingNow"});
        }
        var ele=event.target;//获得当前点击标签
        $(ele).css("color","white").find("i").show();
        $(ele).parent().siblings().find("a").css("color","#90969C").find("i").hide();

      },
	  initWeapon(){
	  	this.$axios.get("http://localhost:8080/skin-category/initWeapon")
	  	.then(response=>{
	  	  let info=response.data;
	  	  if(info.code==200){
	  		  this.weapons=info.data;
	  			  console.log(this.weapons)
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
	        console.log(this.qualitys)
	  	  }
	  	}).catch(function(error){
	  	  console.log(error);
	  	})
	  },
    },

  }

</script>

<style scoped>

  * {
    margin: 0px auto;
    padding: 0px;
  }
  .mid_nav {
    background-image: url(../assets/imgs/marcket-header-bg.png);
    color: #90969C;
    /* padding: 24px 0 0; */
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

  .nav {
    color: rgb(144, 150, 156);
    margin: 0px 30px;
  }

  .nav_two {
    color: rgb(144, 150, 156);
    margin: 0 30px;
    z-index: 10;
  }

  .nav span {
    font-size: 12px;
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

  .nav a {
    text-decoration: none;
    display: inline-block;
  }

  .fenge {
    overflow: hidden;
    width: 100%;
    height: 2px;
    line-height: 0;
    background-color: rgb(71, 115, 200);
  }
  .nav li {
    float: left;
    margin-right: 40px;
    cursor: pointer;
    font-weight: 700;
  }

  .nav li a {
    color: #90969C;

  }

  .nav_right {
    float: right;
    margin-top: 20px;
  }

  .nav_right>span {
    margin-left: 20px
  }
  .nav_right>span>span{
    color: orange;
  }

  .nav_two>div {
    width: 98px;
    visibility: visible;
    margin-right: 12px;
    float: left;
    margin-top: 13px;
    background: #2D2F3E;
    position: relative;
    border-bottom: 1px solid rgb(55, 58, 76);
  }

  .nav_two ul {
    position: absolute;
    z-index: 13;

  }

  .nav_two ul li {
    border-bottom: 1px solid rgb(55, 58, 76);
    background-color: rgb(45, 47, 62);
  }

  .nav_two>div p {
    text-align: left;
    font-size: 12px;
    padding: 0 0 0 9px;
    height: 32px;
    line-height: 32px;
    border-color: red;
  }

  .nav_two:after {
    content: '';
    display: block;
    clear: both;
    height: 20px;
  }

  .arrow {
    top: 20px;
    right: 10px;
    position: absolute;
    display: inline-block;
    background-image: url(../assets/imgs/icon.less.png);
    background-position: -28px -262px;
    width: 6px;
    height: 6px;
  }

  .nav_two ul li {
    position: relative;
    float: none;
    z-index: 12;
  }

  .nav_two ul li div {
    position: absolute;
    left: 100px;
    top: -1px;
    /* background: #fff; */
    borderb: 1px solid #F0F0F0;
    /* display: none; */
    max-height: 330px;
    overflow-x: hidden;
    overflow-y: auto;
    background: #2D2F3E;
  }

  .nav_two ul li div p {
    height: 32px;
    line-height: 30px;
    padding: 0 9px;
    white-space: nowrap;
  }
  .nav>ul{
    margin-top: 2%;
  }
  .nav>ul>li{
    margin-top: 1%;
  }
  .el-icon-caret-top{
    position: absolute;
    top: 125px;
    margin-left: -2%;
    display: none;
  }
</style>
