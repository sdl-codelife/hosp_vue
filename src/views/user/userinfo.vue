<template>
  <div>
    <!--面包屑 -->
    <div class="breadcrumb">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/userhome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="menua">
      <div>
        <!--个人信息表单 -->
        <template>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="一般设置" name="first">
              <div class="formcard">
                <el-form ref="userinfoform" :model="userinfoform" label-width="80px">
                  <div>
                    <el-form-item label="头像">
                      <el-avatar shape="square" :size="60" :src="avatarUrl"></el-avatar>
                      <el-upload
                        action
                        :auto-upload="true"
                        :http-request="handleHttpRequest"
                        :before-upload="beforeAvatarUpload"
                        ref="avatar"
                      >
                        <el-button type="primary" round size="mini">修改头像</el-button>
                      </el-upload>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="用户名">
                      <el-input disabled v-model="userinfoform.username"></el-input>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="真实姓名">
                      <el-input placeholder="请输入真实姓名" v-model="userinfoform.realname"></el-input>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="性别">
                      <el-radio v-model="userinfoform.sex" label="男">男</el-radio>
                      <el-radio v-model="userinfoform.sex" label="女">女</el-radio>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="邮箱">
                      <el-input placeholder="请输入邮箱" v-model="userinfoform.email" prop="email"></el-input>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="手机号">
                      <el-input placeholder="请输入手机号码" v-model="userinfoform.phone" prop="phone"></el-input>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item label="个人介绍">
                      <el-input placeholder="请输入自我介绍" type="textarea" v-model="userinfoform.intro"></el-input>
                    </el-form-item>
                  </div>
                  <div class="upbtn">
                    <el-button @click="updateUserInfo" type="primary">更新信息</el-button>
                  </div>
                </el-form>
              </div>
            </el-tab-pane>
            <!--安全设置表单 -->
            <el-tab-pane class label="安全设置" name="second">
              <div>
                <div class="securitycard">
                  <div class="formcard">
                    <div>
                      <el-collapse accordion>
                        <el-collapse-item title="更改用户名" name="1">
                          <el-form
                            ref="updateUsername"
                            :model="securityform"
                            :rules="securityrules"
                            label-width="80px"
                          >
                            <el-form-item label="用户名" prop="username">
                              <el-input v-model="securityform.username"></el-input>
                            </el-form-item>
                            <el-form-item label="旧密码" prop="oldpassword">
                              <el-input type="password" v-model="securityform.oldpassword"></el-input>
                            </el-form-item>
                            <div class="upbtn">
                              <el-button @click="upateUsername" type="danger">修改</el-button>
                            </div>
                          </el-form>
                        </el-collapse-item>
                        <el-collapse-item title="更改用户密码" name="2">
                          <el-form
                            ref="securityform"
                            :model="securityform"
                            :rules="securityrules"
                            label-width="80px"
                          >
                            <el-form-item label="旧密码" prop="oldpassword">
                              <el-input type="password" v-model="securityform.oldpassword"></el-input>
                            </el-form-item>
                            <el-form-item label="新密码" prop="newpassword">
                              <el-input type="password" v-model="securityform.newpassword"></el-input>
                            </el-form-item>
                            <el-form-item label="重复密码" prop="newpasswordagain">
                              <el-input type="password" v-model="securityform.newpasswordagain"></el-input>
                            </el-form-item>
                            <div class="upbtn">
                              <el-button @click="updatepassword" type="danger">修改</el-button>
                            </div>
                          </el-form>
                        </el-collapse-item>
                      </el-collapse>
                    </div>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.getUserInfo();
  },
  data() {
    var checkusername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户名不能为空！"));
      } else {
        this.$getRequest("/checkusername?username=" + value).then(res => {
          if (res.data.code !== 200) {
            callback(new Error("用户名已存在，请重新输入"));
          } else {
            callback();
          }
        });
      }
    };
    var checkoldpassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入原密码!"));
      } else {
        this.$getRequest("/checkpassword?password=" + value)
          .then(res => {
            if (res.data.data === false) {
              callback(new Error("原密码错误!"));
            } else {
              callback();
            }
          })
          .catch(e => {
            console.log(e);
          });
      }
    };
    var checkpassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value == this.securityform.oldpassword) {
        callback(new Error("原来的密码相同！"));
      } else {
        callback();
      }
    };
    var checkpasswordagain = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再输入一次密码"));
      } else if (value !== this.securityform.newpassword) {
        callback(new Error("两次输入的密码不一致！"));
      } else {
        callback();
      }
    };
    return {
      userid: "",
      avatarUrl: "",
      activeName: "first",
      userinfoform: {
        realname: "",
        username: "",
        sex: "",
        email: "",
        phone: "",
        intro: ""
      },
      securityform: {
        username: "",
        oldpassword: "",
        newpassword: "",
        newpasswordagain: ""
      },
      securityrules: {
        username: [
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur"
          },
          { validator: checkusername, trigger: "blur" }
        ],
        oldpassword: [
          { validator: checkoldpassword, trigger: "blur" },
          { min: 5, message: "长度太短", trigger: "blur" }
        ],
        newpassword: [
          { min: 5, message: "长度太短", trigger: "blur" },
          { validator: checkpassword, trigger: "blur" }
        ],
        newpasswordagain: [
          { min: 5, message: "长度太短", trigger: "blur" },
          { validator: checkpasswordagain, trigger: "blur" }
        ]
      },
      userinforules: {
        email: [
          {
            required: true, //是否必填
            message: "请输入邮箱地址", //错误提示信息
            trigger: "blur" //检验方式（blur为鼠标点击其他地方，）
          },
          {
            type: "email", //要检验的类型（number，email，date等）
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        phone: [
          {
            required: true,
            pattern: /^1[34578]\d{9}$/, //可以写正则表达式呦呦呦
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleClick(tab, event) {},
    //获取用户信息
    async getUserInfo() {
      await this.$getRequest("/getuserinfo").then(Response => {
        this.userinfoform.realname = Response.data.data.realname;
        this.userinfoform.username = Response.data.data.username;
        this.userinfoform.sex = Response.data.data.sex;
        this.userinfoform.email = Response.data.data.email;
        this.userinfoform.phone = Response.data.data.phone;
        this.userinfoform.intro = Response.data.data.intro;
        this.avatarUrl = Response.data.data.avatar;
        this.userid = Response.data.data.userid;
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG /png格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleHttpRequest(img) {
      let imgfile = img.file;
      let formdata = new window.FormData();
      formdata.append("imgfile", imgfile);
      this.$fileRequest("/uploadimage", formdata)
        .then(res => {
          this.$refs.avatar.clearFiles();
          const avatar = res.data.data;
          console.log(avatar + "  上传成功回返链接");
          this.avatarUrl = avatar;
          // this.$store.commit('updateAvatar',avatar)
          this.$message.success("修改成功!");
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateUserInfo() {
      this.$refs.userinfoform.validate(validate => {
        if (!validate) {
          return;
        }
        this.$confirm("确定更新信息?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
          .then(() => {
            let userinfo = {
              realname: this.userinfoform.realname,
              sex: this.userinfoform.sex,
              email: this.userinfoform.email,
              phone: this.userinfoform.phone,
              intro: this.userinfoform.intro,
              userid: this.userid
            };
            this.$putRequest("/updateUserinfo", userinfo)
              .then(res => {
                if (res.data.code == 200) this.$message.success("操作成功！");
              })
              .catch(e => {
                console.log(e);
              });
          })
          .catch(() => {
            this.$message.info("已取消操作!");
          });
      });
    },
    upateUsername() {
      this.$refs.updateUsername.validate(validate => {
        if (!validate) {
          return;
        }
        let user = {
          id: this.userid,
          username: this.securityform.username
        };
        this.$confirm("确定修改? 修改成功将重新登录！", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }).then(() => {
          this.$putRequest("/updateuser", user)
            .then(res => {
              if (res.data.code == 200) {
                this.$message.success("修改成功，请重新登录！");
                window.sessionStorage.clear();
                this.$router.push("/login");
              }
            })
            .catch(() => {
              this.$message.info("已取消操作!");
            });
        });
      });
    },
    updatepassword() {
      this.$refs.securityform.validate(validate => {
        if (!validate) {
          return false;
        }
        let user = {
          id: this.userid,
          password: this.securityform.newpasswordagain
        };
        //修改密码逻辑
        this.$confirm("确定修改？修改成功将重新登录！", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
          .then(res => {
            this.$putRequest("/updateuser", user)
              .then(res => {
                console.log(res);
                if (res.data.code == 200) {
                  this.$message.success("修改成功，请重新登录!");
                  window.sessionStorage.clear();
                  this.$router.push("/login");
                }
              })
              .catch(e => {
                console.log(e);
              });
          })
          .catch(() => {
            this.$message.info("已取消操作!");
          });
      });
    }
  }
};
</script>
<style>
.breadcrumb {
  margin-top: 20px;
  margin-left: 30px;
}

.formcard {
  padding-top: 10px;
  width: 500px;
}
.upbtn {
  float: right;
}
.avatorimg {
  width: 60px;
}
.uploadimage {
  margin-left: 300px;
}
.userinfocard {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  float: left;
  width: 400px;
  height: 200px;
}
.securitycard {
  height: 400px;
  background-color: white;
  padding: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
</style>
