/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-20 16:56:06
 * @LastEditTime: 2020-08-17 20:52:18
 */ 
import React, {Component} from 'react';
import { Modal } from 'antd';
import { withRouter } from "react-router";
import { getNowRoutePermission } from '@utils/rights';

let authority = sessionStorage.getItem('$authority') != '' ? JSON.parse(sessionStorage.getItem('$authority')) || {} : {};//保存用户登录后基本信息

const wrapAuth = ((ComposedComponent, path) => withRouter(class WrapComponent extends Component{
    constructor(props){
        super(props);
    }

    // 判断是否拥有该按钮权限
    isProteceBtn = (location, perms) => {
      // 获取当前路由下的按钮权限列表
      let btnPermissions = getNowRoutePermission(location.pathname,authority.permissions);
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
        let {location, perms, ...rest} = this.props;

        const comProps = {
            disabled: perms ? !this.isProteceBtn(location, perms) : false,
            ...rest
        }
        return <ComposedComponent {...comProps}></ComposedComponent>
    }
}))

export default wrapAuth