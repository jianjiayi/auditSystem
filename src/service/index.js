/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:55:46
 * @LastEditTime: 2020-07-30 17:12:57
 */ 
import request from '@http';

export async function login(params ={}){
  return request(`/user/login`, {
    method: 'post',
    body: params
  })
}

export async function logout(params ={}){
  return request(`/user/logout`, {
    method: 'post',
    body: params
  })
}