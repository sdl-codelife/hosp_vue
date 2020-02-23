<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>查看病历</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="menua">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
          <el-form-item>
            <el-input v-model="petname" prefix-icon="el-icon-search" clearable placeholder="宠物名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
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
            <el-button type="danger" @click="deltemedicine(scope.row)" size="small">查看诊断</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  mounted(){
      this.getorder()
  },
  data() {
    return {
      petname: "",
      orderdata:[]
    };
  },
  methods:{
      getorder(){
        this.$getRequest("/getdoctororderlist?resove=" + "1").then(res => {
       
        this.orderdata = res.data.data.list;
      });
      }
  }
};
</script>

<style>
</style>