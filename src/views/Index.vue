<template>
  <div>
    <header>
      <el-menu mode="horizontal" router>
        <el-menu-item>宠物医院</el-menu-item>
        <el-menu-item>首页</el-menu-item>
        <el-menu-item>医疗服务</el-menu-item>
        <el-menu-item>医疗团队</el-menu-item>
        <el-menu-item>关于</el-menu-item>
        <el-menu-item>联系我们</el-menu-item>
        <el-menu-item>登录</el-menu-item>
      </el-menu>
    </header>
    <el-carousel :height="imgHeight+'px'" :interval="5000" arrow="always">
      <el-carousel-item v-for="item in banner" :key="item.id">
        <img ref="image" style="width:100%;" :src="item.url" />
      </el-carousel-item>
    </el-carousel>
	<div class="service">
		
	</div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.bannerindex();
    // 监听窗口变化，使得轮播图高度自适应图片高度
    window.addEventListener("resize", () => {
      this.imgHeight = this.$refs.image[0].height;
    });
  },
 
  data() {
    return {
      imgHeight: "",
      banner: []
    };
  },
  methods: {
    bannerindex() {
      this.$getRequest("/getallbanner").then(res => {
        this.banner = res.data.data;
        this.imgLoad();
      });
    },
    imgLoad() {
      this.$nextTick(function() {
        // 获取窗口宽度*图片的比例，定义页面初始的轮播图高度
        this.imgHeight = (document.body.clientWidth * 1) / 4;
      });
    }
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
</style>