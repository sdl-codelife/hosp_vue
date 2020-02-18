<template>
  <div>
    <el-table :data="orderdata" style="width: 100%" border>
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="id" width="100" label="单号" sortable></el-table-column>
      <el-table-column prop="date" label="挂号时间"></el-table-column>
      <el-table-column prop="name" label="宠物姓名"></el-table-column>
      <el-table-column prop="username" label="主人" sortable></el-table-column>
      <el-table-column prop="doctorname" label="医生"></el-table-column>
      
    </el-table>
  </div>
</template>

<script>
export default {
    mounted(){
        this.getorderdata()
    },
    data(){
        return {
            orderdata:[]
        }

    },
    methods:{
        getorderdata(){
            this.$getRequest('/getorderlist')
            .then(res=>{
                console.log(res);
                
            })
        }
    }
};
</script>

<style>
</style>