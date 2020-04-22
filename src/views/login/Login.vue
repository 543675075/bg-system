<template>
  <div class="login">
    <div class="wrapper">
      <!-- 头像 -->
      <div class="img_border">
        <img src="../../assets/img/icon.jpg" alt />
      </div>
      <!-- 表单 -->
      <el-form class="form" :model="form" :rules="rules" ref="form">
        <el-form-item prop="name">
          <el-input prefix-icon="iconfont icon-yonghu" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="pw">
          <el-input show-password prefix-icon="iconfont icon-mima" v-model="form.pw"></el-input>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" class="btn-item" @click="login">登陆</el-button>
          <el-button type="info" class="btn-item" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>



<script>
import { loginSystem } from "../../network/login";
export default {
  name: "",
  components: {},
  data() {
    return {
      form: {
        name: "admin",
        pw: "123456"
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ],
        pw: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 6 到 18 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 重置表单框
    reset() {
      this.$refs.form.resetFields();
    },
    // 登陆
    login() {
      // 登陆前先验证表单内容的合法性,validate()是element-ui自带的验证
      this.$refs.form.validate(vali => {
        if (!vali) return;
      // 发送登陆网络请求
       loginSystem(this.form.name, this.form.pw).then(res => {
          const {meta} = res.data
          // 登陆错误提示
          if(meta.status!=200){
            this.$message.error(meta.msg)
          }else{
            // 登陆成功先保存token值在本地
            window.sessionStorage.setItem("token",res.data.data.token)
            // 跳转到后台系统页面
            this.$router.push("/system")
            // 登陆成功
            this.$message.success("登陆成功")
          }
        });
      });
    }
  }
 
};
</script>
<style lang='less' scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #2b4b6b;
  .wrapper {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 300px;
    background-color: #fff;
    .img_border {
      position: absolute;
      width: 150px;
      height: 150px;
      left: 50%;
      top: -75px;
      transform: translateX(-50%);
      padding: 10px;
      border-radius: 50%;
      border: 1px solid #fff;
      background-color: #fff;
      box-shadow: 0 1px 10px #ccc;
      overflow: hidden;
      img {
        border-radius: 50%;
        box-shadow: 0 1px 10px #ccc;
        width: 100%;
        height: 100%;
      }
    }
    .form {
      position: absolute;
      bottom: 0;
      width: 100%;
      padding: 0 20px;
      box-sizing: border-box;
      .btn {
        text-align: right;
        .btn-item {
          padding: 10px;
        }
      }
    }
  }
}
</style>