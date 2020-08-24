/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-30 16:55:18
 * @LastEditTime: 2020-08-22 14:13:21
 */ 
import request from '@http';

// 首页数据接口
export async function getStatisticCount(params){
  return request(`/audit/statistic/count?businessId=${params.businessId}`, {
    method: 'GET',
  })
}