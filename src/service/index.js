/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:55:46
 * @LastEditTime: 2020-08-14 16:19:50
 */ 
import request from '@http';

// 获取一级分类接口
export async function getFirstCategory(params){
  return request(`/audit/categoryInfo`, {
    method: 'GET',
  })
}

//获取二级分类接口
export async function getSecondCategory(params){
  return request(`/audit/categoryInfo?parentId=${params.id}`, {
    method: 'GET',
  })
}

// 获取三级分类接口
export async function getThirdCategory(params){
  return request(`/audit/categoryInfo?parentId=${params.id}`, {
    method: 'GET',
  })
}