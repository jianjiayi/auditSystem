/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-22 17:30:26
 * @LastEditTime: 2020-06-22 17:41:06
 */ 
import request from '@http';

// 获取用户权限
export async function getPermission(params){
  return request(`/user/login`, {
    method: 'post',
    data: params
  })
}