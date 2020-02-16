<template>
  <div>
    <!-- 面包屑-->
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path:'/Home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>我的宠物</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="menua">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true">
          <el-form-item>
            <el-input v-model="petname" prefix-icon="el-icon-search" clearable placeholder="宠物名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="findpetbyname" type="primary">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetfind" type="primary">重置</el-button>
          </el-form-item>
          <el-button @click="adduserpetdialog = true" type="primary" icon="el-icon-edit">添加</el-button>
        </el-form>
      </el-col>
      <!--表格数据-->
      <el-table :data="petdata" style="width: 100%" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column width="100px" prop="id" label="宠物ID" sortable></el-table-column>
        <el-table-column prop="name" label="宠物名"></el-table-column>
        <el-table-column prop="sex" label="宠物性别"></el-table-column>
        <el-table-column prop="type" label="宠物种类"></el-table-column>
        <el-table-column prop="age" label="宠物年龄"></el-table-column>
        <el-table-column width="200px" label="操作">
          <template scope="scope">
            <el-button @click="seepet(scope.row)" type="primary" size="small">查看</el-button>

            <el-button type="danger" @click="delpet(scope.row)" size="small">删除</el-button>
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
      <!-- 上传图片dialog -->
      <el-dialog title="添加宠物" :visible.sync="adduserpetdialog">
        <div>
          <el-form ref="petformref" :model="petform" label-width="70px" size="mini">
            <el-form-item prop="image" label="宠物图片">
              <el-upload
                action="#"
                ref="uploadref"
                :auto-upload="true"
                :http-request="handleHttpRequest"
              >
                <el-avatar :size="60">
                  <img :src="petform.image" />
                </el-avatar>
                <a>点击头像来添加图片</a>
              </el-upload>
            </el-form-item>
            <el-form-item prop="name" label="宠物名">
              <el-input v-model="petform.name"></el-input>
            </el-form-item>
            <el-form-item prop="sex" label="性别">
              <el-radio v-model="petform.sex" label="雌">雌</el-radio>
              <el-radio v-model="petform.sex" label="雄">雄</el-radio>
            </el-form-item>
            <el-form-item prop="type" label="宠物种类">
              <el-input v-model="petform.type"></el-input>
            </el-form-item>
            <el-form-item prop="age" label="宠物年龄">
              <el-input-number v-model="petform.age" :precision="1" :step="1" :min="0"></el-input-number>
            </el-form-item>
            <el-button @click="cancleadd" size="mini">取消</el-button>
            <el-button @click="adduserpet" type="primary" size="mini">添加</el-button>
          </el-form>
        </div>
      </el-dialog>
      <el-dialog title="查看宠物" :visible.sync="seepetdialog">
        <div style="width:300px">
          <el-form ref="editform" :model="editform" label-width="70px" size="mini">
            <el-form-item label="宠物图片">
              <el-upload
                action="#"
                ref="updateimgref"
                :auto-upload="true"
                :http-request="updatepetimg"
              >
                <el-avatar :size="60">
                  <img :src="editform.image" />
                </el-avatar>
                <a>点击头像来上传图片</a>
              </el-upload>
            </el-form-item>
            <el-form-item label="宠物名">
              <el-input v-model="editform.name"></el-input>
            </el-form-item>
            <el-form-item label="性别">
              <el-radio v-model="editform.sex" label="雌">雌</el-radio>
              <el-radio v-model="editform.sex" label="雄">雄</el-radio>
            </el-form-item>
            <el-form-item label="宠物种类">
              <el-input v-model="editform.type"></el-input>
            </el-form-item>
            <el-form-item label="宠物年龄">
              <el-input-number v-model="editform.age" :precision="1" :step="1" :min="0"></el-input-number>
            </el-form-item>
            <div>
              <el-button @click="cancleupdate" size="mini">取消</el-button>
              <el-button @click="updatepet" type="primary" size="mini">更新</el-button>
            </div>
          </el-form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.getuserpet();
  },
  data() {
    return {
      petinfo: {},
      seepetdialog: false,
      adduserpetdialog: false,
      oldimg: "",
      petname: "",
      petdata: [],
      total: 0, //总条数
      pagesize: 6, //每页显示条数
      pagecount: 0, //总页数
      currentpage: 1, //当前页
      editform: {
        id: "",
        name: "",
        sex: "",
        type: "",
        age: "",
        image: "",
        user: ""
      },
      petform: {
        id: "",
        name: "",
        sex: "",
        type: "",
        age: "",
        image: "",
        user: ""
      }
    };
  },
  methods: {
    findpetbyname() {
      this.getuserpet();
    },
    resetfind() {
      this.petname = "";
      this.getuserpet();
    },
    updatepet() {
      //删掉oldimg update
      this.$putRequest("/updatepet", this.editform);
      this.getuserpet();
      this.seepetdialog = false;
      this.$message.success("更新成功!");
      this.$refs.updateimgref.clearFiles();
      if (null !== this.oldimg && this.oldimg.length > 5) {
        console.log(this.oldimg);
        this.$deleteRequest("/deletepetimg?imgurl=" + this.oldimg);
      }
    },
    cancleupdate() {
      //删掉newimg 清空上传
      this.seepetdialog = false;
      this.$deleteRequest("/deletepetimg?imgurl=" + this.editform.image);
      this.$refs.updateimgref.clearFiles();
    },
    updatepetimg(file) {
      let imgfile = file.file;
      let formdata = new window.FormData();
      formdata.append("imgfile", imgfile);
      this.$fileRequest("/updatepetimg", formdata)
        .then(res => {
          console.log(res.data);
          this.oldimg = this.editform.image;
          this.editform.image = res.data.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    seepet(row) {
      this.seepetdialog = true;
      //   this.editform = row;
      this.editform = Object.assign({}, row);
    },
    delpet(row) {
      this.$confirm("确定要删除吗？此操作不可恢复。", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$deleteRequest("/deltepet?id=" + row.id)
            .then(res => {
              this.$message.success("删除成功");
              this.getuserpet();
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(() => {
          this.$message.info("已取消操作");
        });
    },
    currentpagehandle() {  
        this.getuserpet()
    },
    getuserpet() {
      this.$getRequest(
        "/getuserpet?" +
          "pageNo=" +
          this.currentpage +
          "&pageSize=" +
          this.pagesize +
          "&parms=" +
          this.petname
      ).then(res => {
        this.petdata = res.data.data.list;
        this.total = res.data.data.total; //总条数
        this.pagesize = res.data.data.pageSize; //每页显示条数
        this.pagecount = res.data.data.pages; //总页数
        this.currentpage = res.data.data.pageNum; //当前页数
      });
    },
    handleHttpRequest(file) {
      let imgfile = file.file;
      let formdata = new window.FormData();
      formdata.append("imgfile", imgfile);
      this.$fileRequest("/addpetimg", formdata)
        .then(res => {
          this.petform.image = res.data.data.image;
          this.petform.id = res.data.data.id;
          this.petform.user = res.data.data.user;
        })
        .catch(e => {
          console.log(e);
        });
    },
    adduserpet() {
      console.log(this.petform);
      if (this.petform.image != null && this.petform.image != "") {
        this.$putRequest("/updatepet", this.petform);
      } else {
        this.$postRequest("/addpet", this.petform);
      }
      this.getuserpet();
      this.adduserpetdialog = false;

      this.$message.success("添加成功！");
      //   this.$refs.petformref.resetFields();执行速度 太快？？？我懵逼了卧槽nmlgb
    },
    cancleadd() {
      this.adduserpetdialog = false;
      if (this.petform.image != null && this.petform.image != "") {
        this.$deleteRequest("/deltepet?id=" + this.petform.id);
        this.$refs.uploadref.clearFiles();
      }

      this.$refs.petformref.resetFields();
    }
  }
};
</script>

<style>
</style>