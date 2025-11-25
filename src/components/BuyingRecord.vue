<template>
	<div class="">
		<div class="block-header">

		</div>
		<div class="detail-tab-cont">
			<table class="list_tb" width="100%">
				<thead style="background-color: #F5F5F5;">
					<tr>
						<th width="20"></th>
						<th width="100">饰品</th>
						<th></th>
						<th class="t_Left" width="150">价格</th>
						<th class="t_Left">时间</th>
						<th class="t_Left" width="200">状态</th>
					</tr>
				</thead>
				<tbody class="list_tb_csgo" v-for="goods in goods.records">
					<tr>
						<td></td>
						<td>
							<div class="pic-cont">
								<a href="#">
									<img class="pic_info" :src="goods.url">
								</a>
							</div>
						</td>
						<td class="t_Left">
							<div class=""> <a href="#">
									<p class="eq_info" style="text-align: left;"><a href="#">{{goods.weaponsName}} |
											{{goods.name}} ({{goods.attrasionName}})</a></p>
								</a>
							</div>
						</td>
						<td class="t_Left"> <strong class="f_Strong">¥ {{goods.price}}</strong>
							<!-- <p class="eq_price"><strong>¥<span>449</span></strong></p> -->
						</td>
						<td class="c_Gray t_Left">{{goods.transactionDate}}</td>
						<td class="t_Left deliver-expire td_status">
							<p>{{goods.transactionStatus==3?"取消求购":"求购成功"}}</p>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				aa: "",
				bb: "",
				num: "0",
				selectPrice: true,
				pageSize: 1, //总页码
				pageNo: 1, //当前页码
				state: 2, //
				num1: 0,
				goods: "",
				pageNow:2

			}
		},
		mounted() {
			this.index(this.$parent);
		},
		methods: {
			index(parents) {
				this.$axios.get("http://localhost:8080/oms-buy/showMyOmsBuy", {
					params: {
						//用户ID
						id: sessionStorage.getItem("uid"),
						//库存状态
						state: this.state,
						//当前页码
						pageNo: this.pageNo,
						//枪支分类
						scid6:parents.type1Id,
            //模糊查询
            name:parents.selectInput,
						scid:parents.type2Id,
						scid2:parents.qualityId ,
						scid4:parents.categoryId ,
						scid5:parents.abrasionId ,
						scid3:parents.colorId,
						num1: this.num1
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
					console.log(erro)
				})
			},
		}
	}
</script>

<style>
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
		text-align: center;
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
		text-align: center;
		color: #FFFFFF;
	}

	a {
		text-decoration: none;
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

	.pic_info {
		height: 66px;
		max-width: 88px;
	}
</style>
