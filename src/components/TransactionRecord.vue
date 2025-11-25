<template>
  <div>
     <div class="data public">
       <div class="content">
         <div class="buyingNow">
           <table width="100%" border="0" cellpadding="0" cellspacing="0">
             <tr style="background-color: rgb(245,245,245);">
               <td width="100px">饰品</td>
               <td></td>
               <td>价格</td>
               <td>时间</td>
             </tr>
			 <tr v-for="record in records">
				 <td><img :src="record.url" width="66px" height="66px"/></td>
				 <td>{{record.weaponsName}}|{{record.name}}|({{record.attrasionName}})</td>
				 <td>{{record.price}}</td>
				 <td>{{record.transactionDate}}</td>
			 </tr>
           </table>
         </div>
       </div>
      </div>
   </div>

</template>

<script>
  export default {
    props:["allNewAttrasionId"],
	  data(){
		  return{
			  records:"",
        childNewId:this.allNewAttrasionId,
        nowPage:4
		  }
	  },
	  mounted() {
		  $(".nav>ul>li:last>a").css("color","white").find("i").show();

		  this.findTransactionRecord();
	  },
	  methods:{
			findTransactionRecord(parents){
        if(parents){
          this.childNewId=parents.allNewAttrasionId;
        }
				this.$axios.get("http://localhost:8080/oms-order/findTransactionRecord",{
					params:{attributeId:this.$route.query.attributeId,
					attrasionId:this.childNewId,}
					// headers:{"token":sessionStorage.getItem("login_info")}
				}).then(response=>{
					let info=response.data;
					if(info.code==200){
						this.records=info.data;
					}}).catch(function(error){
					  console.log(error);
					})
			}
		}

  }
</script>

<style>

  * {
    margin: 0px auto;
    padding: 0px;
    text-decoration: none;
  }
  .buyingNow{
    min-height: 600px;
    width: 1200px;
  }
  .buyingNow>table>tr>td{
    padding: 5px 0;
    font-size: 15px;
  }
</style>
