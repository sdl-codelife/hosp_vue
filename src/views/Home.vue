<template>
  <div class="home">
    <el-container>
      <el-header style="padding:0">
        <TopHeader></TopHeader>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <div v-if="usertype === 'admin'">
            <Vmenu></Vmenu>
          </div>
          <div v-if="usertype === 'doctor'">
            <DoctorMenu></DoctorMenu>
          </div>
        </el-aside>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import TopHeader from "../components/TopHeader";
import Vmenu from "../components/Vmenu";
import UserInfo from "../views/UserInfo";
import UserMenu from "../components/UserMenu";
import DoctorMenu from "../components/DoctorMenu";
export default {
  mounted() {
    this.gotowhere();
  },
  data() {
    return {
      menu: "",
      img: "",
      usertype: ""
    };
  },
  name: "home",
  components: {
    TopHeader,
    UserInfo,
    Vmenu,
    UserMenu,
    DoctorMenu
  },
  methods: {
    gotowhere() {
      this.$getRequest("/getuserinfo").then(res => {
        this.usertype = res.data.data.usertype;
      });
    }
  }
};
</script>
<style scoped>
</style>