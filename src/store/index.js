// 导入vuex组件
import Vuex from "vuex";
import Vue from "vue";


//注册插件
Vue.use(Vuex);

// 调用vuex创建一个仓库
const store = new Vuex.Store({
    // 数据位置
    state :{
        // 读取本地的数据，如果没有设置为空
        user:JSON.parse(localStorage.getItem("user")) || {}
    },
    mutations: {
        // s设置用户数据
        // state是默认的参数，所有的mutations下的方法第一个参数都是state   
        // state 指向上面的仓库数据
        setUser(state,data){
            state.user = data; 



            // 保存到本地
            localStorage.setItem("user",JSON.stringify(data));
        }
    }
})

// 把自己暴露出去
export  default store;