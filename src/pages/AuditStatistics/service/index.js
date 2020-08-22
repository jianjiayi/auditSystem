/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:55:46
 * @LastEditTime: 2020-08-21 16:59:29
 */ 
import request from '@http';

// 审核统计列表查询接口
export async function getStatisticQuery(params){
  return request(`/audit/statistic/${params.type}/query`, {
    method: 'POST',
    body: params
  })
}


// 人员统计详情查询接口
export async function getPersoneDetailQuery(params){
  return request(`/audit/statistic/person/detail/query`, {
    method: 'POST',
    body: params
  })
}