/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:55:46
 * @LastEditTime: 2020-08-19 14:18:11
 */ 
import request from '@http';
import { ExParams } from '@utils/utils';

// 队列查询接口
export async function getQueue(params){
  return request(`/audit/queue/query`, {
    method: 'POST',
    body: params
  })
}

// 保存接口
export async function saveQueue(params){
  return request(`/audit/queue/save`, {
    method: 'POST',
    body: params
  })
}

// 规则列表接口
export async function getRuleInfo(params){
  return request(`/audit/ruleInfo`, {
    method: 'GET',
  })
}

// 屏蔽词接口
export async function getDenyWords(params){
  const {type, ...rest} = params;
  return request(`/audit/denyWords/${type}${ExParams.getParams(rest)}`, {
    method: 'GET',
  })
}

// 内容来源、抓取来源接口
export async function getContentSource(params){
  return request(`/audit/contentSource`, {
    method: 'GET',
  })
}

// 媒体分类接口
export async function getMediaInfo(params){
  return request(`/audit/mediainfo/${params.type}`, {
    method: 'GET',
  })
}