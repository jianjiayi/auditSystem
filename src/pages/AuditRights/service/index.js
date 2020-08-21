/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:55:46
 * @LastEditTime: 2020-08-21 15:20:04
 */ 
import request from '@http';

// 创建编辑用户或角色接口
export async function addUserOrRole(params){
  return request(`/audit/${params.name}/${params.type}`, {
    method: 'POST',
    body: params
  })
}

// 更新用户或角色状态
export async function updateUserOrRoleStatus(params){
  let paramsstr = params.type == 'user' ? `?username=${params.username}` : `?id=${params.id}`;
  return request(`/audit/${params.type}/${params.name}${paramsstr}`, {
    method: 'POST',
    body: {}
  })
}

// 更新用户或角色信息
export async function updateUserOrRoleInfo(params){
  return request(`/audit/${params.type}/edit`, {
    method: 'POST',
    body: params
  })
}

// 查询用户或列表接口
export async function getUserOrRoleQuery(params){
  return request(`/audit/${params.type}/query`, {
    method: 'POST',
    body: params
  })
}

// 根绝业务线查询角色列表
export async function getRuleListByBusiness(params){
  return request(`/audit/role/listByBusiness/${params.id}`, {
    method: 'GET',
  })
}

// 根据id获取角色详情
export async function getRuleDetailsById(params){
  return request(`/audit/role/detail?id=${params.id}`, {
    method: 'GET',
  })
}