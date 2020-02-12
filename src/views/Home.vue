<template>
  <div class="home">
    <el-container>
      <el-header>
        <TopHeader></TopHeader>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Vmenu></Vmenu>
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
export default {
  data() {
    return {
      img: ""
    };
  },
  name: "home",
  components: {
    TopHeader,
    UserInfo,
    Vmenu
  },
  methods: {}
};
</script>
