<template>
  <header>
    <el-menu mode="horizontal" router>
      <el-menu-item>宠物医院</el-menu-item>
      <el-menu-item index="/userhome">首页</el-menu-item>
      <el-menu-item index="team">医疗团队</el-menu-item>
      <el-menu-item index="/news">新闻中心</el-menu-item>
      <el-menu-item index="/contact">联系我们</el-menu-item>
      <el-submenu v-if="usertype=='user'" index="2" style="float: right;padding-right:20px">
        <template slot="title">
          <el-avatar :src="user.avatar" style="margin-right:10px" />
          <a>{{ user.username }}</a>
        </template>
        <el-menu-item index="/myuserinfo">个人中心</el-menu-item>
        <el-menu-item index="/userpet">我的宠物</el-menu-item>
        <el-menu-item index="/registform">快速预约</el-menu-item>
        <el-menu-item index="/orderlist">我的预约</el-menu-item>
        <el-menu-item @click="logout">退出</el-menu-item>
      </el-submenu>
      <el-menu-item v-if="usertype == 'guest'">
        <router-link to="/login">登录</router-link>
      </el-menu-item>
    </el-menu>
  </header>
</template>

<script>
export default {
  mounted() {
    this.checklogin();
  },
  data() {
    return {
      usertype: "guest",
      token: "",
      user: {}
    };
  },
  methods: {
    checklogin() {
      var token = window.sessionStorage.getItem("token");
      if (token != null) {
        this.$getRequest("/getuserinfo").then(res => {
          this.user = res.data.data;
          this.usertype = res.data.data.usertype;
        });
      }else{
        this.usertype = 'guest';
      }
    },
    logout() {
      window.sessionStorage.clear();
      this.usertype = 'guest';
      this.$router.push("/userhome");
    }
  }
};
</script>

<style>
</style>