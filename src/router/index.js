/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-01 15:45:04
 * @LastEditTime: 2020-07-22 09:47:31
 */

const homeRoutes = require('../pages/HomePage/router');
const { sliderMenus } = require('./slidermenus');
const userRoutes = require('../pages/User/router');
const errorRoutes = require('../pages/Error/router');
const contentDetailsRoutes  = require('../pages/$ContentDetails/router');

exports.routesConfig= [
  {
    path: '/',
    icon: 'home',
    key: '/',
    component: '../layouts/index',
    routes: [
      ...homeRoutes,
      ...sliderMenus,
      ...contentDetailsRoutes,
      ...userRoutes,
      ...errorRoutes,
    ],
  }
]