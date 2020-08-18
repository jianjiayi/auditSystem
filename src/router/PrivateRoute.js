/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 10:44:16
 * @LastEditTime: 2020-08-17 17:46:17
 */ 
import { notification, message} from 'antd';
import {setStorage, getStorage} from '@utils/localStorage';
import { ExArray } from '@utils/utils';
const { Route, Redirect } = require('dva').router;


const contentDetailsRoutes  = require('../pages/$ContentDetails/router');

function AuthRouter(props) {
  
  const { route } = props;
  const { component:Component } = route;

  // 获取存在本地的登录状态
  const isLogin = sessionStorage.getItem('$isLogin') || false;

  // 获取用户权限
  const authority = JSON.parse(sessionStorage.getItem('$authority')) || {};

  // 获取路由权限
  const getRouteRights = (data)=>{
    return data.filter((item)=> item.type == 0);
  }
  // 拼合需要权限
  let routes = [{permissionUrl:'/'}, ...getRouteRights(authority.permissions || [])];

  // 判断当前路由是否受保护
  const isProteceRoute = (pathname) => {
    // 判断该路由是否存在
    let isProtext = routes.find((item)=>{
      if(pathname == '/queue/cdetails' || pathname == '/search/cdetails'){
        return item.permissionUrl == '/:type/cdetails';
      }
      return item.permissionUrl == pathname;
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