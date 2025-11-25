import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Market from '@/components/Market'
import index from '@/components/index'
import MyInfo from '@/components/MyInfo'
import Wallet from '@/components/Wallet'
import Recharge from '@/components/Recharge'
import Withdrawal from '@/components/Withdrawal'
import Capital from '@/components/Capital'
import AccountSetting from '@/components/AccountSetting'
import MessageCenter from '@/components/MessageCenter'
import Transaction from '@/components/Transaction'
import System from '@/components/System'
import MyCollection from '@/components/MyCollection'
import CustomerService from '@/components/CustomerService'
import MyBuying from '@/components/MyBuying'
import BuyingRecord from '@/components/BuyingRecord'
import BuyingNow from '@/components/BuyingNow'
import PostShopsInfo from '@/components/PostShopsInfo'
import bargaining from '@/components/bargaining'
import Counteroffer from '@/components/Counteroffer'
import inStock from '@/components/inStock'
import inventory from '@/components/inventory'
import Mysale from '@/components/Mysale'
import onsale from '@/components/onsale'
import purchaseHistory from '@/components/purchaseHistory'
import salerecord from '@/components/salerecord'
import GoodsInfo from '@/components/GoodsInfo.vue'
import CurrentSale from '@/components/CurrentSale.vue'
import BuyNow from '@/components/BuyNow.vue'
import Evaluate from '@/components/Evaluate.vue'
import TransactionRecord from '@/components/TransactionRecord.vue'
import fileup from '@/components/fileup.vue'



Vue.use(Router)
const router=new Router({
  mode: 'history',
  routes: [
    {
      path: '/fileup',
      name:'fileup',
      component: fileup
    }
    ,
    {
      path: '/Market',
      name:'Market',
      component: Market
    },
    {
      path: '/',
      component: index
    },
    {
      path: '/index',
      component: index
    },
    {
    path:'/myBuying',
    component:MyBuying,
    children:[
      {
        path:'buyingRecord',
        component:BuyingRecord
      },
      {
        path:'buyingNow',
        component:BuyingNow
      },
      {
        path:'postShopsInfo',
        component:PostShopsInfo
      }
    ]
    },
    {
      path: '/myInfo',
      component: MyInfo,
      children:[
        {
          path: 'wallet',
          component: Wallet,
          children:[
            {
              path: 'recharge',
              component: Recharge
            },
            {
              path: 'withdrawal',
              component: Withdrawal
            },
            {
              path: 'capital',
              component: Capital
            }
          ]
        },
        {
          path: 'accountSetting',
          component: AccountSetting
        },
        { path: 'messageCenter',
          component: MessageCenter,
          children:[
            {
              path: 'transaction',
              component: Transaction
            },
            {
              path: 'system',
              component: System
            }
          ]
        },
        {
          path: 'myCollection',
          component: MyCollection
        },
        {
          path:'customerService',
          component:CustomerService
        }
      ]
    },
    {
      path: '/Mysale',
      component: Mysale,
      children:[
        {
          path:'onsale',
          component:onsale
        },
        {
          path:'salerecord',
          component:salerecord
        },
        {
          path:'bargaining',
          component:bargaining
        }
      ]
    }
    ,
    {
      path: '/inventory',
      component: inventory,
      children:[
        {
          path:'inStock',
          component:inStock
        },
        {
          path:'purchaseHistory',
          component:purchaseHistory
        },
        {
          path:'Counteroffer',
          component:Counteroffer
        }
      ]
    },
    {
      path: '/Mysale',
      component: Mysale,
      children:[
        {
          path:'onsale',
          component:onsale
        },
        {
          path:'salerecord',
          component:salerecord
        },
        {
          path:'bargaining',
          component:bargaining
        }
      ]
    }
    ,
    {
      path: '/inventory',
      component: inventory,
      children:[
        {
          path:'inStock',
          component:inStock
        },
        {
          path:'purchaseHistory',
          component:purchaseHistory
        },
        {
          path:'Counteroffer',
          component:Counteroffer
        }
      ]
    },
    {
    	path:'/goodsInfo',
    	component:GoodsInfo,
    	children:[
    	{
    	  path:'currentSale',
    	  component:CurrentSale
    	},
    	{
    	  path:'buyNow',
    	  component:BuyNow
    	},
    	{
    	  path:'evaluate',
    	  component:Evaluate
    	},
    	{
    	  path:'transactionRecord',
    	  component:TransactionRecord
    	}
    	]
    }
  ]
})
// router.beforeEach((to,from,next)=>{
//     let username = null;
//     let name="session"
//     var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
//     if(arr=document.cookie.match(reg)){
//       username=unescape(arr[2]);
//     }else{
//       username=null;
//     }

//     if(to.path == "/index"){
//       next();
//     }else if(to.path == "/Market"){
//       next();
//     }else{
//       if(username == null){
//         console.log("跳转到首页!");
//         alert("请先登录!")
//         localStorage.setItem("currIndex","1")
//         next("/index");
//       }
//       next();
//     }
//     console.log("执行全局前置守卫,打印to:" + to.path);
//     console.log("执行全局前置守卫,打印from:" + from.path);
// })
export default router
