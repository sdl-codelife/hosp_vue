<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统消息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="widht:800px">
       <el-pagination
        background
        layout="total, prev, pager, next"
        :total="total"
        :page-size="pagesize"
        :page-count="pagecount"
        :current-page="currentpage"
        @current-change="currentpagehandle"
        style="margin-top:20px;margin-left:30px"
      ></el-pagination>
      <el-card class="box-card" v-for="(item) in message" :key="item.id">
        <el-link @click="seemessagehandle(item)" type="info">{{item.title}}</el-link>
        <br />
        <br />
        <a>{{item.createTime}}</a>
        <a style="float: right">发布人:{{item.createUser}}</a>
      </el-card>
       <!--分页 -->
    
    </div>
     
    <el-dialog title="查看信息" :visible.sync="seemessage">
      <h2>{{opemmessage.title}}</h2>
      <a>时间：{{opemmessage.createTime}}</a>
      <a>发布人：{{opemmessage.createUser}}</a>
      <br />
      <br />
      <a>{{opemmessage.content}}</a>
      <br />
      <el-button style="margin-top:20px" @click="seemessage = false" type="success" icon="el-icon-check" circle></el-button>
    </el-dialog>
    
  </div>
</template>

<script>
export default {
  mounted() {
    this.getmessage()
  },
  data() {
    return {
      total: 0, //总条数
      pagesize: 6, //每页显示条数
      pagecount: 0, //总页数
      currentpage: 1, //当前页
      opemmessage: {},
      seemessage: false,
      message: []
    };
  },
  methods: {
    seemessagehandle(item) {
      console.log(item);
      this.opemmessage = item;
      this.seemessage = true;
    },
    getmessage() {
      this.$getRequest(
        "/getallmessage?" +
          "pageNo=" +
          this.currentpage +
          "&pageSize=" +
          this.pagesize 
      ).then(res => {
        console.log(res);

        this.message = res.data.data.list;
        this.total = res.data.data.total; //总条数
        this.pagesize = res.data.data.pageSize; //每页显示条数
        this.pagecount = res.data.data.pages; //总页数
        this.currentpage = res.data.data.pageNum; //当前页数
      });
    },
    currentpagehandle(val){
      this.currentpage = val;
      this.getmessage();
    }
  }
};
</script>

<style scoped>
.box-card {
  margin: 40px;
  width: 400px;
  height: 120px;
  float: left;
}
</style>