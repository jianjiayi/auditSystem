/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-01 15:46:34
 * @LastEditTime: 2020-08-11 17:04:37
 */ 
 
module.exports= [
  { 
    icon: 'team',
    title: '权限管理',
    key:'/rights',
    path: '/rights',
    component: '../pages/Dashboard/index',
    // Routes: ['./src/router/PrivateRoute.js'], 
    routes: [
      {
        icon: 'bars',
        title: '用户管理',
        key:'/rights/user',
        path: '/rights/user',
        component: '../pages/AuditRights/routes/user',
        Routes: ['./src/router/PrivateRoute.js'],
      },
      {
        icon: 'bars',
        title: '角色管理',
        key:'/rights/role',
        path: '/rights/role',
        component: '../pages/AuditRights/routes/role',
        Routes: ['./src/router/PrivateRoute.js'],
      },
    ]
  }
];