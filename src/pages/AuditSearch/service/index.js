/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:55:46
 * @LastEditTime: 2020-08-22 15:12:08
 */ 
import request from '@http';

// 审核检索列表查询接口
export async function getNewsList(params){
  return request(`/audit/news/list`, {
    method: 'POST',
    body: params
  })
}

// 批量审核接口
export async function getNewsList1(params){
  return request(`/audit/news/list`, {
    method: 'POST',
    body: params
  })
}

// 领审接口
export async function getNewsList2(params){
  return request(`/audit/news/list`, {
    method: 'POST',
    body: params
  })
}

// 加队列接口
export async function getNewsList3(params){
  return request(`/audit/news/list`, {
    method: 'POST',
    body: params
  })
}

// 操作记录接口
export async function getNewsList4(params){
  return request(`/audit/news/list`, {
    method: 'POST',
    body: params
  })
}