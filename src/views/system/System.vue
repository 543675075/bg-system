<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <h1>客户后台管理系统</h1>
      <span class="exit" @click="exit">退出登录</span>
    </el-header>
    <!-- 主体内容区 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="collapse?'60px':'200px'">
        <div class="collapse" @click="isCollapse">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <!-- 侧边栏主体 -->
        <el-menu
          :collapse= "collapse"
          unique-opened
          router
          :collapse-transition = "false"
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409eff"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.path" v-for="item in authName" :key="item.path">
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <i :class="iconfont[item.path]" class="iconfont"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 2级菜单 -->
            <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.path">
              <!-- 2级菜单模板区 -->
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体 -->
      <el-main>
        <keep-alive>
          <router-view></router-view> 
        </keep-alive>
      </el-main>
    </el-container>
  </el-container>
</template>



<script>
import { menuData } from "../../network/system";
export default {
  name: "",
  components: {},
  data() {
    return {
      authName: [],
      iconfont: {
        "users": "iconfont icon-yonghuguanli",
        "rights": "iconfont icon-quanxianguanli",
        "goods": "iconfont icon-shangpinguanli",
        "orders": "iconfont icon-dingdan",
        "reports": "iconfont icon-shujutongji",
      },
      collapse: false
    };
  },
  created() {
    this._menuData()
  },
  methods: {
    // 退出登录
    exit() {
      window.sessionStorage.clear();
      this.$router.replace("/login");
    },
    // 获取左侧菜单列表数据
    _menuData() {
      menuData().then(res => {
        // console.log(res);
        this.authName = res.data.data;
      });
    },
    // 左侧菜单点击折叠展开
    isCollapse(){
      this.collapse = !this.collapse
    },
    //
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang='less' scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #373d41;
  color: #fff;
  .exit {
    display: block;
    padding: 10px;
    background: #ccc;
    border-radius: 5px;
    cursor: pointer;
  }
}

.el-aside {
  background-color: #545c64;
  color: #fff;
  line-height: 200px;
  .collapse{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 30px;
    background: #333;
    cursor: pointer;
    span{
      display: inline-block;
      margin: 0 2px;
      width: 2px;
      height: 15px;
      background-color: #fff;
    }
  }
  .el-menu {
    border-right: none;
    .iconfont{
      font-size: 25px;
      margin-right: 10px;
    }
  }
}

.el-main {
  background-color: #eaedf1;
  color: #ccc;
  text-align: center;
}

.el-container {
  width: 100%;
  height: 100%;
}
</style>