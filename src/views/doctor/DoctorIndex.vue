<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>总览</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="menua">
      <el-card class="box-card">
        <i>
          <svg class="doctoricon">
            <use xlink:href="#icon-shoufeixitong_menzhenguahaodansheji" />
          </svg>
        </i>
        <a>今日挂号数</a>
        <a style="font-size:60px">  38</a>
      </el-card>
      <el-card class="box-card">
        <i>
          <svg class="doctoricon">
            <use xlink:href="#icon-guahaodan" />
          </svg>
        </i>
        
        <a>总挂号数</a>
        <a style="font-size:60px">  206</a>
      </el-card>
      <el-card class="box-card">
        <i>
          <svg class="doctoricon">
            <use xlink:href="#icon-renwu" />
          </svg>
        </i>
        <a> 待诊断</a>
        <a style="font-size:60px">  20</a>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.box-card {
  width: 300px;
  height: 120px;
  float: left;
  margin-left: 20px;
}
.doctoricon {
  width: 4em;
  height: 4em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>