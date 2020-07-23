/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-01 15:46:34
 * @LastEditTime: 2020-07-21 15:43:26
 */ 
 
module.exports= [
  { 
    icon: 'area-chart',
    title: '审核统计',
    key:'/statistics',
    path: '/statistics',
    notOpen: true,
    component: '../pages/Dashboard/index',
    // Routes: ['./src/router/PrivateRoute.js'],
    routes:[
      {
        icon: 'area-chart',
        title: '审核统计',
        key:'/statistics/',
        path: '/statistics/',
        component: '../pages/AuditStatistics/routes/Index',
      },
      {
        icon: 'bars',
        title: '审核明细',
        key:'/statistics/details',
        path: '/statistics/details',
        component: '../pages/AuditStatistics/routes/Details',
      },
    ]
  }
];