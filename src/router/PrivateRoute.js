/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 10:44:16
 * @LastEditTime: 2020-08-13 09:18:29
 */ 
import { notification, message} from 'antd';
import {setStorage, getStorage} from '@utils/localStorage';
import { ExArray } from '@utils/utils';
const { Route, Redirect } = require('dva').router;

// 获取设置受保护的所有路由
const { sliderMenus } = require('./slidermenus');
const contentDetailsRoutes  = require('../pages/$ContentDetails/router');
console.log(sliderMenus)
let routes = [{path:'/'}, ...ExArray.flatten([...sliderMenus, ...contentDetailsRoutes])];
console.log('routes',routes)

const AuthRouter = (props) => {
  
  const { route } = props;
  const { component:Component } = route;

  // 获取存在本地的登录状态以及权限
  const isLogin = sessionStorage.getItem('$isLogin') || false;

  // 获取用户路由权限
  const user = JSON.parse(sessionStorage.getItem('$user')) || {};

  const isProteceRoute = (pathname) => {
    // 判断该路由是否存在
    let isProtext = routes.find((item)=>{
      if(pathname == '/queue/cdetails' || pathname == '/search/cdetails'){
        return item.path == '/:type/cdetails';
      }
      return item.path == pathname;
    });

    if(!isProtext) {
      notification.error({
        message: `警告`,
        description: `您没有权限访问该页面`,
      }); 
      return false 
    };
    return true;
  }

  return (
    <Route render={ props => {
      const { pathname } = props.location;

      // console.log('private',pathname,isProteceRoute(pathname));

      return isLogin ?  
      (isProteceRoute(pathname)? <Component { ...props } /> : <Redirect to="/403" />) 
      : <Redirect to="/login" />
    }} />
  )
}

export default AuthRouter;