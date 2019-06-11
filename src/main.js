import Vue from 'vue'
import App from './App.vue'
// 引入组件
import axios from 'axios'
//下载好路由后先引入
import VueRouter from "vue-router"

// element :1导入组件
import ElementUI from 'element-ui'

// element样式
import  'element-ui/lib/theme-chalk/index.css';

// 导入组件 
import Login from "./pages/Login.vue";
import Admin from "./pages/Admin.vue";
import GoodsList from "./pages/GoodsList.vue";
import CategoryList  from "./pages/CategoryList.vue";



// element :2 注册element-ui插件
Vue.use(ElementUI);

//2 注册路由
Vue.use(VueRouter);

//3 配置路由
const routes =[
  {path:"/",redirect:"/admin/goods-list",meta:"首页"},
  {path:"/login",component:Login,meta:"登录"},
  {path:"/admin",component:Admin,meta:"后台管理" ,children:[
    {path:"goods-list",component:GoodsList,meta:"商品列表"},
    {path:"category-list",component:CategoryList,meta:"栏目列表"},
  ]}
] ;

// 4路由实例
const router= new VueRouter({
  routes
});


Vue.config.productionTip = false;
// 绑定到原形上
Vue.prototype.$axios = axios

new Vue({
  render: h => h(App),
  // 5挂载到路由
    router
}).$mount('#app')
