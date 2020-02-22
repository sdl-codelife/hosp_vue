<template>
  <div>
    <UserHeader></UserHeader>
    <router-view/>
  </div>
</template>
<script>
import UserHeader from "../components/UserHeader";
export default {
  data() {
    return {};
  },
  components: {
    UserHeader,
  }
};
</script>

<style>
</style>