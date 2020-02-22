<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>快速诊断</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="menua">
      <el-table :data="orderdata" style="width: 100%" border>
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="id" width="100" label="单号" sortable></el-table-column>
        <el-table-column prop="date" label="时间"></el-table-column>
        <el-table-column prop="name" label="宠物姓名"></el-table-column>
        <el-table-column prop="username" label="主人" sortable></el-table-column>
        <el-table-column prop="question" width="300" label="问题"></el-table-column>
        <el-table-column width="100" label="操作">
          <template scope="scope">
            <el-button type="danger" @click="curepethandle(scope.row)" size="small">立即诊断</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="诊断" width="100%" :visible.sync="curedialog">
        <el-steps :active="active" finish-status="success">
          <el-step title="步骤 1"></el-step>
          <el-step title="步骤 2"></el-step>
          <el-step title="步骤 3"></el-step>
        </el-steps>
        <div class="card" v-show="active == 1">
          <el-form ref="cureform" :model="cureform" label-width="80px">
            <el-form-item prop="name" label="宠物名">
              <el-input v-model="cureform.name"></el-input>
            </el-form-item>
            <el-form-item prop="date" label="挂号时间">
              <el-input v-model="cureform.date"></el-input>
            </el-form-item>
            <el-form-item prop="username" label="主人">
              <el-input v-model="cureform.username"></el-input>
            </el-form-item>
            <el-form-item prop="question" label="问题">
              <el-input v-model="cureform.question" type="textarea"></el-input>
            </el-form-item>
            <el-form-item prop="answer" label="诊断">
              <el-input v-model="cureform.answer" type="textarea"></el-input>
            </el-form-item>
          </el-form>
          <el-button size="mini">取消</el-button>
          <el-button @click="step1" type="primary" size="mini">下一步</el-button>
        </div>
        <div  v-show="active == 0">
          <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form :inline="true">
              <el-form-item>
                <el-input
                  v-model="medicname"
                  prefix-icon="el-icon-search"
                  clearable
                  placeholder="药品名"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="findmedic" type="primary">查询</el-button>
              </el-form-item>
              <el-form-item>
                <el-button  type="primary">重置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <!--表格数据-->
          <el-table :data="medicinedata"  style="width: 100%" border>
            <el-table-column type="index" width="60"></el-table-column>
            <el-table-column prop="id" width="100" label="药品ID" sortable></el-table-column>
            <el-table-column prop="name" label="药品名称"></el-table-column>
            <el-table-column prop="price" label="药品单价(元)"></el-table-column>
            <el-table-column prop="date" label="生产日期"></el-table-column>
            <el-table-column prop="type" label="药品规格"></el-table-column>
            <el-table-column prop="num" label="药品库存(盒)"></el-table-column>
            <el-table-column prop="note" label="备注信息"></el-table-column>
            <el-table-column width="200" label="添加数量">
              <template scope="scope">
                <el-input-number v-model="anum" size='small' :min="1" label="描述文字"></el-input-number>
                <el-button size="small" @click="ordermedic(scope.$index,scope.row)">添加</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button size="mini">取消</el-button>
          <el-button @click="step1" type="primary" size="mini">下一步</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.getorderdata();
  },
  data() {
    return {
      anum: 1,
      active: 0,
      medicname: "",
      medicinedata: [],
      cureform: {},
      addmedichandle: false,
      curedialog: false,
      orderdata: []
    };
  },
  methods: {
    step1() {
      var tRegist = {
        id: this.cureform.id,
        resoved: 1,
        answer: this.cureform.answer
      };
      console.log(tRegist);

      this.$putRequest("/curepetform", tRegist).then(res => {
        console.log(res);
      });
    },
    getorderdata() {
      this.$getRequest("/getdoctororderlist?resove=" + "0").then(res => {
        console.log(res);
        this.orderdata = res.data.data.list;
      });
    },
    curepethandle(row) {
      this.curedialog = true;
      this.cureform = Object.assign({}, row);
      
    },
    findmedic() {
      this.medicname;
      this.$getRequest("/getallmedicine?" + "&parms=" + this.medicname).then(
        res => {
          this.medicinedata = res.data.data.list;
        }
      );
    },
    ordermedic(index,row){

      this.medicinedata[index].num = row.num -this.anum
      
    }
  }
};
</script>

<style>
.card {
  margin-top: 20px;
  width: 600px;
}
</style>