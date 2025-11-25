<template>
  <div>
    <div class="data public">
      <div class="collectionContent">
        <div class="ornamentsHeader" style="width: 880px;">
          <div class="mid_nav" >
            <div class="nav">
              <ul>
                <li><a href="">饰品收藏</a></li>
              </ul>
              <div class="fenge"></div>
            </div>
            <div class="nav_two">

              <div class="zcc" @mouseout="ina()" @mousemove="ind(1)">
                <p style="cursor: pointer;">筛选</p>
                <i class="arrow"></i>
                <ul v-show="aa==1"  class="address" style="width: 98px;">
                  <li @click="aaaa(10,$event)" style="cursor: pointer;">
                    <p value="" >不限</p>
                  </li>
                  <li v-for="weapon,index in weapons" class="" @mouseout="ina()" @mousemove="inb(index)"@click="item_val1(index,$event,weapon.id,weapon.name)" style="cursor: pointer;">
                    <p value="">{{weapon.name}}</p> <i class="arrow"></i>
                    <div v-show="bb==index" class="dagger" style="left: 99px; top: 1px; bottom: auto; ">
                      <p v-for="kid,indexs in weapon.kidList" value="weapon_knife_survival_bowie" @click="item_val2(kid.categoryName,$event,kid.id,kid.categoryName)">{{kid.categoryName}}</p>
                    </div>
                  </li>
                </ul>
              </div>
             <div class="zcc" v-for="quality,index in qualitys"  @mouseout="ina()" @mousemove="inc(index)">
                <p style="cursor: pointer;">{{quality.name}}</p>
                <i class="arrow"></i>
                <ul>
                  <li v-show="cc==index" @click="aaaa(index,$event)" ><p value="" style="cursor: pointer;">不限</p></li>
                  <li v-show="cc==index"  v-for="kid in quality.kidList" value="" style="width: 98px;cursor: pointer;" @click="types(index,kid.id,$event,kid.categoryName)">
                    <p >{{kid.categoryName}}</p>
                  </li>
                </ul>
              </div>
              <div class="right_find" style="float: right;width: auto;">
                <div class="">
                  <span style=" background: #222E48;border-color: #3F5D97;">
                    <input class="i_Text" name="search" placeholder="输入物品名称" size="30" type="text" v-model="skinName">
                  </span>
                  <a class="find" style="float: right;" href="javascript:; " @click="Showconllection()" ><i class="icon_find"></i>
                    搜索
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="ornamentsContent">
          <div id="whiteBck">
            <table width="100%" border="0" cellpadding="0" cellspacing="0">
              <tr style="background-color: rgb(245,245,245);">
                <td>饰品</td>
                <td></td>
                <td>当前在售最低</td>
                <td>当前求购最高</td>
                <td>操作</td>
              </tr>
              <tr v-for="shows in Show.records">

                <td width="120px">
                  <div>
                    <a href="#" class="bkbg">
                      <img :src="shows.url" width="48px" height="48px"/>
                    </a>
                  </div>
                </td>
                <td width="180px">
                  <h3>
                    <a href="#" style="color:#959595; font-size: 14px;  text-overflow: ellipsis; overflow: hidden; white-space: nowrap;" >{{shows.level2namel}}&nbsp;&nbsp;|&nbsp;&nbsp;{{shows.name}}({{shows.attrasionName}})</a>
                  </h3>
                </td>

            <span style="display: none;" >{{shows.id}}</span>
                <td width="150px" >￥<span>{{shows.minsale}}</span></td>
                <td width="150px" >￥<span>{{shows.maxsale}}</span></td>
                <td width="280px">
                  <el-button size="mini" type="primary" @click="mark()">前往购买</el-button>
                  <span style="cursor: pointer;" @click="noCollection(shows.id)" >已收藏<i class="el-icon-star-on" style="color: orange;"></i></span>
                </td>
              </tr>
            </table>
            <el-pagination
              background
              :page-size=pagesize
              :current-page=currentNo
              @current-change="toPage"
              layout="prev, pager, next"
              :total="goodsInfo">
            </el-pagination>
          </div>

        </div>

      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        aa: "",
        bb: "",
        cc:"-1",
            num:"0",
            weapons:"",
            qualitys:"",

        msg: "this is parent message",
            selectPrice:true,

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
        pagesize:5,
        goodsInfo:"",
        Show:"",
        skinid:"",

      }
    },
    methods: {
      mark(){
        this.$router.push("/Market")
      }
      ,
      ind(index) {
        this.aa = index
      },
      inb(index) {
        this.bb = index
      },
      inc(index){
        this.cc = index
      },
      ina() {
        this.aa = "-1"
        this.bb = "-1"
        this.cc = "-1"
      },
      item_val1(val,event,id,name){
        this.ina()
      	$(event.target).parent().parent().siblings("p").html(name)
      	//武器分类id
            this.type2Id=""
            this.type_name=name
            this.type1Id=id;
            // this.findGoods();
            this.Showconllection();
          },
        item_val2(val,event,id,name){
          this.ina()
      	  $(event.target).parent().parent().parent().siblings("p").html(name)
      	//武器的具体名称id
           this.type1Id=""
           this.type_name=name
        	 this.type2Id=id

           this.Showconllection();
         //  this.findGoods();
        },
        types(index,id,event,name){
          this.ina()
      	  $(event.target).parent().parent().siblings("p").html(name)
          if(index==0){
        	  this.qualityId=id;
          }else if(index==1){
        	  this.categoryId=id;
          }else if(index==2){
        	  this.abrasionId=id;
          }else if(index==3){
        	  this.colorId=id;
          }

           this.Showconllection();
          // this.$refs.index( );
        },
      noCollection(id){
        this.$confirm('确定要移除收藏吗?', '移除收藏', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
        }).then(() => {
          this.skinid=id;
          this.updateStatus();
          /* 收藏表删除相对应的收藏id,然后push页面*/
            }).catch(() => {
            });
      }, initWeapon(){
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
	  	this.$axios.get("http://localhost:8080/skin-category/initQualitys")
	  	.then(response=>{
	  	  let info=response.data;
	  	  if(info.code==200){
	  		  this.qualitys=info.data;

	        console.log(this.qualitys)
	  	  }
	  	}).catch(function(error){
	  	  console.log(error);
	  	})
	  },Showconllection(){

      this.$axios.get("http://localhost:8080/skin-collection/Showmycollection",{
              params: {
                userid: sessionStorage.getItem("uid"),
                typelevel1:this.type1Id,
                typelevel2:this.type2Id,
                quality:this.qualityId,
                category:this.categoryId,
                abrasion:this.abrasionId,
                skinName:this.skinName,
                currentNo:this.currentNo
              }
            })
      .then(response=>{
        let info=response.data;
        this.Show=info.data;
         this.goodsInfo=info.data.total


      }).catch(function(error){
        console.log(error);
      })
    },aaaa(index,event){
      this.ina()
      $(event.target).parent().parent().siblings("p").html("不限")
      if(index==0){
        this.qualityId=0;
      }else if(index==1){
        this.categoryId=0;
      }else if(index==2){
        this.abrasionId=0;
      }else if(index==10){
        this.type1Id=null;
         this.type2Id=null;
      }
      this.Showconllection();
    },toPage:function(index){

      this.currentNo=index
         this.Showconllection();
	  },updateStatus(){
      this.$axios.get("http://localhost:8080/skin-collection/updateStatus",{
              params: {
                userId: sessionStorage.getItem("uid"),
               skinId:this.skinid
              }
            })
      .then(response=>{
          location.reload()
      }).catch(function(error){
        console.log(error);
      })
    }
    }, mounted(){
      this.Showconllection();
      this.initQuality()
      this.initWeapon()
    }
  };

</script>

<style>
  *{
    margin: 0px auto;
    padding: 0px;
    text-decoration: none;
  }
  .collectionContent{
    margin: 0 2%;
    min-height: 600px;
    float: left;

  }
  #whiteBck {
    background-color: white;
    margin: 2% 0;
    min-height: 600px;
  }
  #whiteBck>table>tr>td{
    padding: 1% 0;
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
    margin: 0 30px;
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
    margin-top: 10px;
  }

  .nav_right span {
    margin-left: 20px
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

  .bkbg{
    background: url(../assets/imgs/item_bg.png) no-repeat;
    display: inline-block;
    position: relative;
    padding: 5%;
    margin:0% 0% 1% 4%;
    width: 80%
  }

</style>
