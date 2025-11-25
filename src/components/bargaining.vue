<template>
  <div class="">
    <div class="block-header">
      <div class="l_left">
        <div class="w-OrderGroup">
          <div class="w-Order">
            <span>默认</span>
          </div>
          <div class="w-Order">
            <span>价格</span>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-tab-cont">
      <table class="list_tb" width="100%">
        <thead style="background-color: #F5F5F5;">
          <tr>
            <th width="20"></th>
            <th width="100">饰品</th>
            <th class=""></th>
            <th class="t_Left" width="150">定价</th>
            <th class="t_Left">报价</th>
            <th class="t_Left">买家</th>
            <th class="t_Left">时间</th>
            <th class="t_Left" width="200">操作</th>
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
                  <p class="eq_info" style="text-align: left;"><a href="#">{{goods.weaponsName}} | {{goods.name}} ({{goods.attrasionName}})</a></p>
                </a>
              </div>
            </td>
            <td class="t_Left"> <strong class="f_Strong">定价:¥ {{goods.price}}</strong>

            </td>
            <td class="t_Left">
            <p><strong class="f_Strong">报价:¥ {{goods.recommendPrice}}</strong></p>
            </td>
            <td class="t_Left">
              <a href="#">
                <img :src="goods.sellUrl" width="30" height="30"
                  class="user-thum"> {{goods.sellName}}
              </a>
            </td>
            <td class="c_Gray t_Left">{{goods.transactionDate}}</td>
            <td class="t_Left deliver-expire td_status">
                <p class="ye" @click="updateGoodsMy(goods.id,goods.sellId,goods.recommendPrice,goods.ooId,goods.buyerId)"><a href="">同意报价</a></p>
                <p class="ye" @click="updateNoHaggle(goods.ooId,goods.recommendPrice,goods.sellId)"><a href="">拒绝报价</a></p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
		data(){
			  return{
			  pageSize:1, //总页码
			  pageNo:1 ,//当前页码
			  sellid:1,//卖家id
			  state:"",//还价状态
			  goods:"",
			  pageNow:3
			  }
		},
    mounted() {
      $(".list_tb_csgo").mouseover(function() {
        $(this).css("background-color","rgb(245, 245, 245)")
      });
      $(".list_tb_csgo").mouseout(function() {
        $(this).css("background-color","rgb(250,250,250)")
      });
  this.index(this.$parent);
    },
	methods:{
		index(parents) {
				  this.$axios.get("http://localhost:8080/ums-capital-flow/show",{
					  params:{
						  //用户ID
						  sellid:sessionStorage.getItem("uid"),
						  //还价状态
						  status:0,
						  //当前页码
						  pageNo:1,
							  //枪支分类
						  scid6:parents.type1Id,
              //模糊查询
              name:parents.selectInput,
						  scid:parents.type2Id,
						  scid2:parents.qualityId ,
						  scid4:parents.categoryId ,
						  scid5:parents.abrasionId ,
						  scid3:parents.colorId
					  }
				  }).then(response =>{
					  let info =response.data
					  if(info.code ==200){
						  this.goods = info.data;
						  console.log(this.goods.records)
					  }
				  }).catch(function(erro){
					  console.log(erro)
				  })
		},
		updateGoodsMy(id,sellid,recommendPrice,ooId,buyerId) {
				  this.$axios.get("http://localhost:8080/oms-order/cancelGoodsYes",{
					  params:{
						id: sessionStorage.getItem("uid"),//用户ID,用来接收同意还价的金额
						skins_id:id,//皮肤ID

					   seller_id:sessionStorage.getItem("uid"), //卖家ID
						buyer_id:sellid, //买家id
					    balance:recommendPrice,  //还价金额
						status:2,    //还价状态,此处为同意还价
					    user_id:sellid,   //修改库存皮肤拥有权,此处传买家的id
						skin_id:id  ,//皮肤id
						ooId:ooId
					  }
				  }).then(response =>{
            alert("交易成功")
					 location.reload();
				  }).catch(function(erro){
					  console.log(erro)
				  })
		},
		updateNoHaggle(ooId,price,uid) {
				  this.$axios.get("http://localhost:8080/oms-order/updateNoHaggle",{
					  params:{
						id: sessionStorage.getItem("uid"),//用户ID,用来接收同意还价的金
						ooId:ooId,
            uid:uid,
            price:price
					  }
				  }).then(response =>{
					 location.reload();
				  }).catch(function(erro){
					  console.log(erro)
				  })
		}
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
  a{
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
