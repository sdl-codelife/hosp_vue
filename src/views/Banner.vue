<template>
  <div>
    <!-- 面包屑-->
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>首页轮播图管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="menua">
      <div style="height:80px">
        <el-button @click="upbannerdialog = true" type="primary">
          上传图片
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
      </div>
      <el-table :data="banner">
        <el-table-column label="ID" width="60px" prop="id"></el-table-column>
        <el-table-column label="标题" width="150px" prop="title"></el-table-column>
        <el-table-column label="图片地址" prop="url"></el-table-column>
        <el-table-column width="200" label="操作">
          <template scope="scope">
            <el-button size="small" @click="seebanner(scope.row)">查看</el-button>
            <el-button type="danger" @click="deltebanner(scope.row)" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 上传图片dialog -->
      <el-dialog title="上传Banner" :visible.sync="upbannerdialog">
        <div>
          <el-form ref="bannerform" :model="bannerform" label-width="70px" size="mini">
            <el-form-item>
              <el-upload
                action="#"
                ref='uploadref'
                :auto-upload="true"
                :http-request="handleHttpRequest"
                :before-upload="beforeAvatarUpload"
              >
                <el-button size="mini">点击选择文件上传</el-button>
                <i style="padding-left:10px;">注意:上传Banner图文件尺寸为1920x600像素</i>
              </el-upload>
            </el-form-item>
            <el-form-item label="标题">
              <el-input v-model="bannerform.title"></el-input>
            </el-form-item>
            <el-button @click="cancleupload" size="mini">取消</el-button>
            <el-button @click="addbanner" type="primary" size="mini">添加</el-button>
          </el-form>
        </div>
      </el-dialog>
      <el-dialog title="查看Banner" :visible.sync="seebannerdialog">
        <div>
          <a>id:{{bannerinfo.id}}</a>
          <a>title:{{bannerinfo.title}}</a>
          <img width="384" height="120" :src="bannerinfo.url" />
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getallbanner();
  },
  data() {
    return {
      seebannerdialog: false,
      upbannerdialog: false,
      bannerform: {
        id: 0,
        title: "",
        url: ""
      },
      banner: [],
      bannerinfo: {
        id: 0,
        title: "",
        url: ""
      }
    };
  },
  methods: {
    getallbanner() {
      this.$getRequest("/getallbanner").then(res => {
        this.banner = res.data.data;
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG /png格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleHttpRequest(file) {
      let imgfile = file.file;
      let formdata = new window.FormData();
      formdata.append("imgfile", imgfile);
      this.$fileRequest("/uploadbanner", formdata)
        .then(res => {
          this.bannerform.id = res.data.data.id;
          this.bannerform.url = res.data.data.url;
        })
        .catch(e => {
          console.log(e);
        });
    },
    addbanner() {
      let banner = {
        id: this.bannerform.id,
        title: this.bannerform.title
      };
      console.log(banner);

      this.$putRequest("/updatabanner", banner)
        .then(res => {
          if (res.data.code == 200) {
            this.$message.success("添加成功！");
            this.getallbanner();
            this.upbannerdialog = false;
            this.bannerform.id = 0;
            this.bannerform.title = "";
            this.bannerform.url = "";
            this.$refs.uploadref.clearFiles();
          }
        })
        .catch(e => {
          console.log("fail");
          this.cancleupload();
        });
    },
    cancleupload() {
      if (0 != this.bannerform.id) {
        this.$deleteRequest("/deltebanner?id=" + this.bannerform.id).then(
          res => {
            if (res.data.code == 200) {
              this.$message.info("已经取消上传！");
              this.upbannerdialog = false;
              this.bannerform.id = 0;
              this.bannerform.title = "";
              this.bannerform.url = "";
              this.$refs.uploadref.clearFiles();
            }
          }
        );
      } else {
        this.$message.info("已经取消上传！");
        this.upbannerdialog = false;
      }
    },
    deltebanner(row) {
      this.$confirm("确定要删除吗？此操作不可恢复。", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$deleteRequest("/deltebanner?id=" + row.id)
            .then(res => {
              this.$message.success("删除成功");
              this.getallbanner();
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(() => {
          this.$message.info("已取消操作");
        });
    },
    seebanner(row) {
      this.seebannerdialog = true;
      this.bannerinfo.id = row.id;
      this.bannerinfo.title = row.title;
      this.bannerinfo.url = this.$baseUrl + row.url;
    }
  }
};
</script>

<style>
</style>