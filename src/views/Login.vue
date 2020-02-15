<template>
  <div class="login_con">
    <div class="login_form">
      <label class="login_font">登录</label>
      <el-form ref="loginformref" :model="loginform" :rules="loginrules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginform.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginform.password" type="password" />
        </el-form-item>
        <el-form-item label="验证码" prop="verifycode">
          <el-input clearable style="width:150px" v-model="loginform.verifycode" />
          <img style="padding-left:20px" @click="refreshcode" :src="verifycodeimg" />
        </el-form-item>
        <el-form-item class="btn_pos">
          <el-button @click="login" type="primary">登录</el-button>
          <el-button @click="resetform" type="info" plain>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.getverifycode();
    //Enter 能够登录
    let that = this;
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        that.login();
        return false;
      }
    };
  },
  data() {
    return {
      verifycodeimg: "",
      loginform: {
        username: "",
        password: "",
        verifycode: ""
      },
      loginrules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 1, message: "长度太短", trigger: "blur" }
        ],
        verifycode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
         
        ]
      }
    };
  },
  methods: {
    getverifycode() {
      this.$getRequest("/getverifycode").then(res => {
        this.verifycodeimg = res.data.data;
      });
    },
    refreshcode() {
      this.getverifycode();
      this.loginform.verifycode = "";
    },
    resetform() {
      this.$refs.loginformref.resetFields();
    },
    login() {
      this.$refs.loginformref.validate(validate => {
        if (!validate) {
          return;
        }
        var that = this;
        this.$RequestValue("/login", this.loginform)
          .then(function(response) {
            console.log(response);
            if (response.data.code == 200) {
              that.$message.success("登录成功");
              // 登录成功跳转
              window.sessionStorage.setItem("token", response.data.data);
              that.$router.push("/home");
            } else {
              that.$message({
                message: response.data.msg,
                type: "error"
              });
            }
          })
          .catch(e => {
            that.$message({
              message: "服务器连接中...",
              type: "error"
            });
          });
      });
    }
  }
};
</script>
<style scoped>
.login_font {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  font-size: 30px;
  padding-left: 200px;
}

.login_con {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffff;
  width: 500px;
  height: 350px;
  position: fixed;
  top: 20%;
  left: 30%;
}

.login_form {
  padding-top: 30px;
  padding-left: 20px;
  width: 400px;
  height: 300px;
}

.btn_pos {
  float: right;
}
</style>
