import Vue from 'vue'
import VueRouter from 'vue-router'  
Vue.use(VueRouter)

import Login from '../views/login/Login'
import System from '../views/system/System'
const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/system",
    component: System
  }
]
const router = new VueRouter({
  routes,
  mode: "history"
})

// 导航守卫
router.beforeEach((to, from, next) => {
  const token = window.sessionStorage.getItem("token");
  if(to.path == "/login") return next()
  if(!token) {
    next("/login")
  }
  next()
})

export default router