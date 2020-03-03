<template>
  <div>
    <!-- 面包屑-->
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path:'/userhome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>我的预约</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="menua">
      <el-table :data="orderdata" style="width: 100%" border>
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="id" width="100" label="单号" sortable></el-table-column>
        <el-table-column prop="date" label="时间"></el-table-column>
        <el-table-column prop="name" label="宠物姓名"></el-table-column>
        <el-table-column prop="username" label="主人" sortable></el-table-column>
        <el-table-column prop="doctorname" label="医生"></el-table-column>
        <el-table-column prop="question" width="300" label="问题"></el-table-column>
        <el-table-column width="100" label="操作">
          <template slot-scope="scope">
            <el-button type="danger" @click="delteorder(scope.row)" size="small">取消</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
     <hr class="myhr"/>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getorderdata();
  },
  data() {
    return {
      orderdata: []
    };
  },
  methods: {
    getorderdata() {
      this.$getRequest("/getorderlist?resove=" + "0").then(res => {
        console.log(res);
        this.orderdata = res.data.data.list;
      });
    },
    delteorder(row) {
      this.$confirm("确定要取消吗？此操作不可恢复。", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$deleteRequest("/delteorderlist?id=" + row.id)
            .then(res => {
              this.$message.success("取消成功");
              this.getorderdata();
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(() => {
          this.$message.info("已取消操作");
        });
    }
  }
};
</script>

<style scopped>
.myhr{
   margin-top:200px;
}
</style>