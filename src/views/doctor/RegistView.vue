<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
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
          <template slot-scope="scope">
            <el-button type="danger" @click="curepethandle(scope.row)" size="small">立即诊断</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="诊断" width="100%" :visible.sync="curedialog">
        <el-steps :active="active" finish-status="success">
          <el-step title="步骤 1" description="给出诊断结果"></el-step>
          <el-step title="步骤 2" description="搜索添加药品"></el-step>
        </el-steps>
        <div class="card" v-show="active == 0">
          <el-form :rules="cureformrule" ref="cureform" :model="cureform" label-width="80px">
            <el-form-item prop="name" label="宠物名">
              <el-input disabled v-model="cureform.name"></el-input>
            </el-form-item>
            <el-form-item prop="date" label="挂号时间">
              <el-input disabled v-model="cureform.date"></el-input>
            </el-form-item>
            <el-form-item prop="username" label="主人">
              <el-input disabled v-model="cureform.username"></el-input>
            </el-form-item>
            <el-form-item prop="question" label="问题">
              <el-input disabled v-model="cureform.question" type="textarea"></el-input>
            </el-form-item>
            <el-form-item prop="answer" label="诊断">
              <el-input v-model="cureform.answer" type="textarea"></el-input>
            </el-form-item>
          </el-form>
          <el-button @click="curedialog = false" size="mini">取消</el-button>
          <el-button @click="step1" type="primary" size="mini">下一步</el-button>
        </div>
        <div v-show="active == 1">
          <a>添加药品</a>
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
                <el-button @click="reset" type="primary">重置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
          <!--表格数据-->
          <el-table :data="medicinedata" style="width: 100%" border>
            <el-table-column type="index" width="60"></el-table-column>
            <el-table-column prop="id" width="100" label="药品ID" sortable></el-table-column>
            <el-table-column prop="name" label="药品名称"></el-table-column>
            <el-table-column prop="price" label="药品单价(元)"></el-table-column>
            <el-table-column prop="date" label="生产日期"></el-table-column>
            <el-table-column prop="type" label="药品规格"></el-table-column>
            <el-table-column prop="num" label="药品库存(盒)"></el-table-column>
            <el-table-column prop="note" label="备注信息"></el-table-column>
            <el-table-column width="200" label="添加数量">
              <template slot-scope="scope">
                <el-input-number
                  v-model="anum"
                  size="small"
                  :min="1"
                  :max="scope.row.num"
                  label="描述文字"
                ></el-input-number>
                <el-button size="small" @click="ordermedic(scope.$index,scope.row)">添加</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button @click="step1" type="primary" size="mini">下一步</el-button>
        </div>
        <el-row v-show="active === 2">
          <div style="margin-left:50px">诊断成功。打印挂号详单，药品列表，然后用户拿药付款,完成就诊。</div>
          <svg class="suicon" aria-hidden="true">
            <use xlink:href="#icon-wancheng" />
          </svg>
          <el-button @click="over" style="margin-top: 12px;margin-left:615px">完成</el-button>
        </el-row>
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
      cureformrule: {
        answer: [{ required: true, message: "请输入诊断", trigger: "blur" }]
      },
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
      this.$refs.cureform.validate(va => {
        if (!va) {
          return;
        }
        var tRegist = {
          id: this.cureform.id,
          resoved: 1,
          answer: this.cureform.answer
        };

        this.$putRequest("/curepetform", tRegist).then(res => {
          console.log(res);
        });
        if (this.active++ > 1) this.active = 0;
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
    reset() {
      this.medicname = "";
      this.medicinedata = [];
    },
    ordermedic(index, row) {
      console.log(row);

      this.medicinedata[index].num = row.num - this.anum;
      let torder = {
        id: row.id,
        name: row.name,
        price: row.price,
        allprice: row.price * this.anum,
        registid: this.cureform.id,
        num: this.anum
      };
      this.$putRequest("/ordermedicine", torder).then(res => {
        if (res.data.code == 200) {
          this.$postRequest("/addorder", torder).then(res => {
            console.log(res);
            this.$message.success("添加成功");
          });
        }
      });
    },
    over() {
      this.getorderdata();
      this.curedialog = false;
      this.active = 0;
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