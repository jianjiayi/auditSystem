/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-23 11:06:11
 * @LastEditTime: 2020-07-21 10:01:40
 */ 
export default {
  "/api": {
    target: "",
    changeOrigin: true,
    pathRewrite: { "^/api" : "" }
  }
};