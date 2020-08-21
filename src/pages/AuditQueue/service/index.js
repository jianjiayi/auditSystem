/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:55:46
 * @LastEditTime: 2020-08-20 17:47:28
 */ 
import request from '@http';

// 队列查询接口
export async function getQueueListCount(params){
  return request(`/audit/queue/listCount`, {
    method: 'POST',
    body: params
  })
}