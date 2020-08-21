/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:55:46
 * @LastEditTime: 2020-08-20 19:38:54
 */ 
import request from '@http';

// 用户登录
export async function login(params ={}){
  return request(`/audit/user/login`, {
    method: 'POST',
    body: params
  })
}

// 获取当前用户信息
export async function getCurrentUser(params ={}){
  return request(`/audit/user/getCurrentUser`, {
    method: 'GET',
  })
}

// 获取用户业务线
export async function getBusiness(params ={}){
  return request(`/audit/user/getBusiness`, {
    method: 'GET',
  })
}

// 获取用户角色和权限
export async function getRoleAndPermission(params ={}){
  return request(`/audit/user/getRoleAndPermission`, {
    method: 'GET',
  })
}

// 退出登录
export async function logout(params ={}){
  return request(`/audit/user/logout`, {
    method: 'POST',
    body: params
  })
}