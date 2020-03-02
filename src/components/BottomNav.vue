<template>
  <div>
    <footer>
      <div class="ftop">
        <div class="link">
          友情链接：
          <a href>/百度</a>
          <a href>/宠物医院</a>
        </div>
      </div>
      <div class="m2">
        <div class="bo">
          <div class="left">
            <div class="lef">
              <ul>
                <li>
                  <a href>
                    <strong>宠物医院</strong>
                  </a>
                </li>
                <li>
                  <a href>品牌中心</a>
                </li>
                <li>
                  <a href>荷兰迪威德</a>
                </li>
                <li>
                  <a href>优惠活动</a>
                </li>
                <li>
                  <a href>医院荣誉</a>
                </li>
              </ul>
            </div>

            <div class="lef">
              <ul>
                <li>
                  <a href>新闻中心</a>
                </li>
              </ul>
            </div>

            <div class="lef">
              <ul>
                <li>
                  <a href>
                    <strong>医院信息</strong>
                  </a>
                </li>
                <li>
                  <a href>分院门诊</a>
                </li>
                <li>
                  <a href>医疗团队</a>
                </li>
                <li>
                  <a href>医疗服务</a>
                </li>
              </ul>
            </div>

            <div class="lef">
              <ul>
                <li>
                  <a href>
                    <strong>更多关注</strong>
                  </a>
                </li>
                <li>
                  <a href>案例中心</a>
                </li>
                <li>
                  <a href>联系我们</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="boto">宠物医院 版权所有 京ICP备19001563号</div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
body,
div,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
ol,
li,
p,
span,
i,
em,
dl,
dt,
a {
  margin: 0;
  padding: 0;
  /* 轮廓线 */
  /* outline: 1px dashed; */
}
body {
  color: #333333;
  font-size: 12px;
  background-color: #f0eae6;
}
a {
  color: #333;
  text-decoration: none;
}
a:hover {
  color: #006699;
}
img {
  border: none;
}
li {
  list-style-type: none;
}

footer {
  height: 350px;
  color: #ddd;
  background-color: #222;
  display: block;
  padding-top: 30px;
  padding-right: 0px;
  padding-bottom: 0px;
  padding-left: 0px;

  position: relative;
}
footer .ftop {
  height: 50px;
  text-align: center;
  font-size: 14px;
  background-color: #282828;
}
footer .ftop .link {
  height: 20px;
  padding-top: 15px;
}
footer ul,
footer li {
  padding: 0px;
  margin: 0px;
}
footer a {
  color: white;
}

footer li {
  line-height: 30px;
  font-size: 12px;
}
footer .lef {
  float: left;
  width: 150px;
  height: 280px;
}
footer .left {
  width: 820px;
  height: 280px;
  float: left;
  margin-left: 150px;
}
footer .left ul li {
  font-size: 15px;
  margin-top: 20px;
}
footer .right {
  line-height: 50px;
  width: 246px;
  height: 280px;
  float: right;
  margin-right: 80px;
  font-size: 15px;
}
footer .right .telnumber {
  font-size: 24px;
}
footer .bo {
  padding-left: 20px;
  padding-right: 20px;
}
footer .boto {
  line-height: 40px;
  text-align: center;
  height: 40px;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: #676767;
  color: #808080;
  position: absolute;
  bottom: 0;
  width: 100%;
  color: #ffffff;
}
</style>