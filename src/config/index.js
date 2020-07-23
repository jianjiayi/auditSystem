/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-01 14:15:45
 * @LastEditTime: 2020-07-21 16:36:16
 */ 

const type = process.env.BUILD_TYPE;

console.log(process.env)

// 设置请求统一路径
let URL = ''
switch(type){
  case 'dev':
    URL = 'http://dev.com';
    break;
  case 'test1':
    URL = 'http://test1.com';
    break;
  case 'test2':
    URL = 'http://test2.com';
    break;
  case 'prod':
    URL = 'http://prod.com';
    break;
}

export const BASEURL = URL;

export const rootPathName = '/home'