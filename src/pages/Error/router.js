/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-08 16:30:24
 * @LastEditTime: 2020-07-21 16:54:56
 */ 
module.exports= [
  { 
    path: '/403', 
    key: '/403',
    component: '../pages/Error/routes/403' 
  },
  { 
    path: '/500', 
    key: '/500',
    component: '../pages/Error/routes/500' 
  },
  { 
    icon: 'warning',
    title: '404',
    path: '*', 
    key: '/404',
    component: '../pages/Error/routes/404' 
  },
];