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
            <th class="t_Left" width="150">价格</th>
            <th class="t_Left">卖家</th>
            <th class="t_Left">时间</th>
            <th class="t_Left" width="200" >状态</th>
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
            <td class="t_Left"> <strong class="f_Strong">¥ {{goods.price}}</strong>
              <!-- <p class="eq_price"><strong>¥<span>449</span></strong></p> -->
            </td>
            <td class="t_Left">
              <a href="javascript:void(0)">
                <img :src="goods.buyerUrl" width="30" height="30"
                  class="user-thum"> {{goods.buyerName}}
              </a>
            </td>
            <td class="c_Gray t_Left">{{goods.transactionDate}}</td>
            <td class="t_Left deliver-expire td_status">
              <p>{{goods.transactionStatus==2?"已完成":"未完成"}}</p>
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
			  state:2,
			  goods:"",
			  pageNow:2
			  
		  }
	  },
    mounted() {
      $(".list_tb_csgo").mouseover(function() {
        $(this).css("background-color","rgb(245, 245, 245)")
      });
      $(".list_tb_csgo").mouseout(function() {
        $(this).css("background-color","rgb(250,250,250)")
      })
	  this.index(this.$parent)
    },
	methods:{
		index(parents) {
				  this.$axios.get("http://localhost:8080/oms-order/show",{
					  params:{
						  //用户ID
						  id:2,
						  //库存状态
						  state:2,
						  //当前页码
						  pageNo:1,
						  // 枪支分类
						  scid6:parents.type1Id,
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
