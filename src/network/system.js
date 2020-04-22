import { request } from './request'

export function menuData(){
  return request({
    url: 'menus',
    method: "get",
  })
}