/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:55:46
 * @LastEditTime: 2020-08-04 10:41:14
 */ 
import request from '@http';

export async function queryArt(params){
  return request(`http://newsdata.peopletech.cn/wapapi/detail/ZXB-ORIGIN-4437761/webCard`, {
    method: 'get',
  })
}