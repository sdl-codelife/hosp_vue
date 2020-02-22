<template>
  <div>
    <el-table :data="orderdata" style="width: 100%" border>
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="id" width="100" label="单号" sortable></el-table-column>
      <el-table-column prop="date" label="挂号时间"></el-table-column>
      <el-table-column prop="name" label="宠物姓名"></el-table-column>
      <el-table-column prop="username" label="主人" sortable></el-table-column>
      <el-table-column prop="doctorname" label="医生"></el-table-column>
      <el-table-column prop="question" width="300" label="问题"></el-table-column>
      <el-table-column width="100" label="操作">
        <template scope="scope">
          <el-button type="danger" @click="deltemedicine(scope.row)" size="small">取消挂号</el-button>
        </template>
      </el-table-column>
    </el-table>
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
      this.$getRequest("/getorderlist?resove="+"1").then(res => {
        console.log(res);
        this.orderdata = res.data.data.list;
      });
    }
  }
};
</script>

<style>
</style>