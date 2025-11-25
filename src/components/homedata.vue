<template>
  <!-- 首页数据 -->
  <div class="data">
    <!-- 热门饰品 -->
    <div class="hot">
      <el-row class="public">
        <div class="section-header">
          <h2 class="section-title">热门饰品</h2>
          <el-link href="/Market" class="market-link" target="_blank">
            进入市场
            <i class="el-icon-caret-right"></i>
          </el-link>
        </div>

        <el-tabs v-model="hotvalue">
          <el-tab-pane label="CS:GO" name="csgo">
            <ul class="goods-grid">
              <li class="goods-item" v-for="hot in hotGoods" 
                  @click="goodsDetails(hot.id,hot.attributeId,hot.attrasionId,0)">
                <div class="goods-img">
                  <img :src="hot.url" :alt="hot.name"/>
                </div>
                <div class="goods-info">
                  <h3 class="goods-name">
                    {{hot.weaponsName}}({{hot.categoryName}}) | {{hot.name}}({{hot.attrasionName}})
                  </h3>
                  <p class="goods-price">¥{{hot.recommendPrice}}</p>
                </div>
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </div>
    <!-- 最新上架 -->
    <div class="latest">
      <el-row class="public">
        <div class="section-header">
          <h2 class="section-title">最新上架</h2>
          <el-link href="/Market" class="market-link" target="_blank">
            进入市场
            <i class="el-icon-caret-right"></i>
          </el-link>
        </div>

        <el-tabs value="csgo">
          <el-tab-pane label="CS:GO" name="csgo">
            <ul class="goods-grid">
              <li class="goods-item" v-for="ngs in newGoods" 
                  @click="goodsDetails(ngs.id,ngs.attributeId,ngs.attrasionId,0)">
                <div class="goods-img">
                  <img :src="ngs.url" :alt="ngs.name"/>
                </div>
                <div class="goods-info">
                  <h3 class="goods-name">
                    {{ngs.weaponsName}}({{ngs.categoryName}}) | {{ngs.name}}({{ngs.attrasionName}})
                  </h3>
                  <p class="goods-price">¥{{ngs.recommendPrice}}</p>
                </div>
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </div>
    <!-- 最新求购 -->
    <div class="buy">
      <el-row class="public">
        <div class="section-header">
          <h2 class="section-title">最新求购</h2>
          <el-link href="/Market" class="market-link" target="_blank">
            进入市场
            <i class="el-icon-caret-right"></i>
          </el-link>
        </div>

        <el-tabs value="csgo">
          <el-tab-pane label="CS:GO" name="csgo">
            <ul class="goods-grid">
              <li class="goods-item" v-for="nbg in newBuyGoods" 
                  @click="goodsDetails(nbg.id,nbg.attributeId,nbg.attrasionId,1)">
                <div class="goods-img">
                  <img :src="nbg.url" :alt="nbg.name"/>
                </div>
                <div class="goods-info">
                  <h3 class="goods-name">
                    {{nbg.weaponsName}}({{nbg.categoryName}}) | {{nbg.name}}({{nbg.attrasionName}})
                  </h3>
                  <p class="goods-price">¥{{nbg.price}}</p>
                </div>
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        categorys:[
          {name:'csgo',label:'CS:GO'}
          ],
        hotvalue:'csgo',
		hotGoods:[
		  {
			id: 1,
			url: 'https://img.csgo.com.cn/images/csgo/skins/weapon_ak47_am_nuclear_pattern_ak47_st.png',
			weaponsName: 'AK-47',
			categoryName: '步枪',
			name: '辐射危机',
			attrasionName: '崭新出厂',
			recommendPrice: '1299.00'
		  },
		  {
			id: 2, 
			url: 'https://img.csgo.com.cn/images/csgo/skins/weapon_awp_cu_awp_asimov.png',
			weaponsName: 'AWP',
			categoryName: '狙击枪',
			name: '二西莫夫',
			attrasionName: '略有磨损',
			recommendPrice: '899.00'
		  },
		  {
			id: 3,
			url: 'https://img.csgo.com.cn/images/csgo/skins/weapon_knife_karambit_am_marble_fade.png',
			weaponsName: '爪子刀',
			categoryName: '匕首',
			name: '大理石渐变',
			attrasionName: '崭新出厂',
			recommendPrice: '12999.00'
		  },
		  {
			id: 4,
			url: 'https://img.csgo.com.cn/images/csgo/skins/weapon_m4a1_silencer_cu_m4a1s_printstream.png',
			weaponsName: 'M4A1-S',
			categoryName: '步枪',
			name: '印花集',
			attrasionName: '崭新出厂',
			recommendPrice: '2499.00'
		  },
		  {
			id: 5,
			url: 'https://img.csgo.com.cn/images/csgo/skins/weapon_glock_aa_glock_18_urban_moon_fever.png',
			weaponsName: 'Glock-18',
			categoryName: '手枪',
			name: '月色狂欢',
			attrasionName: '崭新出厂',
			recommendPrice: '399.00'
		  }
		],
		newGoods:[
		  {
			id: 6,
			url: 'https://img.csgo.com.cn/images/csgo/skins/weapon_usp_silencer_cu_usp_printstream.png',
			weaponsName: 'USP-S',
			categoryName: '手枪',
			name: '印花集',
			attrasionName: '崭新出厂',
			recommendPrice: '899.00'
		  },
		  {
			id: 7,
			url: 'https://img.csgo.com.cn/images/csgo/skins/weapon_knife_butterfly_am_marble_fade.png',
			weaponsName: '蝴蝶刀',
			categoryName: '匕首',
			name: '大理石渐变',
			attrasionName: '崭新出厂',
			recommendPrice: '15999.00'
		  },
		  {
			id: 8,
			url: 'https://img.csgo.com.cn/images/csgo/skins/weapon_deagle_am_crystallized_dark.png',
			weaponsName: '沙漠之鹰',
			categoryName: '手枪',
			name: '黑色魅影',
			attrasionName: '略有磨损',
			recommendPrice: '699.00'
		  },
		  {
			id: 9,
			url: 'https://img.csgo.com.cn/images/csgo/skins/weapon_m4a4_cu_m4a4_temukau.png',
			weaponsName: 'M4A4',
			categoryName: '步枪',
			name: '喋血战士',
			attrasionName: '崭新出厂',
			recommendPrice: '1899.00'
		  },
		  {
			id: 10,
			url: 'https://img.csgo.com.cn/images/csgo/skins/weapon_awp_cu_awp_wildfire.png',
			weaponsName: 'AWP',
			categoryName: '狙击枪',
			name: '野火',
			attrasionName: '崭新出厂',
			recommendPrice: '2299.00'
		  }
		],
		newBuyGoods:[
		  {
			id: 11,
			url: 'https://img.csgo.com.cn/images/csgo/skins/weapon_knife_m9_bayonet_am_gamma_doppler_phase1.png',
			weaponsName: 'M9刺刀',
			categoryName: '匕首',
			name: '伽玛多普勒',
			attrasionName: '崭新出厂',
			price: '11999.00'
		  },
		  {
			id: 12,
			url: 'https://img.csgo.com.cn/images/csgo/skins/weapon_ak47_cu_ak47_asiimov.png',
			weaponsName: 'AK-47',
			categoryName: '步枪',
			name: '二西莫夫',
			attrasionName: '略有磨损',
			price: '1499.00'
		  },
		  {
			id: 13,
			url: 'https://img.csgo.com.cn/images/csgo/skins/weapon_awp_cu_awp_neo_noir.png',
			weaponsName: 'AWP',
			categoryName: '狙击枪',
			name: '黑色魅影',
			attrasionName: '崭新出厂',
			price: '899.00'
		  },
		  {
			id: 14,
			url: 'https://img.csgo.com.cn/images/csgo/skins/weapon_glock_am_gamma_doppler_phase1.png',
			weaponsName: 'Glock-18',
			categoryName: '手枪',
			name: '伽玛多普勒',
			attrasionName: '崭新出厂',
			price: '299.00'
		  },
		  {
			id: 15,
			url: 'https://img.csgo.com.cn/images/csgo/skins/weapon_knife_stiletto_am_marble_fade.png',
			weaponsName: '短剑',
			categoryName: '匕首',
			name: '大理石渐变',
			attrasionName: '崭新出厂',
			price: '8999.00'
		  }
		]
      }
    },
    methods:{
      show:function(ele){
        this.hotvalue=ele;
      },
	  goodsDetails(skinId,abId,asId,sellOrBuyId){
		  this.$router.push({path:"/GoodsInfo/CurrentSale",
							query:{goodsId:skinId,
								   attributeId:abId,
								   attrasionId:asId,
								   sellOrBuy:sellOrBuyId}});
	}
    },
	mounted() {
		this.getHotGoods();
		this.getNewGoods();
		this.getNewBuyGoods();
	}
  }
