/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-01 15:46:34
 * @LastEditTime: 2020-08-12 11:03:19
 */ 
 
module.exports= [
  { 
    icon: 'radius-setting',
    title: '审核设置',
    key:'/setting',
    path: '/setting',
    notOpen: true,
    component: '../pages/Dashboard/index',
    routes: [
      {
        icon: 'radius-setting',
        title: '审核设置',
        key:'/setting/',
        path: '/setting/',
        component: '../pages/AuditSettings/routes/Index',
        Routes: ['./src/router/PrivateRoute.js'],
      },
      {
        icon: 'bars',
        title: '队列详情',
        key:'/setting/',
        path: '/setting/details/',
        component: '../pages/AuditSettings/routes/Detials',
        Routes: ['./src/router/PrivateRoute.js'],
      },
    ],
  }
];