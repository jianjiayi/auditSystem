/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:55:46
 * @LastEditTime: 2020-08-10 09:09:10
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