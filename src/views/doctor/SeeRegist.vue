<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
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
            <el-button @click="findregist" type="primary">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="reset" type="primary">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-table :data="orderdata" style="width: 100%" border>
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="name" label="宠物姓名"></el-table-column>
        <el-table-column prop="id" label="单号" sortable></el-table-column>
        <el-table-column prop="date" label="挂号时间"></el-table-column>
        <el-table-column prop="question" label="问题"></el-table-column>
        <el-table-column width="150" label="操作">
          <template slot-scope="scope">
            <el-button type="danger" @click="seedetailhandle(scope.row)" size="small">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页 -->
      <el-pagination
        background
        layout="total, prev, pager, next"
        :total="total"
        :page-size="pagesize"
        :page-count="pagecount"
        :current-page="currentpage"
        style="margin-top:10px"
      ></el-pagination>
    </div>
    <el-dialog title="查看详情" :visible.sync="seedetaildialog">
      <el-row>
        <el-col :span="6">单号:{{form.id}}</el-col>
        <el-col :span="6">宠物名:{{form.name}}</el-col>
        <el-col :span="6">时间:{{form.date}}</el-col>
        <el-col :span="6">主人:{{form.userid}}</el-col>
      </el-row>
      <el-row>
        <el-col>问题:</el-col>
        <el-input type="textarea" :value="form.question"></el-input>
      </el-row>
      <el-row>
        <el-col>诊断:</el-col>
        <el-input type="textarea" :value="form.answer"></el-input>
      </el-row>
      <el-row>
        <el-col>用药:</el-col>
        <el-table :data="medicine" style="width: 100%" border>
          <el-table-column type="index" width="60"></el-table-column>
          <el-table-column prop="name" label="药品名"></el-table-column>
          <el-table-column prop="num" label="数量"></el-table-column>
          <el-table-column prop="price" label="单价"></el-table-column>
          <el-table-column prop="allprice" label="总价"></el-table-column>
        </el-table>
      </el-row>
      <div style="margin-left:300px"> 
              <el-button @click="seedetaildialog = false" type="success" icon="el-icon-check" circle></el-button>
            </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getorder();
  },
  data() {
    return {
      form: {},
      medicine: [],
      seedetaildialog: false,
      petname: "",
      orderdata: [],
      total: 0, //总条数
      pagesize: 6, //每页显示条数
      pagecount: 0, //总页数
      currentpage: 1 //当前页
    };
  },
  methods: {
    getorder() {
      this.$getRequest(
        "/getregistcomp?" +
          "pageNo=" +
          this.currentpage +
          "&pageSize=" +
          this.pagesize +
          "&name=" +
          this.petname
      ).then(res => {
        this.orderdata = res.data.data.list;
        this.total = res.data.data.total; //总条数
        this.pagesize = res.data.data.pageSize; //每页显示条数
        this.pagecount = res.data.data.pages; //总页数
        this.currentpage = res.data.data.pageNum; //当前页数
      });
    },
    findregist() {
      this.getorder();
    },
    reset() {
      this.petname = "";
      this.getorder();
    },
    seedetailhandle(row) {
      console.log(row);
      this.form = Object.assign({}, row);
      console.log(this.form);
      this.getmedicine(row.id);
      this.seedetaildialog = true;
    },
    getmedicine(id) {
      this.$getRequest("/getordermedicine?registid=" + id).then(res => {
        console.log(res);
        this.medicine = res.data.data;
      });
    }
  }
};
</script>

<style>
</style>