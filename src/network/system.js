import { request } from './request'
// 左侧菜单栏数据
export function menuData() {
  return request({
    url: 'menus',
    method: "get",
  })
}
// 用户数据列表
export function usersData(params) {
  return request({
    url: "users",
    method: "get",
    params: {
      query: params.query,
      pagenum: params.pagenum,
      pagesize: params.pagesize
    }
  })
}
// 修改用户状态
export function userStateChange(uId, type) {
  return request({
    url: "users/" + uId + "/state/" + type,
    method: 'put',
    params: {
      uId,
      type
    }
  })
}
// 添加用户
export function addUser(params) {
  return request({
    url: "users",
    method: "post",
    data: {
      username: params.username,
      password: params.password,
      email: params.email,
      mobile: params.mobile
    }
  })
}
// 修改用户信息
export function changeUserInfo(id, email, mobile) {
  return request({
    url: "users/" + id,
    method: "put",
    data: {
      email,
      mobile
    }
  })
}
//根据 ID 查询用户信息
export function findInfo(id) {
  return request({
    url: "users/" + id,
    method: "get"
  })
}
// 删除单个用户
export function delUser(id) {
  return request({
    url: "users/" + id,
    method: 'delete'
  })
}