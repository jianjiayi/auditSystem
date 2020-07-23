/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-01 15:46:34
 * @LastEditTime: 2020-07-21 15:43:46
 */ 
 
module.exports= [
  { 
    icon: 'file-search',
    title: '审核检索',
    key:'/search',
    path: '/search',
    component: '../pages/AuditSearch/routes/index',
    Routes: ['./src/router/PrivateRoute.js'], 
  }
];