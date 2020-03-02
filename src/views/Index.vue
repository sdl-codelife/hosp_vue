<template>
  <div>
    <UserHeader></UserHeader>
    <router-view/>
    <BottomNav></BottomNav>
  </div>
</template>
<script>
import UserHeader from "../components/UserHeader";
import BottomNav from '../components/BottomNav'
export default {
  data() {
    return {};
  },
  components: {
    UserHeader,
    BottomNav
  }
};
</script>

<style>
</style>