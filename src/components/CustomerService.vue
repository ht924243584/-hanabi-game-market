<template>
  <div>
    <div class="data public">
      <div class="serviceContent">
        <div>
          <h2>反馈记录</h2>
          <span>
            <el-button type="primary" size="mini" >提交反馈</el-button>
          </span>
        </div>
        <div>
          <table width="100%" border="0" cellpadding="0" cellspacing="0">
            <tr style="background-color: rgb(245,245,245);">
              <td>编号</td>
              <td>问题类型</td>
              <td>问题内容</td>
              <td>创建时间</td>
              <td>状态</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style>

  *{
    margin: 0px auto;
    padding: 0px;
    text-decoration: none;
  }
  .serviceContent{
    min-width: 840px;
    margin: 0 2%;
    min-height: 600px;
    float: left;
    background-color: white;
    padding: 2%;
  }
  .serviceContent>div>h2{
    float: left;
    display: inline-block;
    font-size: 14px;
  }
  .serviceContent>div>span{
    float: right;
  }
  .serviceContent>div{
    margin: 1% 0;
  }
  .serviceContent>div:after{
    content: '';
    display: block;
    clear: both;
  }
</style>