</script>

<style scoped>
/* 整体容器样式 */
.data {
  max-width: 1280px;
  margin: 0 auto;
  padding: 20px;
}

/* 区块样式 */
.hot, .latest, .buy {
  margin-bottom: 40px;
  padding: 20px;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

/* 区块背景图片 */
.hot {
  background: linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)),
             url(../assets/imgs/index-section1-bg.jpg) center/cover;
}

.latest {
  background: linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)),
             url(../assets/imgs/index-section2-bg.jpg) center/cover;
}

.buy {
  background: linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)),
             url(../assets/imgs/index-section3-bg.jpg) center/cover;
}

/* 标题栏样式 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #eef2f7;
}

.section-title {
  font-size: 24px;
  color: #2c3e50;
  font-weight: 600;
  position: relative;
  padding-left: 15px;
}

.section-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 24px;
  background: #409EFF;
  border-radius: 2px;
}

.market-link {
  font-size: 16px;
  color: #409EFF;
  transition: all 0.3s;
  padding: 8px 16px;
  border-radius: 20px;
  background: rgba(64, 158, 255, 0.1);
}

.market-link:hover {
  color: #fff;
  background: #409EFF;
}

/* 商品网格样式 */
.goods-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  padding: 0;
  list-style: none;
}

/* 商品卡片样式 */
.goods-item {
  width: 100%;
  min-width: 190px;
  max-width: 230px;
  margin: 0 auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  overflow: hidden;
}

