/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-01 15:46:34
 * @LastEditTime: 2020-08-12 09:39:36
 */ 
 
module.exports= [
  { 
    icon: 'bars',
    title: '内容详情',
    path: '/:type/cdetails',
    component: '../pages/$ContentDetails/routes/index.js',
    Routes: ['./src/router/PrivateRoute.js'], 
  }
];