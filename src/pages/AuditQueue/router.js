/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-01 15:46:34
 * @LastEditTime: 2020-08-17 19:46:33
 */ 
module.exports= [
  { 
    icon: 'cluster',
    title: '审核队列',
    key: '/queue',
    path: '/queue',
    component: '../pages/AuditQueue/routes/index.js',
    Routes: ['./src/router/PrivateRoute.js'], 
  }
];