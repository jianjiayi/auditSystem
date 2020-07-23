/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:06:21
 * @LastEditTime: 2020-07-21 15:43:17
 */ 
module.exports= [
  { 
    path: '/', 
    key: '/Home',
    title: '首页',
    icon: 'home',
    component: '../pages/HomePage/routes/index',
    Routes: ['./src/router/PrivateRoute.js'],
  }
];