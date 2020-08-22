/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:55:46
 * @LastEditTime: 2020-08-22 11:25:34
 */ 
import request from '@http';

// 审核检索列表查询接口
export async function getStatisticQuery(params){
  return request(`/audit/statistic/query`, {
    method: 'POST',
    body: params
  })
}