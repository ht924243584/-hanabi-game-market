// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import $ from 'jquery'
import VueCookie from 'vue-cookie'
import SlideVerify from 'vue-monoplasty-slide-verify';// 拼图验证码
import moment from 'moment'
Vue.use(SlideVerify);
Vue.use(moment);
import elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/icon/iconfont.css'
import './assets/css/common.css'
import './assets/css/header.css'
import './assets/css/home.css'
import './assets/css/footer.css'

Vue.prototype.$axios= axios;
Vue.config.productionTip = false;
Vue.use(elementui,SlideVerify,VueCookie)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
