/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-01 14:15:45
 * @LastEditTime: 2020-08-27 16:45:27
 */ 

const type = process.env.BUILD_TYPE;

console.log(process.env)

// 设置请求统一路径
let URL = ''
switch(type){
  case 'dev':
    URL = 'http://172.30.4.49:8180'; //gxp
    // URL = 'http://172.30.4.88:8180'; //zb
    break;
  case 'test1':
    URL = 'http://test1.com';
    break;
  case 'test2':
    URL = 'http://test2.com';
    break;
  case 'prod':
    URL = 'http://172.30.4.88:8180';
    break;
}

export const BASEURL = URL;

export const rootPathName = '/home'