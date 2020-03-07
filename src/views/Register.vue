<template>
  <div class="register_con">
    <div class="login_form">
      <label class="login_font">注册</label>
      <el-form ref="register" :model="register" :rules="registerrules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword">
          <el-input type="password" />
        </el-form-item>
        <el-form-item label="真实姓名" prop="realname">
          <el-input />
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input />
        </el-form-item>
        <el-form-item label="电子邮件" prop="email">
          <el-input />
        </el-form-item>
        <div>
          <a href="#/login">我有帐号了，去登录</a>
        </div>
        <el-form-item class="btn_pos">
          <el-button type="primary">提交</el-button>
          <el-button type="info" plain>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.register_con {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #ffff;
  width: 500px;
  height: 600px;
  position: fixed;
  top: 10%;
  left: 30%;
}
</style>