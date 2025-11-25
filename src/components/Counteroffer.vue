<template>
  <div class="">
    <div class="block-header black">
      <div class="nav_mid_right">
        <div class="nav_two">
          <div class="zcc">
            <p>寄售交易</p>
          </div>
          <div class="zcc zxx">
            <p>还价状态</p>
            <i class="arrow"></i>
           <ul class="address address_right" style="width: 98px;">
              <li class="">
                <p value="">还价中</p>
              </li>
              <li class="">
                <p value="">还价成功</p>
              </li>
              <li class="">
                <p value="">还价失败</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-tab-cont">
      <table class="list_tb" width="100%">
        <thead>
          <tr>
            <th width="20"></th>
            <th width="120">饰品</th>
            <th></th>
            <th class="t_Left" width="110">价格</th>
            <th class="t_Left" width="110">报价</th>
            <th class="t_Left">卖家</th>
            <th width="200" class="t_Left">时间</th>
            <th width="250"> 状态 <i class="icon icon_qa"></i></span> </th>
          </tr>
        </thead>
        <tbody class="list_tb_csgo" v-for="goods in goods.records">
          <tr class="empty">
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
           <td class="t_Left"> <strong class="f_Strong">定价:¥ {{goods.price}}</strong></td>
           <td class="t_Left"> <strong class="f_Strong">报价:¥ {{goods.recommendPrice}}</strong></td>
            <td class="t_Left">
              <a href="#">
                <img :src="goods.buyerUrl" width="30" height="30"
                  class="user-thum">  {{goods.buyerName}}
              </a>
            </td>
            <td class="c_Gray t_Left">{{goods.transactionDate}}</td>
            <td class="t_Left deliver-expire td_status">
              <p>{{goods.transactionStatus== 0 ? "未同意" : (goods.transactionStatus == 1 ? "已拒绝" : "同意")}}</p>
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
				  id:2,//买家id
				  state:-1,//还价状态
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
      $(".zxx").mouseover(function(){
        $(".address_right").css("display","block")
      });
      $(".zxx").mouseout(function(){
        $(".address_right").css("display","none")
      })
	  this.index(this.$parent)
    },
	methods:{
		index(parents) {
				  this.$axios.get("http://localhost:8080/ums-capital-flow/show",{
					  params:{
						  //用户ID
						  id:sessionStorage.getItem("uid"),
						  //还价状态
						  state:-1,
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
						  scid3:parents.colorId,
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
		}
	}
		
  }
</script>

<style>
  .block-header {
    background: #1c202b;
    padding-bottom: 1px;
    min-height: 52px;
    margin-top: 15px;
  }

  .nav_mid_right {
    float: right;
    margin-right: -20px;
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
  .address_right{
    display: none;
  }
</style>
