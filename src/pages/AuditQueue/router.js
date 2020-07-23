/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-01 15:46:34
 * @LastEditTime: 2020-07-21 15:44:58
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