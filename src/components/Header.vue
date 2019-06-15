<template>
    <div>
        <!--  el-row 是布局组件 
        type=flex声明是flex布局，并且带有降级方案（如果浏览器不支持flex，会自调用其他布局方式）-->
        <el-row type="flex" justify="space-between">
            <!-- 箭头 -->
            <div class="arrow" @click="handleClick">
                <i class="el-icon-back"></i>
            </div>
            <div>
            {{user.uname}}  {{user.realname}}    
             <button @click="handleLogout" class="logout">注销</button></div>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return{
            user:{}
        }
    },
   methods:{
       handleClick(){
           this.$emit("click");
       },

       handleLogout(){
        //    调用退出接口
        this.$axios({
            url:"http://localhost:8899/admin/account/logout",
            method:"GET",
            // 处理跨域
         withCredentials: true
        }).then(res => {
            const {status,message} = res.data;

            // 判断是否是退出
            if(status===0){
                this.$message.success(message);

                // 退出后，跳回登录页
                this.$router.push("/login");

                // 并清除本地用户数据
                localStorage.removeItem("user")
            }
        })
       }
   },

   mounted(){
    //  读取Vuex的store数据
    this.user = this.$store.state.user;
   }
}
</script>

<style scoped>
  .arrow{
      cursor: pointer;
  }
  .logout{
      cursor: pointer;
      height: 30px;
      width: 60px;
  }
</style>
