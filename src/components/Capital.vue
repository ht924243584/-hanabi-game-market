<template>
  <div id="whiteBck">
    <table width="100%" border="0" cellpadding="0" cellspacing="0">
      <tr style="background-color: rgb(245,245,245);">
        <th>流水号</th>
        <th>类型</th>
        <th>变动金额</th>
        <th>余额(元)</th>
        <th>创建时间</th>
      </tr>
      <tr v-for="shows in shows">
        <th>{{shows.flowNumber}}</th>
        <th>{{shows.typeName}}</th>
        <th>{{shows.changeMoney}}</th>
        <th>{{shows.balance}}</th>
        <th>{{shows.createDate}}</th>

      </tr>
    </table>
  </div>
</template>

<script>
 export default {
    data() {
      return {
       typeName:"",
       shows:"",
       tr:""
      };
    },
    mounted() {
         this.Show();
    },
    beforeRouteUpdate(to,from,next) {
      next();

      this.tr=this.$route.query.Transaction
      this.Show();
    },
    methods: {
     Show(){
       this.$axios.get('http://localhost:8080/ums-capital-flow/Show', {
             params: {
               id: sessionStorage.getItem("uid"),
               typeName:this.tr
             }
           })
           .then(response => {

             this.shows = response.data;
             console.log(response)

           })
           .catch(function(error) {
             console.log(error)
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
  #whiteBck {
    background-color: white;
    /* height: 600px; */
    min-height: 600px;
  }
  #whiteBck>table>tr>th{
    padding: 1% 0;
  }
</style>
