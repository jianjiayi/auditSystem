/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-20 16:56:06
 * @LastEditTime: 2020-08-18 09:39:05
 */ 
import React, {Component} from 'react';
import { Modal } from 'antd';
import { withRouter } from "react-router";
import { getNowRoutePermission } from '@utils/rights';


const wrapAuth = ((ComposedComponent, path) => withRouter(class WrapComponent extends Component{
    constructor(props){
      super(props);
      this.authority = sessionStorage.getItem('$authority') != '' ? JSON.parse(sessionStorage.getItem('$authority')) || {} : {};//保存用户登录后基本信息
    }

    // 判断是否拥有该按钮权限
    isProteceBtn = (location, perms) => {
      // 获取当前路由下的按钮权限列表
      let btnPermissions = getNowRoutePermission(location.pathname,this.authority.permissions);
      // 判断该路由是否存在
      let isProtext = btnPermissions.find((item)=>{
        return item.perms == perms;
      });

      if(!isProtext) {
        return false 
      };
      return true;
    }

    render() {
        let {location, perms, staticContext, ...rest} = this.props;

        const comProps = {
            disabled: perms ? this.isProteceBtn(location, perms) : false,
            ...rest
        }
        return <ComposedComponent {...comProps}></ComposedComponent>
    }
}))

export default wrapAuth;