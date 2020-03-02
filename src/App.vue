<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "app"
};
</script>

<style >
html{
   margin: 0;
  padding: 0;
}
body{
  background-color: rgb(240, 242, 245);
  margin: 0;
  padding: 0;
}
.toolbar {
  background: #f2f2f2;
  padding: 20px;
}
.icon {
  width: 1.8em;
  height: 1.8em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.menua {
  margin-top: 20px;
  margin-right: 20px;
  margin-left: 30px;
 
}

</style>
