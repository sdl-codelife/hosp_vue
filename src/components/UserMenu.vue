<template>
  <div>
    <el-row>
      <el-col :span="8" class="usermenu">
        <div class="grid-content bg-purple">
          <div>
            <el-row class="tac">
              <el-menu class="el-menu-vertical-demo" router>
                <el-menu-item index="/userpet">
                  <i class="el-icon-setting" />
                  <span slot="title">我的宠物</span>
                </el-menu-item>
                <el-menu-item index="/registform">
                  <i class="el-icon-setting" />
                  <span slot="title">快速挂号</span>
                </el-menu-item>
                <el-submenu index>
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>挂号单</span>
                  </template>
                  <el-menu-item index="/orderlist">正在诊断</el-menu-item>
                  <el-menu-item index="/ordercomp">诊断完成</el-menu-item>
                </el-submenu>
                <el-menu-item index="userinfo">
                  <i class="el-icon-setting" />
                  <span slot="title">系统消息</span>
                </el-menu-item>
                <el-menu-item index="userinfo">
                  <i class="el-icon-setting" />
                  <span slot="title">个人中心</span>
                </el-menu-item>
              </el-menu>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="grid-content bg-purple-light" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.usermenu {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 180px;
  margin: 10px;
}
</style>