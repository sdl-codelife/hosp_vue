<template>
  <div class="login-wrap">
    <el-form
     ref="register" :model="registerform" :rules="registerrules"
      label-position="left"
      label-width="0px"
      class="demo-ruleForm login-container"
    >
      <h3 class="title">用户注册</h3>
      <el-form-item prop="username">
        <el-input v-model="registerform.username" type="text" auto-complete="off" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="registerform.password" type="password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
       <el-form-item prop="repassword">
        <el-input v-model="registerform.repassword" type="password" auto-complete="off" placeholder="重复密码"></el-input>
      </el-form-item>
       <el-form-item prop="phone">
        <el-input v-model="registerform.phone" type="text" auto-complete="off" placeholder="手机号码"></el-input>
      </el-form-item>
       <el-form-item prop="email">
        <el-input v-model="registerform.email" type="text" auto-complete="off" placeholder="电子邮件"></el-input>
      </el-form-item>
     
      <div class="register">
        已有帐号?
        <a href="#/login">登录</a>
      </div>

      <el-form-item style="width:100%;">
        <el-button  @click="register" type="primary" style="width:100%;">注册</el-button>
      </el-form-item>
    </el-form>
    <div class="footer">Copyright © 2020</div>
  </div>
</template>
<script>
export default {
  data() {
    var checkusername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户名不能为空！"));
      } else {
        this.$getRequest("/checkusername?username=" + value).then(res => {
          if (res.data.code !== 200) {
            callback(new Error("用户名已存在，请重新输入"));
          } else {
            callback();
          }
        });
      }
    };
    var checkpasswordagain = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再输入一次密码"));
      } else if (value !== this.registerform.password) {
        callback(new Error("两次输入的密码不一致！"));
      } else {
        callback();
      }
    };
    var checkphone = (rule, value, callback) => {
      var reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
      if (value) {
        if (!reg.test(value)) {
          return callback(new Error("请输入正确的手机号码"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    var checkemail = (rule, value, callback) => {
      var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (value) {
        if (!reg.test(value)) {
          return callback(new Error("请输入正确的Email"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      registerform: {
        username: "",
        password: "",
        usertype: "user",
        repassword: "",
        realname: "",
        phone: "",
        email: "",
        sex: "男"
      },
      registerrules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur"
          },
          { validator: checkusername, trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, message: "长度太短", trigger: "blur" }
        ],
        repassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { min: 3, message: "长度太短", trigger: "blur" },
          { validator: checkpasswordagain, trigger: "blur" }
        ],
        phone: [{ validator: checkphone, trigger: "blur" }],
        email: [{ validator: checkemail, trigger: "blur" }]
      }
    };
  },
  methods: {
    resetform() {
      this.$refs.register.resetFields();
    },
    register() {
      console.log("re");
      console.log(this.registerform);
      this.$refs.register.validate(validate => {
        console.log("reddd");
        if (!validate) {
          return;
        }
        //注册逻辑

        this.$postRequest("/adduser", this.registerform).then(res => {
          if (res.data.code == 200) {
            console.log(res);
            this.$message.success("注册成功，将跳转到登录页面");
            var t;
            clearTimeout(t);
            t = setTimeout(() => {
              this.$router.push("/login");
            }, 1000);
          }
        });
      });
    }
  }
};
</script>

<style scoped>
.login-wrap {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 5%;
  background-image: url(../assets/images/bg3.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center center;
  -moz-background-size:100% 100%; 
}
.login-container {
  border-radius: 10px;
  margin: 20px;
  width: 350px;
  padding: 30px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  text-align: left;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}
.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.register {
  color: #505458;
  margin-bottom: 10px;
}
.register a {
  color: #505458;
}
.footer {
  height: 200px;
  margin-top: 50px;
  bottom: 10px;
  color: #505458;
  text-align: center;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, PingFang SC,
    Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica, Arial,
    sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  font-variant: tabular-nums;
  line-height: 1.5;
  font-feature-settings: "tnum";
}
.remember {
  margin: 0px 0px 35px 0px;
}
.code-box {
  text-align: right;
  padding-right: 10%;
  padding-top: 5px;
}
.codeimg {
  height: 30px;
}
</style>