<template>
  <div class="register_con">
    <div class="login_form">
      <label class="login_font">注册</label>
      <el-form ref="register" :model="registerform" :rules="registerrules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="registerform.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="registerform.password" type="password" show-password />
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword">
          <el-input v-model="registerform.repassword" type="password" show-password />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input v-model="registerform.realname" />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="registerform.phone" />
        </el-form-item>
        <el-form-item label="电子邮件" prop="email">
          <el-input v-model="registerform.email" />
        </el-form-item>
        <div>
          已有帐号?
          <a href="#/login">登录</a>
        </div>
        <el-form-item class="btn_pos">
          <el-button @click="register" type="primary">提交</el-button>
          <el-button @click="resetform" type="info" plain>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
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
        }else {
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
        }else {
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
        sex:'男'
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
       phone:[ { validator: checkphone, trigger: "blur" }],
       email:[ { validator: checkemail, trigger: "blur" }]
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
          }
        });
      });
    }
  }
};
</script>

<style scoped>
.register_con {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffff;
  width: 500px;
  height: 550px;
  position: fixed;
  top: 10%;
  left: 30%;
}
</style>