import Vue from 'vue'
import VueRouter from 'vue-router'  
Vue.use(VueRouter)

import Login from '../views/login/Login'
import System from '../views/system/System'
const Welcome = ()=>import ("../components/welcome.vue")
const User = ()=>import ("../components/user.vue")
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
    component: System,
    children: [
      {
        path: "/system",
        redirect: "/welcome"
      },
      {
        path: "/welcome",
        component: Welcome
      },
      {
        path: "/users",
        component: User
      }
    ]
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