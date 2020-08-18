/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-22 16:54:36
 * @LastEditTime: 2020-08-14 17:55:41
 */ 
 
/* eslint-disable compat/compat */
import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Menu, Icon, Button } from 'antd';
import Link from 'umi/link';
import classNames from 'classnames';
import Theme from './theme';
import styles from './index.module.less';

const { Sider } = Layout;
const { SubMenu } = Menu;

function LeftSlider(props) {
  const [menuRoutes, setMenuRoutes] = useState(props.menuRoutes);
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  /**
   * @name: 判断展开的菜单，以及高亮的按钮
   * @test: test font
   * @msg: 
   * @param {type} 第一个参数：总路由，第二个参数：将要被菜单展开路由，第三个参数：高亮的路由
   * @return: 
   */
  const getRouteOpenKeys = useCallback((routes, parentRoute, selectedKeys) => {
    for (const route of routes) {
      // 处理嵌套路由中的子路由展示问题
      let selectedKeysArr = selectedKeys[0].split('/');
      if(selectedKeysArr.length>2){
        selectedKeys[0] = selectedKeys[0].replace('/routes', '')
      }
      //被展开的菜单没有子路由被选中
      if (route.key === selectedKeys[0]) {
        setOpenKeys([...parentRoute, route.key])
        setSelectedKeys(selectedKeys)
        return [...parentRoute, route.key];
      }
      //被展开的菜单里有子路由被选中
      if (route.routes) {
        let res = getRouteOpenKeys(route.routes, [...parentRoute, route.key], selectedKeys);
        if (res) {
          setOpenKeys(res)
          setSelectedKeys(selectedKeys)
          return;
        }
      }

    }
    //在整个路由里没有找着要被高亮的路由，即关闭所有菜单
    setOpenKeys([])
    setSelectedKeys([])
  });

  useEffect(()=>{
    getRouteOpenKeys(menuRoutes, [], props.selectedKeys);
    
    return () =>{
      setOpenKeys([])
      setSelectedKeys([])
    }
  }, [getRouteOpenKeys, menuRoutes, props.selectedKeys])

  //生成路由
  const renderMenuItem = (route) => {
    return route.routes && !route.notOpen ? 
    (
      <SubMenu
        key={route.key}
        title={
          <span>
            <Icon type={route.icon} />
            <span>{route.title}</span>
          </span>
        }
      >
        {route.routes.map(childRoute => renderMenuItem(childRoute))}
      </SubMenu>
    ) : 
    (
      <Menu.Item key={route.key}>
        <Link to={route.key} replace onClick={props.toggleDrawerVisible}>
          {
            route.icon ? <Icon type={route.icon} /> : null
          }
          <span>{route.title}</span>
        </Link>
      </Menu.Item>
    )
  };
  //菜单项按钮
  const menuClick = (v) => {
    setSelectedKeys([v.key])
  };
  //菜单展开关闭按钮
  const onOpenChange = Keys => {
    const latestOpenKey = Keys.find(key => openKeys.indexOf(key) === -1);
    setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
  };

  //生成路由
  let renderMenu = menuRoutes.map(route => renderMenuItem(route));

  
  const { title, logo, className, navTheme, collapsed, themeProps } = props;
  //判断菜单是否折叠，对应的打开菜单
  const defaultProps = collapsed ? {} : { openKeys };

  const sliderProps = {
    trigger: null,
    // theme: navTheme != 'light' ? 'dark' : 'light',
    theme: 'dark',
    collapsed,
    className: classNames(className, styles.slider, `${navTheme === 'realdark' && styles.realdark}`)
  }

  const menuProps = {
    className: styles.menulist,
    mode: "inline",
    // theme: navTheme != 'light' ? 'dark' : 'light',
    theme: 'dark',
    selectedKeys,
    onClick: menuClick,
    onOpenChange,
    ...defaultProps
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        {
          !collapsed && <img src={logo} alt="logo"/>
        }
        {/* { 
          !collapsed && 
          <h2 className={styles.title}>{title}</h2>
        } */}
      </div>
      <Sider {...sliderProps}>
        <Menu {...menuProps}>{ renderMenu }</Menu>
        {/* <Theme className={styles.theme} {...themeProps}></Theme> */}
      </Sider>
    </div>
  )
}

export default LeftSlider;
