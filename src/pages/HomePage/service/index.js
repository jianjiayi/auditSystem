/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-30 16:55:18
 * @LastEditTime: 2020-07-30 17:07:42
 */ 
import request from '@http';

export async function login(params){
  alert(1)
  return request(`/user/login`, {
    method: 'post',
    body: params
  })
}