<template>
	<div class="">
		<div class="block-header black">
		</div>
		<div class="detail-tab-cont">
			<table class="list_tb" width="100%">
				<thead style="background-color: #F5F5F5;">
					<tr>
						<th width="20"></th>
						<th width="100">饰品</th>
						<th></th>
						<th class="t_Left" width="150">求购单价</th>
						<th class="t_Left">推荐价</th>
						<th class="t_Left" @click="index()">发布时间</th>
						<th class="t_Left" width="200">状态</th>
					</tr>
				</thead>
				<tbody class="list_tb_csgo" v-for="goods in goods.records">
					<tr>
						<td></td>
						<td>
							<div class="pic-cont">
								<a href="#">
									<img width="66px" height="66px" class="pic_info" :src="goods.url">
								</a>
							</div>
						</td>
						<td class="t_Left">
							<div class=""> <a href="#">
									<p class="eq_info" style="text-align: left;"><a href="#">{{goods.weaponsName}} | {{goods.name}} ({{goods.attrasionName}})</a></p>
								</a>
							</div>
						</td>
						<td class="t_Left"> <strong class="f_Strong">¥ {{goods.price}}</strong>
							<!-- <p class="eq_price"><strong>¥<span>449</span></strong></p> -->
						</td>
						<td class="t_Left"> <strong class="f_Strong">¥ {{goods.recommendPrice}}</strong>
						<td class="c_Gray t_Left">{{goods.transactionDate}}</td>
						<td class="t_Left deliver-expire td_status">
							<p class="ye" style="color: white;" @click="updatePurchase(goods.id,goods.price)"><a href="">{{goods.transactionStatus==1?"取消求购":""}}</a></p>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	export default{
		data() {
		  return {
		    aa: "",
		    bb: "",
		    num:"0",
		    selectPrice:true,
			pageSize: 1, //总页码
			pageNo: 1 ,//当前页码
			state:1,//
			num1:0,
			goods:"",
			pageNow:1
		    }
		},
		mounted() {
		  this.index(this.$parent);
		},
		methods:{
			index(parents) {
					  this.$axios.get("http://localhost:8080/oms-buy/showMyOmsBuy",{
						  params:{
							  //用户ID
							  id:sessionStorage.getItem("uid"),
							  //库存状态
							  state:this.state,
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
							  num1:this.num1
						  }
					  }).then(response =>{
						  let info =response.data
							  if(this.num1==1){
								  this.num1=0
							  }else{
								  this.num1++
							  }
						  console.log(info.data)
						  if(info.code ==200){
							  this.goods = info.data;
						  }
					  }).catch(function(error){
						  console.log(erro)
					  })
			},
			updatePurchase(id,price) {
					  this.$axios.get("http://localhost:8080/oms-buy/updatePurchase",{
						  params:{
							  //用户ID
							  user_id:sessionStorage.getItem("uid"),
							  skins_id:id,
                price:price
						  }
					  }).then(response =>{
              this.$message({
                        message: '取消成功!',
                        type: 'success',
                        duration:1000,
                        offset:200
                      });
              location.reload();
					  }).catch(function(error){
						  console.log(erro)
					  })
			}
		}
	}
</script>

<style scoped>
.block-header {
		background: #1c202b;
		padding-bottom: 1px;
		min-height: 52px;
		margin-top: 15px;
	}

	table {
		border-collapse: collapse;
	}

	.list_tb th {
		background: #F5F5F5;
		font-size: 14px;
		color: #959595;
		font-weight: 400;
		height: 30px;
		line-height: 30px;
	}

	.detail-tab-cont {
		background: #fafafa;
		min-height: 466px;
	}

	.user-thum {
		border-radius: 50%;
	}

	.pic-cont {
		background-image: url(../assets/imgs/item_bg.png);
	}

	.list_tb td {
		padding: 20px 0;
		height: 50px;
	}

	.list_tb_csgo .pic-cont {
		width: 88px;
		height: 66px;
	}

	.list_tb_csgo {
		font-size: 14px;
		font-weight: 400;

	}

	.list_tb_csgo img {
		vertical-align: middle;
	}

	td,
	th {
		text-align: center;
	}

	a {
		color: #959595;
		text-decoration: none;
	}

	.list_tb td,
	.list_tb th {
		border-bottom: 1px solid #E9E9E9;
	}
	.ye{
	  display: inline-block;
	  background-color: #567fcd ;
	  padding: 10px 20px;
	  border-radius: 10%;

	}
	.ye a{
	  color: #FFFFFF;
	}
</style>
