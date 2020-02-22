<template>
  <div class="login_con">
    <div class="login_img">
      <img src="../assets/images/bg-01.jpg" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style  scoped>
.login_img {
  border-radius: 10px;
  width: 100%;
  height: 180px;
  background-image: url(../assets/images/bg-01.jpg);
}
.login_con {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 670px;
  height: 500px;
  background-color: aliceblue;
  border-radius: 10px;
}
</style>
