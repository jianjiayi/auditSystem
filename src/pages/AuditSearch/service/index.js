/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:55:46
 * @LastEditTime: 2020-08-27 10:15:55
 */ 
import request from '@http';

// 审核检索列表查询接口
export async function getNewsList(params){
  return request(`/audit/news/list`, {
    method: 'POST',
    body: params
  })
}

// 队列查询接口
export async function getQueue(params){
  return request(`/audit/queue/query`, {
    method: 'POST',
    body: params
  })
}

// 批量审核接口
export async function getNewsBatch(params){
  const {pass, paramsList, ...rest} = params;
  return request(`/audit/news/batch?pass=${pass}`, {
    method: 'POST',
    body: paramsList
  })
}


// 加队列接口
export async function getNewsReAduit(params){
  return request(`/audit/news/reAudit`, {
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