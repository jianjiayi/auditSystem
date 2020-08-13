/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:55:46
 * @LastEditTime: 2020-08-11 09:41:55
 */ 
import request from '@http';

// 用户登录
export async function login(params ={}){
  return request(`/user/login`, {
    method: 'POST',
    body: params
  })
}

// 获取用户业务线
export async function getBusiness(params ={}){
  return request(`/user/getBusiness`, {
    method: 'POST',
    body: params
  })
}

// 获取用户角色和权限
export async function getRoleAndPermission(params ={}){
  return request(`/user/getRoleAndPermission`, {
    method: 'POST',
    body: params
  })
}

// 退出登录
export async function logout(params ={}){
  return request(`/user/logout`, {
    method: 'POST',
    body: params
  })
}