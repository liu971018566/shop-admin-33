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

// vuex组件
// import store from "./store" ;


// 导入组件 
import Login from "./pages/Login.vue";
import Admin from "./pages/Admin.vue";
import GoodsList from "./pages/GoodsList.vue";
import CategoryList  from "./pages/CategoryList.vue";
import GoodsEdit from "./pages/GoodsEdit.vue";
import GoodsAdd from "./pages/GoodsAdd.vue";
import store from "./store"



// element :2 注册element-ui插件
Vue.use(ElementUI);

//2 注册路由
Vue.use(VueRouter);

//3 配置路由
const routes =[
  {path:"/",redirect:"/login",meta:"首页"},
  {path:"/login",component:Login,meta:"登录"},
  {path:"/admin",component:Admin,meta:"后台管理" ,children:[
    {path:"goods-list",component:GoodsList,meta:"商品列表"},
    {path:"category-list",component:CategoryList,meta:"栏目列表"},
    {path:"goods-edit/:id",component:GoodsEdit,meta:"编辑商品"},
    {path:"goods-add",component:GoodsAdd,meta:"添加商品"}
  ]}
] ;

// 4路由实例
const router= new VueRouter({ routes});

//设置一个路由卫士，用来检测是否登录过，如果没有登录过，则跳回登录页面。以前在ajax中是使用cookie 跟succ什么东东 来设置来检测是否登录过。在vue中使用一种新方法
// to   去哪个页面
// from 页面的来源
// next 是函数可以接受参数，参数url 可以跳转到该URL， 如果不传参数会跳转to的页面
// next （）方法是必须要调用的
router.beforeEach((to, from , next)=>{
            console.log(from );
            
            axios({
              url:"http://localhost:8899/admin/account/islogin",
              method:"GET",
              // 处理跨域session  跨域
              withCredentials: true
            }).then(res => {
              const {code} = res.data;
              console.log(code);
              
              // 访问的页面是登录页
              if(to.path==="/login"){
                if(code ==="logined"){
                  // 如果登录过了
                  next("/admin/goods-list");
                }else{
                  // 未登录
                  next();
                }
               
              }else{
                // 访问非登录页


                // 如果已经登录
                if(code==="logined") {
                  next();
                }else  {
                  // 未登录
                  next("/login");  
                }
              }
            });
          });
      




Vue.config.productionTip = false;
// 绑定到原形上
Vue.prototype.$axios = axios

new Vue({
  render: h => h(App),
  // 5挂载到路由
    router,

    // 仓库对象
    store,
}).$mount('#app')
