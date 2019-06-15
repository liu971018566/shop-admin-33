<template>
  <div>
    <!--  商品列表的顶部-->
    <el-row type="flex" justify="space-between">
      <!-- 按钮列表 -->
      <div>
        <el-button type="warning" @click="handleAdd">新增</el-button>
        <el-button type="danger"  @click="handleDeleteMore">删除</el-button>
      </div>


        <!-- 搜索输入框-->
      <div class="input-search">
      <el-input
        class="input-with-select"
        placeholder="请输入内容"
        v-model="searchValue">
        <el-button 
        slot="append"
        icon="el-icon-search"
        @click="handleSearch"></el-button>
      </el-input>
      </div>
    </el-row>

    <!-- 表单列表 -->

    <!-- data 是表格数据 -->
    <!-- tooltip-effect  工具栏的效果 -->
    <!-- selection-change  选择表格每一项时候就触发的事件 -->
    <el-table
      ref="multipleTable"
      :data="tableData"  
      tooltip-effect="dark"
      style="width: 100%; margin-top:20px;" 
      @selection-change="handleSelectionChange"
    >

      <!--  type="selection" 表格可以选择方块 -->
      <el-table-column
       type="selection"
       width="55"> 
     </el-table-column>

        <!--label每一列的标题文字  -->
        <!-- width  当前列的宽度 -->
     <el-table-column
     label="标题"
     whith="300">
        
        <!--  自定义模块 -->
        <!-- template 的slot-scoped 的值模板的变量名scope -->
        <!-- scope.row每一项数据的对象 -->
        <template slot-scope="scope">
        <el-row type="flex" align="middle">
            <img :src="scope.row.imgurl"
            class="goods-img">
            <div>
                {{scope.row.title}}
            </div>
        </el-row>
       </template>
      </el-table-column>

          <!-- 显示数据的简写方式，
          指定prop属性自动读取每一项数据的prop值得属性 -->
      <el-table-column
      prop="categoryname"
      labele="类型"
      width="120">
      </el-table-column>
      
      <el-table-column
      prop="sell_price"
      aria-label="价格"
      width="120">
      </el-table-column>

        <!-- 操作栏 -->
        <el-table-column label="操作">
            <!-- 自定义模块 -->
        <template slot-scope="scope">
            <!-- 编辑事件 -->
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <!-- 删除单个商品 -->
          <el-button size="mini"
           type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


                        <!--分页 -->
            <!-- size-change 显示条数切换 -->
            <!-- current-change 页数切换 -->
            <!-- current-page  当前的页面-->
            <!-- page-sizes  条数的选项 -->
            <!-- page-size d当前条数 -->
            <!-- layout 默认布局 -->
            <!-- total 数据全部条数 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[5,10,15,20]"
      :page-size="5"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
      
          
          return {
              input:'',
      tableData: [
          
            // id: 103,        
            // title: "骆驼男装2017秋季新款运动休闲纯色夹克青年宽松长袖针织开衫卫",
            // is_top: 1,
            // is_hot: 1,
            // is_slide: 1,      
            // categoryname: "男装",
            // img_url: "/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg",
            // // imgurl:"http://127.0.0.1:8899/upload/201504/20/thumb_201504200214471783.jpg",
            // goods_no: "NZ0000000002",
            // stock_quantity: 200,
            // market_price: 1000,
            // sell_price: 800 
        ],
              
                selectGoods:[] ,//选中的商品， 
                searchValue:"",//搜索关键字


                pageIndex:1,//默认的页面。随着页面切换而变化，
                pageSize:5, //当前页面显示出来的数据数
                total:0, //总页数

    }
  },

            methods:{

                getList(){
                    //  封装 获取后台数据列表
                     // pageIndex 当前的页面 会变化
                    // pageSize 数据条数 会变化
                    // searchValue 搜索关键字
                    this.$axios({
                          url:`http://localhost:8899/admin/goods/getlist?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&searchvalue=${this.searchValue}`,
                          methods :"GET"
                    }).then(res =>{
                      // 打印一下res看看是什么，你要从里面获取什么
                      console.log(res);
                      
                      const data = res.data ;
                      // 商品列表的数据
                      this.tableData = data.message;

                      // z总条数
                      this.total = data.totalcount;
  
                    })
                },          
                // 选择框    点击每一项时就触发
            handleSelectionChange(id){
                console.log(id);
                this.selectGoods = id 
            },


               // 删除多项
            handleDeleteMore(){
              // 1获取当前选中的ID 
              // console.log(selectGoods);
              
             const arr = this.selectGoods.map(l => {
              //  map 是循环遍历数组，效果跟forEach 效果是一样的，但是比它使用起来更方便   L是一个回调函数名，
                 console.log(this.selectGoods);
                 return l.id
                 
             })
              // console.log(this.selectGoods)
              const ids = arr.join(",");
              console.log(arr);
              
              // join 数组拼接
// console.log(`http://localhost:8899/admin/goods/del/${ids}`)
              // 调用删除商品的接口
                    this.$axios({
                          url:`http://localhost:8899/admin/goods/del/${ids}`,
                          methods :"GET"
                    }).then(res => {
                      console.log(res);
                     const {status,message} = res.data
                            //  staus===0 就是成功，等于一就是失败
                      if(status===0){
                        // success
                            this.$message.success(message)
                            // 请求列表数据数据。就是删除成功后需要从新加载数据
                            this.getList();

                      } else {
                            this.$message.error(message);
                            
                      }

                   
                    })

            },

            // 编辑商品按钮事件
            handleEdit(goods){
                console.log(goods);
                this.$router.push("/admin/goods-edit/" + goods.id)
            },

            //   // 页面加载完成后立即发送请求获取数据
            // mounted(){
            //   this.getList();
            // },

            // 删除商品
            handleDelete(goods){
                console.log(goods);
                 const id = goods.id

                  this.$axios({
                          url:`http://localhost:8899/admin/goods/del/${id}`,
                          methods :"GET"
                    }).then(res => {
                      console.log(res);
                     const {status,message} = res.data
                            //  staus===0 就是成功，等于一就是失败
                      if(status===0){
                        // success
                            this.$message.success(message)
                            // 请求列表数据数据。就是删除成功后需要从新加载数据
                            this.getList();

                      } else {
                            this.$message.error(message);
                            
                      }
                    })
            
            },


            // 条数切换
            handleSizeChange(val){
                console.log(`每页${val}条`);
                this.pageSize = val
                this.getList();
            },


            // 页数切换
            handleCurrentChange(val){
                console.log(`当前页：${val}`);
                this.pageIndex = val
                this.getList();
           },


            // 处理搜索
            handleSearch(){
                  // 获取输入框的值
                  this.searchValue
                  // 发送请求，赋值searchValue
                  this.getList();
            },


            // 新增按钮触发后跳转页面事件
            handleAdd(){
              this.$router.push("/admin/goods-add")
            }
            },

           
            mounted(){
                // 因为请求数据的代码被封装了，所以在这里直接调用它
                this.getList()
                      
            }
            }
</script>

<style>
 .input-search > {
    width: 130px;
  }


.input-search {
  width: 200px;
}
  .goods-img{
      width:60px;
      height:60px;
      /*表示元素压缩的倍数，如果是0，表示不会被挤压*/
      flex-shrink: 0;
      margin-right:5px;
  }
</style>
