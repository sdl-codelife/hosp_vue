<template>
  <div class="markdown">
    <div class="container">
      <mavon-editor
        v-model="content"
        ref="md"
        @imgAdd="$imgAdd"
        @change="change"
        @imgDel="$imgdel"
        style="min-height: 600px"
      />
      <button @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default {
  name: "",
  props: [],
  components: {
    mavonEditor
  },
  data() {
    return {
      content: "",
      html: " <blockquote><p>段落引用</p></blockquote>",
      configs: {}
    };
  },
  methods: {
    // 将图片上传到服务器，返回地址替换到md中
    $imgAdd(pos, $file) {
      var formdata = new FormData();
      formdata.append("file", $file);
      this.$fileRequest("/uploadfile", formdata)
        .then(res => {
          console.log(res.data);
          this.$refs.md.$img2Url(pos, res.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    $imgdel(pos) {
      this.$deleteRequest("/delfile?url="+pos[0]).then(res => {
        if (res.data.code == 200) {
          this.$message.success("删除成功");
        }
      });
    },
    // 所有操作都会被解析重新渲染
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      this.html = render;
    },
    // 提交
    submit() {
      console.log(this.html);
      //this.content:
      this.$message.success("提交成功，已打印至控制台！");
    }
  },
  mounted() {}
};
</script>