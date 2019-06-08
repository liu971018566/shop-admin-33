<template>
  <div>
    index
    <el-button type="primary">主要按钮</el-button>
    <p>
      <router-view></router-view>
    </p>
  </div>
</template>

<script>
// 请求测试接口，因为这样太麻烦，为了节省我们宝贵的时间，就把它绑定到main.js上
  // import axios from  "axios";
export default {
  mounted(){


    // 请求测试接口
  //   axios({
  //     url:"http://api.github.com/users",
  //     method:"GET",
  //     params:{
  //       abs:123
  //     }
  //   }).then(res => {
  //     console.log(res)
  //   })


  this.$axios({
    url:"https://api.github.com/users",
    method:"GET",
  }).then(res=>{
    console.log(res)
  })
  }
}
</script>

<style>

</style>
