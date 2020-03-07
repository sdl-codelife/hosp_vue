<template>
  <div class="breadcrumb">
    
    <div class="newscontainer">
      <div class="newscontant">
        <div class="newsleft">
          <div class="newstitlebox">
            <h3>联系我们</h3>
          </div>
          <div class="news">
            <h3>新闻中心</h3>
            <ul>
              <li v-for="item in news" :key="item.id">
                <h6>
                  <a @click="seenews(item)">{{item.title}}</a>
                </h6>
              </li>
            </ul>
          </div>
        </div>
        <div class="newsright">
          <div class="newsarticle">
            <div class="markdown-body markdown" v-html="html"></div>
            <div v-show="html.length<1">
              <div class="hospname">
                <h2>漂亮宝贝动物医院</h2>
                <ol>
                  <li>营业时间：8:30-18:00</li>
                  <li>北京市朝阳区平房东街口北侧</li>
                  <li>服务电话：010-6542 1528 / 18501986699</li>
                </ol>
                <img :src="hospimg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>

<script>

export default {
  mounted() {
    this.getmessage();
  },
  data() {
    return {
      hospimg: require("../../assets/images/homepage/hospimg.jpg"),
      html: "",
      news: []
    };
  },
  methods: {
    getmessage() {
      this.$getRequest("/getallmessage").then(res => {
        console.log(res);
        this.news = res.data.data.list;
      });
    },
    seenews(item) {
      console.log(item);
      this.html = item.content;
    }
  }
};
</script>

<style scoped>

.hospname h2{
 margin: 20px; 
}
.hospname img{
  padding-left: 100px;
 width: 600px;
 height: 400px;
}
</style>