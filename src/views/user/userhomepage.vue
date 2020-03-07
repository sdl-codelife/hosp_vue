<template>
  <div>
    <el-carousel :height="imgHeight+'px'" :interval="5000" arrow="always">
      <el-carousel-item v-for="item in banner" :key="item.id">
        <img ref="image" style="width:100%;" :src="item.url" />
      </el-carousel-item>
    </el-carousel>
    <div class="service">
      <div class="container">
        <div class="titlebox">
          <h2>医疗服务</h2>
          <p>坚持“爱护动物，诚信经营”的宗旨。成功治愈的病例不计其数，深受广大宠物主人的好评。</p>
        </div>
        <div class="row">
          <ul>
            <li v-for="item in servicecard" :key="item.index">
              <b>
                <img :src="item.img" />
              </b>
              <h3>{{item.title}}</h3>
              <p>{{item.intro}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="introduction">
      <div class="container">
        <div class="left">
          <div class="abouttitle">
            <h2>宠物医院</h2>
          </div>
          <div
            class="introducebox"
          >宠物医院医院成立于2020年，我相信通过不断发展与沉淀，秉承着择一事终一生，不为繁华易匠心的理念，热情接待每一位宠物主人，认真对待每一个宠物病例，以宠物及主人为中心，凭借着专业的医疗水准、先进的服务理念、干净的就诊环境服务于广大宠物患者。关爱宠物健康、呵护幼小生命是我们每一位员工永恒的宗旨和信念！ 至今旗下先后创建了三家动物医院，至今旗下拥有漂亮宝贝动物医院、迪威德动物医院、迪威德国际动物医院。 迪威德动物医院从成立以来，一直与世界顶级...</div>
          <div class="linkbox"></div>
        </div>

        <div class="right">
          <img :src="homeimg" />
        </div>
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
      homeimg:require('../../assets/images/homepage/homeimg.jpg'),
      imgHeight: "",
      banner: [],
      servicecard: [
        {
          id: 0,
          img: require("../../assets/images/homepage/a1.png"),
          title: "全科中心",
          intro:
            "愿为每一只宠物提供专业诊疗技术以及周到服务，专注于宠物各种常见病，更加坚持对疑难..."
        },
        {
          id: 1,
          img: require("../../assets/images/homepage/a2.png"),
          title: "骨科中心",
          intro: "愿为每一只宠物提供专业诊疗技术以及周到服务，专注于宠物各种常见病，更加坚持对疑难..."
        },
        {
          id: 2,
          img: require("../../assets/images/homepage/a3.png"),
          title: "手术中心",
          intro: "愿为每一只宠物提供专业诊疗技术以及周到服务，专注于宠物各种常见病，更加坚持对疑难..."
        },
        {
          id: 3,
          img: require("../../assets/images/homepage/a4.png"),
          title: "全科中心",
          intro: "愿为每一只宠物提供专业诊疗技术以及周到服务，专注于宠物各种常见病，更加坚持对疑难..."
        }
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


</style>