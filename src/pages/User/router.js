/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-01 15:46:34
 * @LastEditTime: 2020-07-22 09:46:29
 */ 
 
module.exports= [
  { 
    path: '/login', 
    key: '/login',
    title: '登录',
    component: '../pages/User/routes/login' 
  },
  {
    path: '/user', 
    key: '/user',
    title: '个人中心',
    component: '../pages/User/routes/center'
  }
];