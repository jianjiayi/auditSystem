/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-23 11:06:11
 * @LastEditTime: 2020-08-11 10:55:14
 */

export default {
  // "/user": {       //设置了需要代理的请求头，比如这里定义了 /api ，当你访问如 /api/abc 这样子的请求，就会触发代理                     
  //   target: "http://172.30.4.49:8180/user",   //设置代理的目标，即真实的服务器地址               
  //   changeOrigin: true,    //设置是否跨域请求资源           
  //   pathRewrite: { "^/user" : "" }     //表示是否重写请求地址，比如这里的配置，就是把 /api 替换成空字符
  // },
  // "/user": {                     
  //   target: "http://172.30.4.49:8180/user",       
  //   changeOrigin: true,            
  //   pathRewrite: { "^/user" : "" }
  // }
};