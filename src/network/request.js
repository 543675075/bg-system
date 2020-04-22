import axios from "axios"

export function request(config){
  // 创建axios实例
  const example = axios.create({
    baseURL: 'http://timemeetyou.com:8889/api/private/v1',
    timeout: 4000
  })

 
  //请求拦截
  example.interceptors.request.use(config=>{
    console.log(config)
    // 需要授权的 API ，必须在请求头中使用 Authorization 字段提供 token 令牌
    config.headers.Authorization = window.sessionStorage.getItem("token")
    return config
  },err=>{
    return err
  })
  // // 响应拦截
  // example.Interceptors.response.use(result=>{
  //   return resule
  // },err=>{
  //   return err
  // })

  // 发送网络请求
  return example(config)
}