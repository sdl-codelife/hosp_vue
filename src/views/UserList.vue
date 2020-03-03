<template>
  <div>
    <!-- 面包屑-->
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 搜索工具栏-->
    <div class="menua">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
          <el-form-item>
            <el-input prefix-icon="el-icon-search" clearable placeholder="用户名" v-model="selectname"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="selectnamehandle" type="primary">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetselecthandle" type="primary">重置</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="adduserdialog = true" type="primary">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <!--表格-->
      <el-table :data="usertabledata" v-loading="listLoading" style="width: 100%" border>
        <el-table-column type="index" width="60"></el-table-column>
        <el-table-column prop="userid" label="用户ID" width="100" sortable></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="realname" label="姓名"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="phone" label="电话"></el-table-column>
        <el-table-column prop="email" label="邮件"></el-table-column>
        <el-table-column
          :filters="[{text: '管理员',value: 'admin'},{text:'用户',value: 'user'},{text:'医生',value:'doctor'}]"
          :filter-method="filterusertype"
          prop="usertype"
          label="用户类型"
          width="120"
        >
          <template slot-scope="scope">
            <el-tag>{{scope.row.usertype}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="small" @click="edituserhandle(scope.$index, scope.row)">编辑</el-button>
            <el-button type="danger" @click="delteuser(scope.$index,scope.row)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页-->
      <div>
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
      </div>
    </div>
    <!-- 编辑dialog-->
    <div>
      <el-dialog title="编辑信息" :visible.sync="edituserdialog">
        <el-tabs v-model="activeName" type="card">
          <!-- 基本信息-->
          <el-tab-pane label="基本信息" name="first">
            <el-form
              style="width:300px"
              ref="editform"
              :model="editform"
              label-width="70px"
              size="mini"
            >
              <div>
                <el-form-item label="用户ID">
                  <el-input disabled v-model="editform.userid"></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="用户名">
                  <el-input disabled v-model="editform.username"></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="真实姓名">
                  <el-input v-model="editform.realname"></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="性别">
                  <el-radio v-model="editform.sex" label="男">男</el-radio>
                  <el-radio v-model="editform.sex" label="女">女</el-radio>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="邮箱">
                  <el-input v-model="editform.email"></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="手机号">
                  <el-input v-model="editform.phone"></el-input>
                </el-form-item>
              </div>
              <el-button @click="edituserdialog = false" size="mini">取消</el-button>
              <el-button @click="updateuserinfo" type="primary" size="mini">更新</el-button>
            </el-form>
          </el-tab-pane>
          <!-- 安全信息-->
          <el-tab-pane label="安全信息" name="second">
            <el-form
              style="width:300px"
              ref="editform"
              :model="editform"
              label-width="70px"
              size="mini"
            >
              <div>
                <el-form-item label="用户ID">
                  <el-input disabled v-model="editform.userid"></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="用户名">
                  <el-input v-model="editform.username"></el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="密码">
                  <el-input v-model="editform.password"></el-input>
                </el-form-item>
              </div>
              <el-button @click="edituserdialog = false" size="mini">取消</el-button>
              <el-button @click="updateuser" type="danger" size="mini">更新</el-button>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
      <!-- 添加用户dialog-->
      <el-dialog title="添加用户" :visible.sync="adduserdialog">
        <el-form style="width:300px" ref="addform" :model="addform" label-width="70px" size="mini">
          <div>
            <el-form-item label="用户名">
              <el-input placeholder="请输入用户名" v-model="addform.username"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="密码">
              <el-input placeholder="请输入密码" v-model="addform.password" prop="password"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="用户类型">
              <el-select style="width:90px" v-model="addform.usertype" placeholder="请选择">
                <el-option
                  v-for="item in usertype"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="真实姓名">
              <el-input placeholder="请输入真实姓名" v-model="addform.realname"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="性别">
              <el-radio v-model="addform.sex" label="男">男</el-radio>
              <el-radio v-model="addform.sex" label="女">女</el-radio>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="邮箱">
              <el-input placeholder="请输入邮箱" v-model="addform.email" prop="email"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="手机号">
              <el-input placeholder="请输入手机号码" v-model="addform.phone" prop="phone"></el-input>
            </el-form-item>
          </div>
          <el-button @click="adduserdialog = false" size="mini">取消</el-button>
          <el-button @click="adduser" type="primary" size="mini">添加</el-button>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getalluser();
  },
  data() {
    return {
      selectname: "",
      total: 0,
      pagesize: 6,
      pagecount: 0,
      currentpage: 1,
      activeName: "first",
      edituserdialog: false,
      adduserdialog: false,
      listLoading: false,
      usertabledata: [],
      usertype: [
        { value: "admin", lable: "管理员" },
        { value: "user", lable: "用户" },
        { value: "doctor", lable: "医生" }
      ],
      editform: {
        userid: "",
        realname: "",
        username: "",
        sex: "",
        email: "",
        phone: "",
        password: ""
      },
      addform: {
        username: "",
        usertype: "",
        realname: "",
        sex: "",
        email: "",
        phone: "",
        password: ""
      }
    };
  },
  methods: {
    //获取所有用户数据
    getalluser() {
      this.listLoading = true;
      let pageParms = {
        pageNo: this.currentpage,
        pageSize: this.pagesize
      };
      console.log(pageParms);
      this.$getRequest(
        "/getalluser?" +
          "pageNo=" +
          this.currentpage +
          "&parms=" +
          this.selectname
      ).then(res => {
        if (res.data.code == 200) {
          this.usertabledata = res.data.data.list; //每页数据
          this.total = res.data.data.total; //总条数
          this.pagesize = res.data.data.pageSize; //每页显示条数
          this.pagecount = res.data.data.pages; //总页数
          this.currentpage = res.data.data.pageNum; //当前页数
          this.listLoading = false;
        } else {
          this.$message.error("拉取失败");
          this.listLoading = false;
        }
      });
    },
    //删除一行
    delteuser(index, row) {
      this.$confirm("确定要删除该用户吗吗？此操作不可恢复。", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$deleteRequest("/delteuser?id=" + row.userid)
            .then(res => {
              this.$message.success("删除成功");
              this.getalluser();
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(() => {
          this.$message.info("已取消操作");
        });
    },
    filterusertype(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    //打开编辑dialog并传入数据
    edituserhandle(index, row) {
      this.edituserdialog = true;
      this.editform = Object.assign({}, row);
    },
    //更新用户一般信息
    updateuserinfo() {
      this.$confirm("确定更新 ？", "提示")
        .then(() => {
          this.$putRequest("/updateUserinfo", this.editform)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success("操作成功！");
                this.edituserdialog = false;
              }
              this.getalluser();
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(() => {
          console.log("cancle");
        });
    },
    //更新安全信息
    updateuser() {
      this.$confirm("确定更新", "提示")
        .then(() => {
          let user = {
            id: this.editform.userid,
            username: this.editform.username,
            password: this.editform.password
          };
          this.$putRequest("/updateuser", user)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success("更新成功");
                this.getalluser();
              }
            })
            .catch(e => {});
        })
        .catch(() => {
          console.log("can");
        });
    },
    //添加用户
    adduser() {
      this.$postRequest("/adduser", this.addform)
        .then(res => {
          if (res.data.code == 200) {
            this.$message.success("添加成功");
            this.adduserdialog = false;
            this.getalluser();
            // this.$refs.addform.resetFields();重置表单
          }
        })
        .catch(e => {});
    },
    //刷新当前分页指向页
    currentpagehandle(val) {
      this.currentpage = val;
      this.getalluser();
    },
    //传入parms查找
    selectnamehandle() {
      this.listLoading = true;
      this.getalluser();
      this.listLoading = false;
    },
    //重置搜索刷新列表
    resetselecthandle() {
      this.listLoading = true;
      this.selectname = "";
      this.getalluser();
      this.listLoading = false;
    }
  }
};
</script>

<style scoped>
</style>