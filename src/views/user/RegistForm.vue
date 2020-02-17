<template>
  <div>
    <!-- 面包屑-->
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/Home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>快速挂号</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="menua">
      <el-steps :active="active" finish-status="success">
        <el-step
          v-for="item in stepData"
          :key="item.index"
          :title="item.title"
          :description="item.description"
        ></el-step>
      </el-steps>
      <el-row class="active0" v-show="active === 0">
        <el-form ref="registform" :model="registform" label-width="80px">
          <el-form-item label="挂号时间">
            <el-date-picker
              :picker-options="pickerOptions"
              v-model="registform.date"
              type="datetime"
              format="yyyy年MM月dd hh:mm"
              value-format="yyyy-MM-dd hh:mm"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="选择宠物">
            <el-select v-model="registform.petid" clearable placeholder="请选择">
              <el-option
                v-for="item in petoptions"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="病情描述">
            <el-input v-model="registform.question" type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <el-button style="margin-top: 12px;" @click="step1">下一步</el-button>
        <el-button style="margin-top: 12px;" @click="cancle"> 重置 </el-button>
      </el-row>

      <el-row class="active0" v-show="active === 1">
        <el-form ref="registform.question" :model="registform" label-width="80px">
          <div>doctor</div>
          <el-form-item label="选择医生">
            <el-select v-model="registform.doctorid" clearable placeholder="请选择">
              <el-option
                v-for="item in doctoroptions"
                :key="item.userid"
                :label="item.username"
                :value="item.userid"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button style="margin-top: 12px;" @click="active = 0">上一步</el-button>
        <el-button style="margin-top: 12px;" @click="step2">下一步</el-button>
        <el-button style="margin-top: 12px;" @click="cancle">取消</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getmypetname();
  },
  data() {
    return {
      petoptions: [],
      doctoroptions: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      registform: {
        createtime: "",
        petid: "",
        question: "",
        userid: "",
        doctorid: ""
      },
      active: 0, // 控制步骤条及填写条目的显示
      stepData: [
        {
          index: 0,
          title: "步骤1",
          icon: "el-icon-edit",
          description: "选择你要挂号的宠物创建挂号单"
        },
        {
          index: 1,
          title: "步骤2",
          icon: "el-icon-edit",
          description: "选择你要看的医生或者系统随机选择"
        },
        {
          index: 2,
          title: "步骤3",
          icon: "el-icon-edit",
          description: "挂号完成"
        }
      ],
      nextTile: "下一步"
    };
  },

  methods: {
    cancle() {
        //清空表单
        this.active = 0},
    getmypetname() {
      this.$getRequest("/getuserpet").then(res => {
        this.petoptions = res.data.data.list;
      });
    },
    getdoctor() {
      this.$getRequest("/getalldoctor").then(res => {
        this.doctoroptions = res.data.data.list;
        console.log(this.doctoroptions);
      });
    },
    step1() {
      this.getdoctor();

      if (this.active++ > 2) this.active = 0;
    }
  }
};
</script>

<style>
.active0 {
  margin-top: 50px;
  width: 600px;
}
</style>