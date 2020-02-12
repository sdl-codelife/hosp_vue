<template>
  <div>
    <el-menu :default-active="activeIndex" mode="horizontal" router>	
		<img style="width: 40px;height: 40px;padding-right: 10px;margin-top: 10px;" src="../assets/icon/petlogo.png">
		<a class="headertitle">宠物医院管理系统</a>
      <el-submenu index="2" style="float: right;padding-right:20px">
        <template slot="title">
          <el-avatar :src="avatorUrl" style="margin-right:10px" />
          <a>{{ username }}</a>
        </template>
        <el-menu-item index="/userInfo">个人中心</el-menu-item>
        <el-menu-item @click="loginout" >退出</el-menu-item>
      </el-submenu>
      <el-menu-item style="float:right"></el-menu-item>
     
    </el-menu>
  </div>
</template>

<script>
export default {
  created() {
    this.getUserName();
  },
  data() {
    return {
      avatorUrl: '',
      username: "",
      activeIndex: "1"
    };
  },

  methods: {
    loginout() {
      window.sessionStorage.clear();
      this.$message.success("退出成功");
      this.$router.push("/login");
    },
    async getUserName() {
      var that = this;
      await this.$getRequest("/getuserinfo")
        .then(function(response) {
          that.username = response.data.data.username;
         // that.$store.commit('updateAvatar',that.$baseUrl+response.data.data.avatar)
          that.avatorUrl = that.$baseUrl+response.data.data.avatar;
         // console.log(that.$store.state.avatar);
        })
        .catch(e => {
          console.log('top加载失败')
          console.log(e);
        });
    }
  }
};
</script>
<style scoped>
	.headertitle {
	 font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
	 font-size: 25px;
	}
</style>
