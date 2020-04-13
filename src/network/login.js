import {request} from './request'



export function loginSystem(username,password) {
  return request({
    url: '/login',
    method: "post",
    params: {
      username,
      password
    }
  })
}