.goods-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.goods-img {
  position: relative;
  width: 100%;
  height: 150px;
  overflow: hidden;
  background: #f8f9fa;
}

.goods-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.goods-item:hover .goods-img img {
  transform: scale(1.08);
}

.goods-info {
  padding: 10px;
  background: #fff;
}

.goods-name {
  font-size: 12px;
  color: #2c3e50;
  margin: 0 0 6px;
  line-height: 1.3;
  height: 32px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.goods-price {
  font-size: 18px;
  color: #f56c6c;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
}

.goods-price::before {
  content: '¥';
  font-size: 14px;
  margin-right: 2px;
}

/* Tab样式优化 */
:deep(.el-tabs__nav-wrap) {
  margin-bottom: 25px;
}

:deep(.el-tabs__item) {
  font-size: 16px;
  padding: 0 25px;
  height: 40px;
  line-height: 40px;
  transition: all 0.3s;
}

:deep(.el-tabs__item.is-active) {
  color: #409EFF;
  font-weight: 500;
}

/* 暗色主题适配 */
@media (prefers-color-scheme: dark) {
  .hot, .latest, .buy {
    background-color: rgba(26, 26, 26, 0.95);
  }
  
  .goods-item {
    background: #1a1a1a;
  }
  
  .goods-info {
    background: #1a1a1a;
  }
  
  .goods-name {
    color: #e5e5e5;
  }
  
  .section-title {
    color: #e5e5e5;
  }
  
  .section-header {
    border-bottom-color: #2c3e50;
  }
}

/* 响应式布局 */
@media screen and (max-width: 1440px) {
  .data {
    max-width: 1200px;
  }
  
  .goods-item {
    min-width: 180px;
    max-width: 220px;
  }
}

@media screen and (max-width: 1280px) {
  .goods-grid {
    grid-template-columns: repeat(4, 1fr);
  }
  
  .goods-item {
    min-width: 200px;
    max-width: 240px;
  }
}

@media screen and (max-width: 992px) {
  .data {
    padding: 20px;
  }
  
  .goods-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .goods-item {
    min-width: 220px;
    max-width: 260px;
  }
}

@media screen and (max-width: 768px) {
  .goods-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .goods-item {
    min-width: 240px;
    max-width: 280px;
  }
}

@media screen and (max-width: 480px) {
  .goods-grid {
    grid-template-columns: repeat(1, 1fr);
  }
  
  .goods-item {
    min-width: 280px;
    max-width: 320px;
  }
}
</style>
