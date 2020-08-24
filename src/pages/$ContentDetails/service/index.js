/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:55:46
 * @LastEditTime: 2020-08-24 15:08:27
 */ 
import request from '@http';

export async function queryArt(params){
  // return request(`http://newsdata.peopletech.cn/wapapi/detail/ZXB-ORIGIN-4437761/webCard`, {
  //   method: 'get',
  // })
  return request(`https://newsdata.peopletech.cn/appapi/detail/4365092`, {
    method: 'get',
  })
  
}

// 领取队列
export async function getNewsGetTask(params){
  return request(`/audit/news/getTask`, {
    method: 'POST',
    body: params
  })
}

// 保存当前文章
export async function getNewsSaveContent(params){
  return request(`/audit/news/save/content`, {
    method: 'POST',
    body: params
  })
}

// 保存标签
export async function getSaveTags(params){
  return request(`/audit/news/save/content`, {
    method: 'POST',
    body: params
  })
}

// 跳过当前待审文章
export async function getNewsSkip(params){
  return request(`/audit/news/skip`, {
    method: 'POST',
    body: params
  })
}

// 退出当前领取队列接口
export async function getNewsExit(params){
  return request(`/audit/news/exit`, {
    method: 'POST',
    body: params
  })
}

