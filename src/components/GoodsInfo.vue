<template>
  <div>
    <el-container class="is-vertical">
      <hpheader></hpheader>
      <div class="data public">
        <div class="content">
          <div class="blank20"></div>
          <div class="headerRoute">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item @click="market()" style="color: white; cursor: pointer;" >饰品市场</el-breadcrumb-item>
              <el-breadcrumb-item>{{attribute.weaponsName}}|{{attribute.name}}|{{attribute.attrasionName}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="blank20"></div>
          <div class="details">
            <div class="detailImg">
              <div class="bg">
                <div class="imgs">
                  <img :src=attribute.url style="max-width: 269px;max-height: 176px;"/>
                </div>
                <div class="detailContent">
                  <div>
                    <span class="starOff" @click="findStatusZero()" v-show="collections==0" >
                      <span>收藏</span>
                      <i class="el-icon-star-off"></i>
                    </span>
                    <span class="starOn" @click="delCollection()" v-show="collections==1" >
                      <span>已收藏</span>
                      <i class="el-icon-star-on" style="color: orange;"></i>
                    </span>
                    <h1>{{attribute.weaponsName}}|({{attribute.categoryName}})|{{attribute.name}}({{attribute.attrasionName}})</h1>
                  </div>
                  <p>
                    <span>
                      <label>品质 | </label>{{attribute.qualityName}}
                    </span>
                    <span>
                      <label>类别 | </label>{{attribute.categoryName}}
                    </span>
                    <span>
                      <label>类型 | </label>{{attribute.weaponsName}}
                    </span>
                  </p>
                  <div class="blank20"></div>
                  <div class="detailSum">
                    <span>
                      <label>参考价格 | </label>
                      <strong>
                        ￥<big>
                          {{attribute.recommendPrice}}
                        </big>
                      </strong>
                    </span>
                    <div class="rightSum">
                      <a href="#">我要出售</a>
                      <a href="javascript:void(0)" @click="dialogShow()">我要求购</a>

                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="relativeGoods">
              <a href="javascript:void(0)" :class="color" :attrasionId="ab.attrasionId" v-for="ab in detalis" @click="colorClick($event,ab.currencyId,ab.id)">
                {{ab.attrasionName}} ￥ {{ab.recommendPrice}}
              </a>
            </div>
            <div class="blank20"></div>

            <div class="buyList">
              <div class="mid_nav">
                <div class="nav">
                  <ul>
                    <li>
                      <a href="javascript:void(0)" @click="clickwhite(1,$event)">
                        当前在售({{this.orderCount}})<i class="el-icon-caret-top" style="color: royalblue;"></i>
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" @click="clickwhite(2,$event)">
                        当前求购({{this.buyCount}})<i class="el-icon-caret-top" style="color: royalblue;"></i>
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" @click="clickwhite(3,$event)">
                        玩家秀<i class="el-icon-caret-top" style="color: royalblue;"></i>
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" @click="clickwhite(4,$event)">
                        成交记录<i class="el-icon-caret-top" style="color: royalblue;"></i>
                      </a>
                    </li>
                  </ul>
                  <div class="reDiv">
                    <div class="navRight" @mousemove="move()" @mouseleave="leave()" v-if="maxMinPrice==true">
                      ￥<input type="text" placeholder="最低价" v-model="minPrice"/>
                      -￥<input type="text" placeholder="最高价" v-model="maxPrice"/>
                    </div>
                  </div>
                  <div class="fenge"></div>
                  <div class="abDiv">
                    <div class="clearOrOk" @mousemove="move()" @mouseleave="leave()">
                      <a href="javascript:void(0)" @click="clear()">清除</a>
                      <a href="javascript:void(0)" @click="select()">确定</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="buyInfo">
              <router-view ref="buyInfo" :minPrice="minPrice" :maxPrice="maxPrice" :allNewAttrasionId="allNewAttrasionId"></router-view>
            </div>
          </div>
        </div>
      </div>
      </el-container>
      <hpnav></hpnav>
      <hpfooter></hpfooter>

	  <el-dialog title="发布求购" :visible.sync="dialogFormVisible" :append-to-body="true" :close-on-click-modal="false">
	  	<div class="dialogHeader">
			<div class="buyNowDialog">
				<div class="iconWrapper">
					<img :src=attribute.url height="80"/>
				</div>
				<div class="dialogContent">
					<ul>
						<li><span>求购饰品 | </span><span>{{attribute.weaponsName}}|({{attribute.categoryName}})|{{attribute.name}}({{attribute.attrasionName}})</span></li>
						<li><span>在售最低 | </span><span>{{this.lowOrderPrice}}</span></li>
						<li><span>求购最高 | </span><span>{{this.highBuyPrice}}</span></li>
					</ul>
				</div>
			</div>
			<div class="dialogFrom">
				<p>
					<span>求购单价</span><el-input  placeholder="请输入价格" v-model="inputPrice" class="he" ></el-input>
				</p>
				<p>
					<span>应付总额</span><span>￥{{this.inputPrice}}</span>
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

  import hpheader from './header.vue'
  import hpnav from './nav.vue'
  import hpfooter from './footer.vue'

  export default {
    components: {
      hpheader,
      hpnav,
      hpfooter

    },
    data(){
      return{
        maxMinPrice:true,
        color:"changeColorBlack",
        detalis:"",
        attribute:"",
        attrasionId:"",
        orderCount:"",
        currentOrderNo:1,
        minPrice:"",
        maxPrice:"",
        buyCount:"",
        commentCount:"",
        playerCount:"",
        collections:"",
        dialogFormVisible: false,
        highBuyPrice:"",
        lowOrderPrice:"",
        inputPrice:"",
        newAttrasionId:"",
        attrId:this.$route.query.attributeId,
        allNewAttrasionId:this.$route.query.attrasionId,
        newGoodsId:this.$route.query.goodsId,

      }

    },
    methods:{
      colorClick(event,attrasionId,goodsId){
        this.allNewAttrasionId=attrasionId;
        this.newGoodsId=goodsId;
        let ele=event.target;
        $(ele).removeClass("changeColorBlack").addClass("changeColorWhite").siblings().removeClass("changeColorWhite").addClass("changeColorBlack");
        /* 数据绑定后,根据不同的磨损度跳转不同的页面*/
        if(this.$route.query.sellOrBuy==0){
          this.findDetalis(1,attrasionId);
        }else if(this.$route.query.sellOrBuy==1){
          this.findBuyDetalis(1,attrasionId);
        }
        this.findSkinCollection();
        this.findBuyCount(1,attrasionId);
        this.findOrderCount(1,attrasionId);
        this.findCommentCount(1,attrasionId);


        this.childMethods();

      },
      findcount(){
        this.$axios.get("http://localhost:8080/oms-comment/findCommentCount",{
          params:{
            attrId:this.attrId
          }
        }).then(response=>{
          let result=response.data
          this.playerCount=result.data
        })
      },
      childMethods(){
        if(this.$refs.buyInfo.nowPage==1){
          this.$refs.buyInfo.findOrderInfo(this);
        }else if(this.$refs.buyInfo.nowPage==2){
          this.$refs.buyInfo.findBuyInfo(this);
        }else if(this.$refs.buyInfo.nowPage==4){
          this.$refs.buyInfo.findTransactionRecord(this);
        }
      },
      clickwhite(index,event){
        this.maxMinPrice=false;
        if(index==3){
          this.$router.push({path:"/GoodsInfo/Evaluate",
							query:{goodsId:this.newGoodsId,
								   attributeId:this.$route.query.attributeId,
								   attrasionId:this.allNewAttrasionId,
								   sellOrBuy:this.$route.query.sellOrBuy,
                  }});
        }else if(index==2){
          this.$router.push({path:"/GoodsInfo/BuyNow",
							query:{goodsId:this.newGoodsId,
                attributeId:this.$route.query.attributeId,
                attrasionId:this.allNewAttrasionId,
                sellOrBuy:this.$route.query.sellOrBuy,
                nowPage:2}});
        }else if(index==4){
         this.$router.push({path:"/GoodsInfo/TransactionRecord",
							query:{goodsId:this.newGoodsId,
							attributeId:this.$route.query.attributeId,
							attrasionId:this.allNewAttrasionId,
							sellOrBuy:this.$route.query.sellOrBuy,
              nowPage:4}});
        }else{
          this.maxMinPrice=true;
          this.$router.push({path:"/GoodsInfo/CurrentSale",
							query:{goodsId:this.newGoodsId,
							attributeId:this.$route.query.attributeId,
							attrasionId:this.allNewAttrasionId,
							sellOrBuy:this.$route.query.sellOrBuy,
              nowPage:1}});
        }
        var ele=event.target;//获得当前点击标签
        $(ele).css("color","white").find("i").show();
        $(ele).parent().siblings().find("a").css("color","#90969C").find("i").hide();

      },
      move(){
        $(".clearOrOk").show();
      },
      leave(){
        $(".clearOrOk").hide();
      },
      clear(){
        $(".navRight>input").val("");
        this.minPrice="";
        this.maxPrice="";
      },
      select(){
        this.$refs.buyInfo.findOrderInfo();
      },
	  findDetalis(index,attrasionId){
      let id="";
      if(index==0){
         id=this.$route.query.goodsId
      }
      this.$axios.get("http://localhost:8080/pms-skins/getGoodsDetalis",{
        params:{id:id,attributeId:this.$route.query.attributeId,attrasionId:attrasionId}
        // headers:{"token":sessionStorage.getItem("login_info")}
      }).then(response=>{
        let info=response.data;
        if(info.code==200){
          this.attribute=info.data;
        }}).catch(function(error){
           console.log(error);
        })
		},
		findBuyDetalis(index,attrasionId){
			let id="";
			if(index==0){
        id=this.$route.query.goodsId
			}
			this.$axios.get("http://localhost:8080/pms-skins/getBuyGoodsDetalis",{
				params:{id:id,attributeId:this.$route.query.attributeId,attrasionId:attrasionId}
				// headers:{"token":sessionStorage.getItem("login_info")}
			}).then(response=>{
				let info=response.data;
				if(info.code==200){
					this.attribute=info.data;
				}}).catch(function(error){
					 console.log(error);
				})
		},
		getAttrasionName(){
			this.$axios.get("http://localhost:8080/pms-skins/getAttrasionName",{
				params:{saId:this.$route.query.attributeId}
				// headers:{"token":sessionStorage.getItem("login_info")}
			}).then(response=>{
				let info=response.data;
				if(info.code==200){
					this.detalis=info.data;
          console.log(this.detalis);
				}}).catch(function(error){
				  console.log(error);
				})
		},
    getBuyAttrasionName(){
    	this.$axios.get("http://localhost:8080/pms-skins/getBuyAttrasionName",{
    		params:{saId:this.$route.query.attributeId}
    		// headers:{"token":sessionStorage.getItem("login_info")}
    	}).then(response=>{
    		let info=response.data;
    		if(info.code==200){
    			this.detalis=info.data;
    		}}).catch(function(error){
    		  console.log(error);
    		})
    },
		findOrderCount(index,attrasionId){
      let asId
      if(index==1){
        asId=attrasionId;
      }else{
        asId=this.$route.query.attrasionId
      }
			this.$axios.get("http://localhost:8080/oms-order/findOderCount",{
				params:{attributeId:this.$route.query.attributeId,
						attrasionId:asId,
						uId:sessionStorage.getItem("uid")}
				// headers:{"token":sessionStorage.getItem("login_info")}
			}).then(response=>{
				let info=response.data;
				if(info.code==200){
					this.orderCount=info.data;
				}}).catch(function(error){
				  console.log(error);
				})
		},
		findBuyCount(index,attrasionId){
      let asId
      if(index==1){
        asId=attrasionId;
      }else{
        asId=this.$route.query.attrasionId
      }
			this.$axios.get("http://localhost:8080/oms-buy/findBuyCount",{
				params:{attributeId:this.$route.query.attributeId,
						attrasionId:asId,
						uId:sessionStorage.getItem("uid")}
				// headers:{"token":sessionStorage.getItem("login_info")}
			}).then(response=>{
				let info=response.data;
				if(info.code==200){
					this.buyCount=info.data;
				}}).catch(function(error){
				  console.log(error);
				})
		},
		findCommentCount(index,attrasionId){
      let asId
      if(index==1){
        asId=attrasionId;
      }else{
        asId=this.$route.query.attrasionId
      }
			this.$axios.get("http://localhost:8080/oms-comment/findCommentCount",{
				params:{attributeId:this.$route.query.attributeId,attrasionId:asId}
				// headers:{"token":sessionStorage.getItem("login_info")}
			}).then(response=>{
				let info=response.data;
				if(info.code==200){
					this.commentCount=info.data;

				}}).catch(function(error){
				  console.log(error);
				})
		},
		findSkinCollection(){
			this.$axios.get("http://localhost:8080/skin-collection/findSkinCollection",{
				params:{skinsId:this.newGoodsId,
						uId:sessionStorage.getItem("uid")}
				// headers:{"token":sessionStorage.getItem("login_info")}
			}).then(response=>{
				let info=response.data;
				if(info.code==200){
					this.collections=1;
				}else if(info.code==220){
					this.collections=0;
				}
				}).catch(function(error){
				  console.log(error);
				})
		},
		addCollection(){
			this.$axios.get("http://localhost:8080/skin-collection/addCollection",{
				params:{skinsId:this.newGoodsId,uId:sessionStorage.getItem("uid")}
				// headers:{"token":sessionStorage.getItem("login_info")}
			}).then(response=>{
				let info=response.data;
				if(info.code==200){
					this.collections=1;
				}}).catch(function(error){
				  console.log(error);
				})
		},
    findStatusZero(){
      this.$axios.get("http://localhost:8080/skin-collection/findStatusZero",{
      	params:{skinsId:this.newGoodsId,
						attributeId:this.$route.query.attributeId,
						attrasionId:this.allNewAttrasionId,
						uId:sessionStorage.getItem("uid")}
      	// headers:{"token":sessionStorage.getItem("login_info")}
      }).then(response=>{
      	let info=response.data;
      	if(info.code==200){
      		this.collections=1;
      	}else if(info.code==220){
          this.addCollection();
        }
        }).catch(function(error){
      	  console.log(error);
      	})
    },
		delCollection(){
			this.$axios.get("http://localhost:8080/skin-collection/updateStatus",{
				params:{skinId:this.newGoodsId,
						userId:sessionStorage.getItem("uid")}
				// headers:{"token":sessionStorage.getItem("login_info")}
			}).then(response=>{
				let info=response.data;
				if(info==1){
					this.collections=0;
				}}).catch(function(error){
				  console.log(error);
				})
		},
		dialogShow(){
			this.dialogFormVisible=true;
			this.findBuyHighPrice();
			this.findOrderLowPrice();
		}
		,
		findBuyHighPrice(){
			this.$axios.get("http://localhost:8080/oms-buy/findHighPrice",{
				params:{attributeId:this.$route.query.attributeId,
						attrasionId:this.$route.query.attrasionId,
						uId:sessionStorage.getItem("uid")}
				// headers:{"token":sessionStorage.getItem("login_info")}
			}).then(response=>{
				let info=response.data;
				if(info.code==200){
					this.highBuyPrice=info.data;
				}}).catch(function(error){
				  console.log(error);
				})
		},
		findOrderLowPrice(){
			this.$axios.get("http://localhost:8080/oms-order/findLowPrice",{
				params:{attributeId:this.$route.query.attributeId,
						attrasionId:this.$route.query.attrasionId,
						uId:sessionStorage.getItem("uid")}
				// headers:{"token":sessionStorage.getItem("login_info")}
			}).then(response=>{
				let info=response.data;
				if(info.code==200){
					this.lowOrderPrice=info.data;
				}}).catch(function(error){
				  console.log(error);
				})
		},
		addBuyNowInfo(){
			this.$axios.get("http://localhost:8080/oms-buy/addBuyNowInfo",{
				params:{goodsId:this.$route.query.goodsId,
						price:this.inputPrice,
						uId:sessionStorage.getItem("uid")}
				// headers:{"token":sessionStorage.getItem("login_info")}
			}).then(response=>{
				let info=response.data;
				if(info.code==200){
					this.dialogFormVisible=false;
				}}).catch(function(error){
          this.$message({
                    message: '求购添加失败!',
                    type: 'erorr',
                    duration:1000,
                    offset:200
                  });
					this.dialogFormVisible=false;
					console.log(error);
				})
		}

    },
    mounted() {
      this.findcount()
      $(".relativeGoods>a").removeClass("changeColorBlack").addClass("changeColorWhite").siblings().removeClass("changeColorWhite").addClass("changeColorBlack");
	   if(this.$route.query.sellOrBuy==0){
	     this.findDetalis(0,null);
	     this.getAttrasionName();
	   }else if(this.$route.query.sellOrBuy==1){
	     this.findBuyDetalis(0,null);
	     this.getBuyAttrasionName();
	   }
     this.findSkinCollection();
	   this.getAttrasionName();
	   this.findOrderCount();
	   this.findBuyCount();
	   this.findCommentCount();

     /* 最大值最小值显示判断*/
          if(this.$refs.buyInfo.nowPage==1){
            this.maxMinPrice=true;
          }else{
            this.maxMinPrice=false;
          }
    },
    market(){
      this.$router.push({"path":"/Market"})
    }
  }


</script>

<style scoped="">
  .el-breadcrumb__inner {
      color: white;
  }
  *{
    margin: 0px auto;
    /* padding: 0px; */
    text-decoration: none;
  }
  .buyInfo{
    margin-top: 10px;
  }
  .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link{
    font-weight: 700;
        text-decoration: none;
        -webkit-transition: color .2s cubic-bezier(.645,.045,.355,1);
        transition: color .2s cubic-bezier(.645,.045,.355,1);
        color: white
  }
  .el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
      font-weight: 400;
      color: white;
      cursor: text;
  }
  .blank20{
    height: 20px;
    overflow: hidden;
    font-size: 0;
    line-height: 0;
  }
  .bg{
    background: url(../assets/imgs/detail-header-bg.jpg)no-repeat;
    border-radius: 2px;
    width: 1200px;
    height:194px;
    overflow: hidden;
  }
  .imgs{
    background: url(../assets/imgs/goods_detail_bg.png) no-repeat;
    text-align: center;
    float: left;
    width: 287px;
    height:194px;
  }
  .detailContent{
    margin: 2% 0;
    text-align: left;
    color: white;
  }
  .detailContent>div>h1{
    font-size: 24px;
    line-height: 24px;
  }
  .detailContent>div:first-of-type>span{
    float: right;
    margin-right: 1%;
    font-size: 14px;
    cursor: pointer;
  }
  .detailContent>p{
    margin: 1% 0;
    font-size: 12px;
  }
  .detailContent>p>span{
    margin-right: 2%;
  }
  .detailContent>p>span>label{
    color: #90969C;
  }
  .detailSum>span{
    font-size: 12px;
    color: #90969C
  }
  .detailSum>span>strong{
    color: orange;
  }
  .rightSum{
    float: right;
    display: inline-block;
    width: 180px;
  }
  .rightSum>a{
    color: white;
    font-size: 14px;
    background-color:#45536C;
    padding: 5%;
    margin: 0 3%;
  }
  .rightSum>a:last-of-type{
    background-color: brown;
  }
  .relativeGoods{
    background: #1e2329;
    height: 70px;
    border-top: 1px solid #2A3C5A
  }
  .relativeGoods>a{
    font-size: 12px;
    border:1px solid #495B7E;
    padding: 1%;
    margin: 1% 1%;
    float: left;
  }
  .relativeGoods>a:first-of-type{
    margin-left: 4%;
  }
  .mid_nav {

    background-image: url(../assets/imgs/marcket-header-bg.png);
    color: #90969C;
    /* padding: 24px 0 0; */
  }
  ul{
    float: left;
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
    height: 50px;
  }
  .nav>ul{
    padding: 0px 30px;
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
    width: 1200px;
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
  .nav>ul{
    margin-top: 0.625rem;
  }
  .el-icon-caret-top{
    position: absolute;
    top: 440px;
    margin-left: -2%;
    display: none;
  }
  .navRight{
    z-index: 2;
    position: absolute;
    display: inline-block;
    margin-top: 14px;
    top: 30%;
    right: 20%;
  }
  .navRight>input{
    width: 56px;
    font-size: 12px;
    border-color: #484B5F;
    background-color:rgb(20,20,30) ;
    color: white;
    padding: 7px;
    text-align: center;
  }
  .abDiv{
    position: relative;
    left: 83%;
    z-index: 1;
  }
  .reDiv{
    position: relative;
    right: -20%;
  }
  .el-breadcrumb__inner {
      color: white;
  }
  .clearOrOk{
    width: 200px;
    position: absolute;
    background-color: rgb(45,47,62);
    display: none;
    margin-top: -4%;
    margin-left: 10px;
    z-index: 1;
  }
  .clearOrOk>a{
    color: white;
    font-size: 12px;
    background-color:#45536C;
    width:70px;
    padding: 3px;
    margin-top: 30%;
    margin-bottom: 10%;

  }

  .changeColorWhite{
    background-color:#45536C;
    color:white;
  }
  .changeColorBlack{
    background-color:rgb(30,35,41);
    color:#899ab9;
  }
  .dialogHeader{

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
  .he>>>input{
	  color: black;
  }
</style>
