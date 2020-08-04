/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-23 11:06:11
 * @LastEditTime: 2020-08-03 14:18:43
 */

export default {
  "/api": {       //设置了需要代理的请求头，比如这里定义了 /api ，当你访问如 /api/abc 这样子的请求，就会触发代理                     
    target: "",   //设置代理的目标，即真实的服务器地址               
    changeOrigin: true,    //设置是否跨域请求资源           
    pathRewrite: { "^/api" : "" }     //表示是否重写请求地址，比如这里的配置，就是把 /api 替换成空字符
  }
};