<template>
  <div id="whiteBck">
    <div>
      <table width="100%" border="0" cellpadding="0" cellspacing="0" >
        <tr style="background-color: rgb(245,245,245);">
          <th>消息内容</th>
          <th>时间</th>
        </tr>
        <tr v-for="shows in Show" >
          <th v-if="shows.sellerId==uid">
             您卖出了一个饰品获得了{{shows.price}}元
          </th>
          <th v-if="shows.buyerId==uid">
             您购买了一个饰品花费了{{shows.price}}元
          </th>
          <th>{{shows.receiptDate}}</th>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
       Show:"",
       uid:""
      }
    },
    mounted() {
      this.ShowOrder();
    },
    methods: {
      ShowOrder: function() {
        this.$axios.get('http://localhost:8080/oms-order/Show_Order', {
            params: {
              user: sessionStorage.getItem("uid")
            }
          })
          .then(response => {
            this.Show = response.data;
            console.log(this.Show)
            this.uid=sessionStorage.getItem("uid")
          })
          .catch(function(error) {
            console.log(error)
          })
      }
    }


  }
</script>

<style>
  *{
    margin: 0px auto;
    padding: 0px;
    text-decoration: none;
  }
  #whiteBck {
    background-color: white;
    /* height: 600px; */
    min-height: 600px;
  }
</style>
