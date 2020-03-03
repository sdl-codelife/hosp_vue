<template>
  <div>
    <!-- 面包屑-->
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>药品管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="menua">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
          <el-form-item>
            <el-input v-model="medicname" prefix-icon="el-icon-search" clearable placeholder="药品名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="selectmedic" type="primary">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetselect" type="primary">重置</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="addmedicdialog = true" type="primary">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--表格数据-->
      <el-table :data="medicinedata" v-loading="listLoading" style="width: 100%" border>
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="id" width="100" label="药品ID" sortable></el-table-column>
        <el-table-column prop="name" label="药品名称"></el-table-column>
        <el-table-column prop="price" label="药品单价(元)"></el-table-column>
        <el-table-column prop="date" label="生产日期"></el-table-column>
        <el-table-column prop="type" label="药品规格"></el-table-column>
        <el-table-column prop="num" label="药品库存(盒)"></el-table-column>
        <el-table-column prop="note" label="备注信息"></el-table-column>
        <el-table-column width="200" label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="editmedichandle(scope.row)">编辑</el-button>
            <el-button type="danger" @click="deltemedicine(scope.row)" size="small">删除</el-button>
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
        @current-change="currentpagehandle"
        style="margin-top:10px"
      ></el-pagination>
      <!-- 编辑药品数据dialog -->
      <el-dialog title="编辑药品信息" :visible.sync="editmedicdialog">
        <div class="editposit">
          <el-form ref="editform" :model="editform" label-width="70px" size="mini">
            <el-form-item label="药品ID">
              <el-input v-model="editform.id" disabled></el-input>
            </el-form-item>
            <el-form-item label="药品名">
              <el-input v-model="editform.name"></el-input>
            </el-form-item>
            <el-form-item label="药品单价">
              <el-input-number v-model="editform.price" :precision="2" :step="1" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="生产日期">
              <el-date-picker
                :picker-options="pickerOptions"
                v-model="editform.date"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="药品规格">
              <el-input v-model="editform.type"></el-input>
            </el-form-item>
            <el-form-item label="药品库存">
              <el-input-number v-model="editform.num" :step="1" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="备注信息">
              <el-input type="textarea" v-model="editform.note"></el-input>
            </el-form-item>

            <el-button @click="editmedicdialog = false" size="mini">取消</el-button>
            <el-button @click="editmedic" type="primary" size="mini">更新</el-button>
          </el-form>
        </div>
      </el-dialog>
      <!-- 添加药品数据dialog -->
      <el-dialog title="录入药品信息" :visible.sync="addmedicdialog">
        <el-form
          style="width:300px"
          ref="editform"
          :model="editform"
          label-width="70px"
          size="mini"
        >
          <el-form-item label="药品名">
            <el-input v-model="addform.name"></el-input>
          </el-form-item>
          <el-form-item label="药品单价">
            <el-input-number v-model="addform.price" :precision="2" :step="1" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="生产日期">
            <el-date-picker
              :picker-options="pickerOptions"
              v-model="addform.date"
              type="date"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="药品规格">
            <el-input v-model="addform.type"></el-input>
          </el-form-item>
          <el-form-item label="药品数量">
            <el-input-number v-model="addform.num" :step="1" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="备注信息">
            <el-input type="textarea" v-model="addform.note"></el-input>
          </el-form-item>
          <div>
            <el-button @click="addmedicdialog = false" size="mini">取消</el-button>
            <el-button @click="addmedic" type="primary" size="mini">添加</el-button>
          </div>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getallmedicine();
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      listLoading: false,
      medicname: "",
      editmedicdialog: false, //编辑药品dialog
      addmedicdialog: false, //添加药品dialog
      medicinedata: [], //每页数据
      total: 0, //总条数
      pagesize: 6, //每页显示条数
      pagecount: 0, //总页数
      currentpage: 1, //当前页
      editform: {
        id: 0,
        image: "",
        name: "",
        price: 0,
        date: "",
        type: "",
        num: 0,
        note: ""
      },
      addform: {
        image: "",
        name: "",
        price: 0,
        date: "",
        type: "",
        num: 0,
        note: ""
      }
    };
  },
  methods: {
    // 获取所有药品
    getallmedicine() {
      this.$getRequest(
        "/getallmedicine?" +
          "pageNo=" +
          this.currentpage +
          "&pageSize=" +
          this.pagesize +
          "&parms=" +
          this.medicname
      ).then(res => {
        if (res.data.code == 200) {
          this.medicinedata = res.data.data.list;
          this.total = res.data.data.total; //总条数
          this.pagesize = res.data.data.pageSize; //每页显示条数
          this.pagecount = res.data.data.pages; //总页数
          this.currentpage = res.data.data.pageNum; //当前页数
        }
      });
    },
    //分页
    currentpagehandle(val) {
      this.currentpage = val;
      this.getallmedicine();
    },
    //删除药品
    deltemedicine(row) {
      this.$confirm("确定要删除吗？此操作不可恢复。", "提示", {
        type: "warning"
      })
        .then(() => {
          this.listLoading = true;
          this.$deleteRequest("/deltemedicine?id=" + row.id)
            .then(res => {
              this.$message.success("删除成功");
              this.getallmedicine();
              this.listLoading = false;
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(() => {
          this.$message.info("已取消操作");
        });
    },
    editmedichandle(row) {
      this.editmedicdialog = true;
      this.editform = Object.assign({}, row);
    },
    //编辑药品信息
    editmedic() {
      this.$confirm("确定更新 ？", "提示")
        .then(() => {
          this.$putRequest("/updatemedicine", this.editform)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success("操作成功！");
                this.editmedicdialog = false;
              }
              this.getallmedicine();
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(() => {
          console.log("cancle");
        });
    },
    //添加药品
    addmedic() {
      this.$postRequest("/addmedicine", this.addform)
        .then(res => {
          if (res.data.code == 200) {
            this.$message.success("添加成功");
            this.addmedicdialog = false;

            this.getallmedicine();
            // this.$refs.addform.resetFields();重置表单
          }
        })
        .catch(e => {});
    },
    //搜索药品名
    selectmedic() {
      this.getallmedicine();
    },
    resetselect() {
      this.medicname = "";
      this.getallmedicine();
    }
  }
};
</script>

<style>
.editposit {
  width: 300px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
