<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>系统公告</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="menua">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
          <el-form-item>
            <el-input v-model="title" prefix-icon="el-icon-search" clearable placeholder="标题"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="findmessage" type="primary">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetmessage" type="primary">重置</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="addmessagehandle" type="primary">新增</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-table :data="messagedata" style="width: 100%" border>
        <el-table-column width="80" prop="id" label="ID"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="createUser" label="创建人"></el-table-column>
        <el-table-column width="200" label="操作">
          <template slot-scope="scope">
            <el-button size="small" @click="seemessage(scope.row)">查看</el-button>
            <el-button type="danger" @click="deltemessage(scope.row)" size="small">删除</el-button>
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
      <el-dialog title="编辑公告信息" :visible.sync="addmessagedialog">
        <div>
          <el-form ref="editform" :model="editform" label-width="70px" size="mini">
            <el-form-item label="标题">
              <el-input v-model="editform.title"></el-input>
            </el-form-item>
            <el-form-item label="时间">
              <el-input v-model="editform.createTime"></el-input>
            </el-form-item>
            <el-form-item label="公告">
              <el-input :rows="10" type="textarea" v-model="editform.content"></el-input>
            </el-form-item>
            <el-button @click="addmessagedialog = false" size="mini">取消</el-button>
            <el-button @click="addmessage" type="primary" size="mini">添加</el-button>
          </el-form>
        </div>
      </el-dialog>
      <!-- 查看公告dialog -->
      <el-dialog title="公告信息" :visible.sync="messagedialog">
        <div>
          <el-form ref="message" :model="message" label-width="70px" size="mini">
            <el-form-item label="标题">
              <el-input v-model="message.title"></el-input>
            </el-form-item>
            <el-form-item label="创建人ID">
              <el-input v-model="message.createUser"></el-input>
            </el-form-item>
            <el-form-item label="时间">
              <el-input v-model="message.createTime"></el-input>
            </el-form-item>
            <el-form-item label="公告">
              <el-input :rows="10" type="textarea" v-model="message.content"></el-input>
            </el-form-item>
            <div style="margin-left:300px"> 
              <el-button @click="seemessageok" type="success" icon="el-icon-check" circle></el-button>
            </div>
          </el-form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getmessage();
  },
  data() {
    return {
      total: 0, //总条数
      pagesize: 6, //每页显示条数
      pagecount: 0, //总页数
      currentpage: 1, //当前页
      messagedata: [],
      addmessagedialog: false,
      messagedialog: false,
      title: "",
      editform: {
        id: 0,
        title: "",
        content: "",
        createTime: "",
        createUser: 0
      },
      message: {
        id: 0,
        title: "",
        content: "",
        createTime: "",
        createUser: 0
      }
    };
  },
  methods: {
    getmessage() {
      this.$getRequest(
        "/getallmessage?" +
          "pageNo=" +
          this.currentpage +
          "&pageSize=" +
          this.pagesize +
          "&parms=" +
          this.title
      ).then(res => {
        console.log(res);
        this.messagedata = res.data.data.list;
        this.total = res.data.data.total; //总条数
        this.pagesize = res.data.data.pageSize; //每页显示条数
        this.pagecount = res.data.data.pages; //总页数
        this.currentpage = res.data.data.pageNum; //当前页数
      });
    },
    currentpagehandle(val) {},
    addmessagehandle() {
      this.gettime();
      this.addmessagedialog = true;
    },
    gettime() {
      var date = new Date();
      var year = date.getFullYear(); //存储年
      var month = date.getMonth() + 1; //存储月份
      var day = date.getDate(); //存储日期
      var hours = date.getHours(); //存储时
      var minutes = date.getMinutes(); //存储分
      var strDate =
        year + "-" + month + "-" + day + " " + hours + ":" + minutes;
      this.editform.createTime = strDate;
    },
    addmessage() {
      this.$postRequest("/addmessage", this.editform).then(res => {
        if (res.data.code == 200) {
          this.$message.success("添加成功");
          this.addmessagedialog = false;
          this.getmessage();
        }
      });
    },
    findmessage() {
      this.getmessage();
    },
    resetmessage() {
      this.title = "";
      this.getmessage();
    },
    deltemessage(row) {
      this.$confirm("确定要删除吗？此操作不可恢复。", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$deleteRequest("/deltemessage?id=" + row.id)
            .then(res => {
              this.$message.success("删除成功");
              this.getmessage();
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(() => {
          this.$message.info("已取消操作");
        });
    },
    seemessage(row) {
      this.messagedialog = true;
      this.message = Object.assign({}, row);
    },
    seemessageok() {
      this.messagedialog = false;
    }
  }
};
</script>

<style>
</style>