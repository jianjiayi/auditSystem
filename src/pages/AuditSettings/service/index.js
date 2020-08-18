/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:55:46
 * @LastEditTime: 2020-08-18 21:42:21
 */ 
import request from '@http';
import { ExParams } from '@utils/utils';

// 保存接口
export async function saveQueue(params){
  return request(`/save/queue`, {
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

// 屏蔽此接口
export async function getDenyWords(params){
  const {type, ...rest} = params;
  return request(`/audit/denyWords/${type}${ExParams.getParams(rest)}`, {
    method: 'GET',
  })
}

// 媒体分类接口
export async function getMediaInfo(params){
  return request(`/audit/mediainfo/${params.type}`, {
    method: 'GET',
  })
}