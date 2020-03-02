<template>
  <div>
    <el-carousel :height="imgHeight+'px'" :interval="5000" arrow="always">
      <el-carousel-item v-for="item in banner" :key="item.id">
        <img ref="image" style="width:100%;" :src="item.url" />
      </el-carousel-item>
    </el-carousel>
    <div class="main-con">
      <div class="servicetitle">
        <h2>医疗服务</h2>
        <p>坚持“爱护动物，诚信经营”的宗旨。成功治愈的病例不计其数，深受广大宠物主人的好评</p>
      </div>
      <div class="row">
        <el-row>
          <el-col :span="8" v-for="(o, index) in 2" :key="o" :offset="index > 0 ? 2 : 0">
            <el-card :body-style="{ padding: '0px' }">
              <img
                src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
              />
              <div style="padding: 14px;">
                <span>好吃的汉堡</span>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="main-con intro_con"></div>
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
      banner: [],
      card: [
        { id: 0, title: "全科中心", intro: "balaabalalla" },
        { id: 1, title: "全科中心", intro: "balaabalalla" },
        { id: 2, title: "全科中心", intro: "balaabalalla" }
      ]
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
.main-con {
  width: 100%;
  height: 400px;
  background-color: #f3f3f3;
}
.servicetitle {
  text-align: center;
  font-family: "Lucida Grande", Helvetica, Arial, "Microsoft YaHei", FreeSans,
    Arimo, "Droid Sans", "wenquanyi micro hei", "Hiragino Sans GB",
    "Hiragino Sans GB W3", Roboto, Arial, sans-serif;
}
.intro_con {
  background-color: #ffbc1b;
}
.servicecard {
  width: 10000%;
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>