<template>
    <!-- 轮播图 -->
    <el-row class="public">
      <div class="block">
        <el-carousel :height="bannerH+'px'" arrow="hover">
          <el-carousel-item class="image" v-for="item in images" :key="item.id">
            <div class="lbt_left left" align="left">
              <h1 style="color: white; font-size: 60px;">{{item.title}}</h1>
              <p style="color: rgb(210,211,213);">{{item.subtitle}}</p>
            </div>
            <div class="lbt_right  left">
              <img :src="item.url"  height="400px" alt="无图片" />
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-row>
</template>

<script>
  export default{
    data(){
      return{
        bannerH :400,
        images: [
          { id:1,title:'UU加速器',subtitle:'免费加速Steam令牌解决访问问题', url: require("@/assets/imgs/lbt-1.png")},
          { id:2,title:'交易防骗指南',subtitle:'务必阅读', url: require("@/assets/imgs/lbt-2.png")},
          { id:3,title:'BUFF移动端APP',subtitle:'随时随地便捷交易快人一步', url: require("@/assets/imgs/lbt-3.png")},
          { id:4,title:'最热门的饰品',subtitle:'好货推荐跟着买就对了', url: require("@/assets/imgs/lbt-4.png")},
          { id:5,title:'全新战队印花',subtitle:'现已开放交易', url: require("@/assets/imgs/lbt-5.png")},
          { id:6,title:'蛇噬武器箱皮肤',subtitle:'现已开放交易', url: require("@/assets/imgs/lbt-6.png")},
        ]
      }
    }
  }
</script>

<style>
</style>
