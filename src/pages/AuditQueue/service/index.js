/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:55:46
 * @LastEditTime: 2020-07-30 17:06:57
 */ 
import request from '@http';

export async function login(params){
  alert(1)
  return request(`/user/login`, {
    method: 'post',
    body: params
  })
}