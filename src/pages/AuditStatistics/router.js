/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-01 15:46:34
 * @LastEditTime: 2020-08-10 10:49:07
 */ 
const errorRoutes = require('../../pages/Error/router');

module.exports= [
  { 
    icon: 'area-chart',
    title: '审核统计',
    key:'/statistics',
    path: '/statistics',
    component: '../pages/Dashboard/index',
    // Routes: ['./src/router/PrivateRoute.js'],
    routes:[
      {
        icon: 'bars',
        title: '分类统计',
        key:'/statistics/classify',
        path: '/statistics/classify',
        component: '../pages/AuditStatistics/routes/Classify',
      },
      {
        icon: 'bars',
        title: '人员统计',
        key:'/statistics/personnel',
        path: '/statistics/personnel',
        notOpen: true,
        component: '../pages/Dashboard/index',
        routes:[
          {
            icon: 'bars',
            title: '人员统计',
            key:'/statistics/personnel',
            path: '/statistics/personnel',
            component: '../pages/AuditStatistics/routes/Personnel',
          },
          {
            icon: 'bars',
            title: '审核明细',
            key:'/statistics/personnel/details',
            path: '/statistics/personnel/details',
            component: '../pages/AuditStatistics/routes/Personnel/details',
          },
        ]
      },
    ]
  }
];