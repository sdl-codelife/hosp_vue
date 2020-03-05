<template>
  <div>
    <el-row>
      <el-col :span="8" class="usermenu">
        <div class="grid-content bg-purple">
          <div>
            <el-row class="tac">
              <el-menu default-active="/doctorindex" class="el-menu-vertical-demo" router>
                <el-menu-item index="/doctorindex">
                  <i>
                    <svg class="icondoctormenu">
                      <use xlink:href="#icon-zonglan-weixuanzhong" />
                    </svg>
                  </i>
                  <span slot="title">总览</span>
                </el-menu-item>
                <el-menu-item index="/registview">
                  <i>
                    <svg class="icondoctormenu">
                      <use xlink:href="#icon-kuaisu3" />
                    </svg>
                  </i>
                  <span slot="title">快速诊断</span>
                </el-menu-item>
                <el-menu-item index="/seeregist">
                  <i>
                    <svg class="icondoctormenu">
                      <use xlink:href="#icon-chakan3" />
                    </svg>
                  </i>
                  <span slot="title">查看病历</span>
                </el-menu-item>
                <el-menu-item index="/systemmessage">
                  <i>
                    <svg class="icondoctormenu">
                      <use xlink:href="#icon-xitongxiaoxi3" />
                    </svg>
                  </i>
                  <span slot="title">新闻公告</span>
                </el-menu-item>
                <el-menu-item index="/userinfo">
                  <i>
                    <svg class="icondoctormenu">
                      <use xlink:href="#icon-ren" />
                    </svg>
                  </i>
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
export default {
  mounted() {
    this.$router.push("/doctorindex");
  }
};
</script>

<style scoped>
.usermenu {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 180px;
  margin: 10px;
}
.icondoctormenu {
  width: 1.2em;
  height: 1.2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>