<template>
  <div class="breadcrumb">
    <div class="newscontainer">
      <div class="newscontant">
        <div class="newsleft">
          <div class="news">
            <h3>医疗团队</h3>
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
          
          </div>
        </div>
      </div>
    </div>
    <hr />
  </div>
</template>


<script>
import "mavon-editor/dist/css/index.css";
export default {
  mounted() {
    this.getmessage();
  },
  data() {
    return {
      html: "",
      news: [],
      nownews:{}
    };
  },
  methods: {
    getmessage() {
      this.$getRequest("/getallmessage").then(res => {
        console.log(res);
        this.news = res.data.data.list;
        this.seenews(this.news[0]);
      });
    },
    seenews(item) {
      console.log(item);
      this.nownews = item
      this.html = item.content;
    }
  }
};
</script>

<style>
.markdown {
  padding: 10px;
}
.markdown img {
  width: 400px;
}
</style>