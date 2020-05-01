<template>
  <div class="user">
    <!-- 面包屑 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/system' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 搜索框 -->
      <el-row :gutter="10">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="show">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 表格主体 -->
      <el-table :data="users" border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="角色" prop="role_name"></el-table-column>
        <el-table-column label="状态" prop="mg_state">
          <!-- 滑动开关 -->
          <template v-slot:default="scope">
            <!-- {{scope.row}} -->
            <el-switch
              v-model="scope.row.mg_state"
              @change="userChange(scope.row)"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template v-slot:default="scope">
            <div class="operation">
              <el-button
                class="el-icon-edit"
                size="mini"
                type="primary"
                @click="changeUser(scope.row.id)"
              ></el-button>
              <el-popconfirm title="确定删除该用户吗？"  @onConfirm="delUser(scope.row.id)">
                <el-button slot="reference"
                  class="el-icon-delete-solid"
                  size="mini"
                  type="danger"
                ></el-button>
              </el-popconfirm>

              <el-button class="el-icon-s-tools" size="mini" type="warning"></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 页码 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="paramsInfo.pagenum"
          :page-sizes="[2, 5, 10, 15]"
          :page-size="2"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalPages"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 添加用户 -->
    <el-dialog
      title="添加用户"
      :visible.sync="isShowAdd"
      width="50%"
      :close-on-click-modal="false"
      @close="close"
    >
      <!-- 表单 -->
      <el-form :model="formData" ref="ruleForm" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="formData.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="isShowAdd = false">取 消</el-button>
        <el-button type="primary" @click="commit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户信息 -->
    <el-dialog
      title="修改用户信息"
      :visible.sync="isShowChange"
      width="30%"
      :close-on-click-modal="false"
    >
      <el-form :model="changeUserData" ref="ruleForm2" :rules="rules">
        <el-form-item label="用户名">
          <el-input v-model="changeUserData.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="changeUserData.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="changeUserData.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="isShowChange = false">取 消</el-button>
        <el-button type="primary" @click="changeInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>



<script>
import {
  usersData,
  userStateChange,
  addUser,
  changeUserInfo,
  findInfo,
  delUser
} from "../network/system";
export default {
  name: "User",
  components: {},
  data() {
    // 邮箱校验
    var checkEmail = (rule, value, callback) => {
      //邮箱正则
      const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (regEmail.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的邮箱"));
      }
    };
    // 手机号校验
    var checkMobile = (rule, value, callback) => {
      const regTel = /^1[3456789]\d{9}$/;
      if (regTel.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的手机号"));
      }
    };
    return {
      rules: {
        //表单校验规则
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6到 18 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" }
        ]
      },
      formData: {
        //添加用户参数
        username: "5436750",
        password: "19891124",
        email: "543675075@qq.com",
        mobile: "15850396625"
      },
      changeUserData: {}, //修改用户
      input3: "", //搜索框
      isShowAdd: false, //添加用户显示/隐藏
      isShowChange: false, //修改用户显示/隐藏
      form: "",
      paramsInfo: {
        //获取用户列表参数
        query: "",
        pagenum: 1,
        pagesize: 2
      },
      totalPages: 0, //总页数
      users: [] //用户信息
    };
  },
  created() {
    this._usersData({ ...this.paramsInfo });
  },
  methods: {
    // 发送网络请求获取用户信息
    _usersData(params) {
      usersData(params).then(res => {
        const { users } = res.data.data;
        this.users = users;
        // console.log(this.users);
        this.totalPages = res.data.data.total;
      });
    },
    // 改变用户状态
    userChange(res) {
      console.log(res);
      userStateChange(res.id, res.mg_state).then(res => {
        const { status } = res.data.meta;
        if (status != 200) {
          res.mg_state = !res.mg_state;
          this.$message.error("修改失败，请刷新重试");
          return false;
        }
        this.$message.success("修改成功");
      });
    },
    // pages页码点击事件
    handleSizeChange(res) {
      this.paramsInfo.pagesize = res;
      this._usersData({ ...this.paramsInfo });
    },
    // 点击某一页跳转
    handleCurrentChange(res) {
      this.paramsInfo.pagenum = res;
      this._usersData({ ...this.paramsInfo });
    },
    // 搜索(也就是根据搜索框内容重新发送网络请求获取用户信息)
    search() {
      this.paramsInfo.query = this.input3;
      this._usersData({ ...this.paramsInfo });
      this.input3 = "";
    },
    //  点击添加用户对话框显示
    show() {
      this.isShowAdd = true;
    },
    // 添加用户对话框关闭触发事件
    close() {
      // 重置表单
      this.$refs.ruleForm.resetFields();
    },
    // 提交添加新用户按钮事件
    commit() {
      // 提交前的表单校验
      this.$refs.ruleForm.validate(message => {
        if (!message) return; //如果校验没通过直接返回
        //校验通过发送网络请求
        addUser({
          ...this.formData
        }).then(res => {
          // console.log({ ...this.formData });
          if (res.data.meta.status == 201) {
            this.$message.success("添加成功");
            // 关闭窗口
            this.isShowAdd = false;
            // 重新刷新用户列表
            this._usersData({ ...this.paramsInfo });
          } else {
            this.$message.error(res.data.meta.msg);
          }
        });
      });
    },
    // 点击修改用户按钮
    changeUser(id) {
      // 开启dialog
      this.isShowChange = true;
      // 发送查询请求
      findInfo(id).then(res => {
        // console.log(res);
        this.changeUserData = res.data.data;
      });
    },
    //提交修改用户
    changeInfo() {
      console.log({ ...this.changeUserData });
      // 提交前判断内容是否符合规范
      this.$refs.ruleForm2.validate(msg => {
        if (!msg) return this.$message.error("请输入正确的内容");
        // 提交修改网络请求
        changeUserInfo(
          this.changeUserData.id,
          this.changeUserData.email,
          this.changeUserData.mobile

          // {...this.changeUserData}
        ).then(res => {
          // console.log(res);
          if (res.data.meta.status != 200)
            return this.$message.error(res.data.meta.msg);
          // 修改成功后重新刷新用户列表
          this._usersData({ ...this.paramsInfo });
          this.$message.success("修改成功");
          // 关闭dailog
          this.isShowChange = false;
        });
      });
    },
    // 删除用户
    delUser(id) {
      console.log(id);
      // 发送删除网络请求
      delUser(id).then(res => {
        if (res.data.meta.status != 200)
          return this.$message.error(res.data.meta.msg);
        this.$message.success(res.data.meta.msg);
        // 刷新用户列表
        this._usersData({ ...this.paramsInfo });
      });
    }
  }
};
</script>
<style lang='less' scoped>
.el-card {
  margin-top: 20px;
  .el-table {
    margin: 10px 0;
  }
  .operation {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
  }
 
}
 
</style>