<template>
	<div class="">
		<div class="block-header">
			<div class="l_left">
				<div class="w-OrderGroup">
					<div class="w-Order" @click="index() ">
						<span @click="index()">价格<i class="icon_arrow"></i></span>
					</div>
				</div>
			</div>

		</div>
		<div class="eq_if" style="background-color: #FFFFFF;min-height: 466px;">
			<div class="" style="background: #fafafa;padding: 20px 25px;">
				<div class="" style="min-height: 466px;">
					<ul style="width: 1180px;">
						<li class="img_equipment" @click="dialogShow(goods.currencyId,goods.id,goods.attrasionId)" v-for="goods in goods.records">
							<a href="javascript:void(0)" style="height: 136px;" class="img_href">
								<img height="138" lazy width="138" :src="goods.url" />
							</a>
							<p class="eq_info"><a href="#">{{goods.weaponsName}}({{goods.categoryName}}) |
									{{goods.name}}({{goods.attrasionName}}</a></p>
							<p class="eq_price"><strong>¥<span>{{goods.recommendPrice}}</span></strong></p>
							<div class="">
								<a href="javascript:void(0)">解析</a>
							</div>
							<i class="icon_select icon_select_first"></i>

						</li>
					</ul>
				</div>
			</div>

      <el-pagination
        background
        :page-size=20
        :current-page=pageNo
        @current-change="toPage"
        layout="prev, pager, next"
        :total="goods.total">
      </el-pagination>

		</div>
		<el-dialog title="发布求购" :visible.sync="dialogFormVisible" :append-to-body="true" :close-on-click-modal="false">
			<div class="dialogHeader">
			<div v-for="bindingInfo in bindingInfo.records" class="buyNowDialog">
				<div class="iconWrapper">
					<img :src=bindingInfo.url height="80"/>
				</div>
				<div class="dialogContent">
					<ul>
						<li><span>求购饰品 | </span><span>{{bindingInfo.weaponsName}}|({{bindingInfo.categoryName}})|{{bindingInfo.name}}({{bindingInfo.attrasionName}})</span></li>
						<li><span>在售最低 | </span><span>{{lowOrderPrice}}</span></li>
						<li><span>求购最高 | </span><span>{{highBuyPrice}}</span></li>
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
	export default {
		props: ["type1Id", "type2Id", "colore", "qualityId", "categoryId", "abrasionId"],
		data() {
			return {
				aa: "",
				bb: "",
				num: "0",
				selectPrice: true,
				pageSize: 1, //总页码
				pageNo: 1, //当前页码
				status: 0, //上架状态 0未寄售 1寄售 2未拥有
				num1: 0,
				goods: "",
				pageNow: 3,
				dialogFormVisible: false,
				bindingInfo:"",
				inputPrice:"",
        lowOrderPrice:"",
        highBuyPrice:"",
        sk_id:"",
        balance:''

			}
		},
		mounted() {
			this.index(this.$parent);
      this.init();
		},
		methods: {
      toPage:function(index){
        this.pageNo=index
        console.log(this.$parent)
        this.index(this.$parent);
      }
      ,
			index(parents) {
				this.$axios.get("http://localhost:8080/pms-skins/goodsInfo", {
					params: {
						//当前页码
						pageNo: this.pageNo,
						//枪支分类
						scid6: parents.type1Id,
            //模糊查询
            name:parents.selectInput,
						scid: parents.type2Id,
						scid2: parents.qualityId,
						scid4: parents.categoryId,
						scid5: parents.abrasionId,
						scid3: parents.colorId,
						num1: this.num1,
					}
				}).then(response => {
					let info = response.data
					if (this.num1 == 1) {
						this.num1 = 0
					} else {
						this.num1++
					}
					console.log(info.data)
					if (info.code == 200) {
						this.goods = info.data;
					}
				}).catch(function(error) {
					console.log(error)
				})
			},
			dialogShow(id,iid,iiid){
				this.dialogFormVisible=true;
				this.findBuyHighPrice(iid,iiid);
				this.findOrderLowPrice(iid,iiid);
        this.sk_id=id;
				this.binding(id)
			},
			findBuyHighPrice(iid,iiid){
				this.$axios.get("http://localhost:8080/oms-buy/findHighPrice",{
					params:{
            attributeId:iid,//皮肤属性
							attrasionId:iiid,//磨损ID
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
			findOrderLowPrice(iid,iiid){
				this.$axios.get("http://localhost:8080/oms-order/findLowPrice",{
					params:{
            attributeId:iid,
							attrasionId:iiid,
							uId:sessionStorage.getItem("uid")}
					// headers:{"token":sessionStorage.getItem("login_info")}
				}).then(response=>{
					let info=response.data;
					if(info.code==200){
						this.lowOrderPrice=info.data;
            console.log(this.lowOrderPrice)
					}}).catch(function(error){
					  console.log(error);
					})
			},
			binding(id){
				this.$axios.get("http://localhost:8080/pms-skins/goodsInfo",{
					params:{
						pk_id:id,
						pageNo: this.pageNo,
					// headers:{"token":sessionStorage.getItem("login_info")}
					}
				}).then(response=>{
					let info=response.data;
					if(info.code==200){
						this.bindingInfo=info.data
            console.log(this.bindingInfo)
            console.log(this.lowOrderPrice)
					}}).catch(function(error){
					  console.log(error);
					})
			},
      init(){
        this.$axios.get("http://localhost:8080/ums-user/loadinguser",{
                params: {
                  id:sessionStorage.getItem("uid")
         }
              })
        .then(response=>{
          this.balance=response.data.balance;
        }).catch(function(error){
          console.log(error);
        })
      },
		addBuyNowInfo(){
      if(this.inputPrice<=0||!/^\d+$/.test(this.inputPrice)){
        this.$message({
                  message: '请输入大于0的数字',
                  type: 'erorr',
                  duration:1000,
                  offset:200
                });
        return
      }
      if(this.inputPrice>this.balance){
        this.$message({
                  message: '余额不足!不能求购',
                  type: 'erorr',
                  duration:1000,
                  offset:200
                });
        return
      }
			this.$axios.get("http://localhost:8080/oms-buy/addBuyNowInfo",{
				params:{
            goodsId:this.sk_id,
						price:this.inputPrice,
						uId:sessionStorage.getItem("uid")}
				// headers:{"token":sessionStorage.getItem("login_info")}
			}).then(response=>{
				let info=response.data;
				if(info.code==200){
					this.dialogFormVisible=false;
          this.$message({
                    message: '求购添加成功!',
                    type: 'success',
                    duration:1000,
                    offset:200
                  });
          location.reload()//刷新
				}}).catch(function(error){
          this.$message({
                    message: '求购添加失败!',
                    type: 'error',
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

<style>
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
