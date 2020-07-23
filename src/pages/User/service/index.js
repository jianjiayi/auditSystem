/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:55:46
 * @LastEditTime: 2020-07-21 09:39:23
 */ 
import request from '@http';

export async function login(params){
  alert(1)
  return request(`/api/user/login`, {
    method: 'post',
    data: params
  })
}