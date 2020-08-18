/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-22 14:55:34
 * @LastEditTime: 2020-08-17 20:12:16
 */ 
import React, { useState } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Layout, Button } from 'antd';
import Breadcrumb from '@components/Breadcrumbs';
import GlobalHeader from '@components/GlobalHeader';
import GlobalFooter from '@components/GlobalFooter';
import LeftSlider from '@components/LeftSlider';
import { routesConfig } from '../..//router';
import { sliderMenus }  from '../../router/slidermenus';
import { appConfig } from '@config/default.config.js';
import { userSetMenu } from '@config/constants.js';
import { ExArray } from '@utils/utils';
import {getSliderMenusList} from '@utils/rights';
import styles from './index.module.less';

// import ProLayout, {
//   DefaultFooter,
//   SettingDrawer,
// } from '@ant-design/pro-layout';

import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const {Content } = Layout;
const {logo, homePath, title, copyRight} = appConfig;

function BaseLayout(props) {
  const {
    theme, 
    theme: { navTheme, fixedHeader}, 
    App, 
    User:{
      user,
      authority
    }, 
    dispatch, 
    location, 
    history
  } = props;

  // let routes = ExArray.flatten(sliderMenus);
  // console.log('routes',routes)
  
  
  // 导航折叠
  const [collapsed, setCollapsed] = useState(false);
  const collapsedProps = {
    collapsed,
    onCollapse: () => {setCollapsed(!collapsed)} ,
  }
  // header
  const headerProps = {
    className: '',
    navTheme,
    fixedHeader,
    userSetMenu,
    ...collapsedProps,
    userinfo: user,
    userClick: (val) => {
      console.log(val)
      switch(val.key){
        case '0':
          router.push({pathname:'/user'});
          break;
        case '1':
          dispatch({
            type: 'User/logout',
            payload: {},
            callback: (res) => {
              console.log(res)
              router.push({pathname:'/login'});
            }
          })
          console.log('退出登录')
          break;
        default:
          return;
      }
    },
  }
  
  // 定义额外的高亮条件
  let pathname = location.pathname;
  const hightPath = ['/setting','/queue','/statistics/personnel/','/search'];
  let selectedKeys = [];
  for(let i in hightPath){
    if(pathname.includes(hightPath[i]) ){
      selectedKeys.push(hightPath[i]);
    }
  }
  // slider
  const sliderProps = {
    logo,
    title,
    navTheme,
    ...collapsedProps,
    className: `${styles.slider}`,
    // menuRoutes: sliderMenus,
    menuRoutes: getSliderMenusList(authority.permissions, sliderMenus),
    selectedKeys: (selectedKeys.length > 0 && selectedKeys) || location.pathname.split(','),
    themeProps: {
      ...theme,
      onSettingChange: (config) =>{
        dispatch({
          type: 'theme/changeSetting',
          payload: {
            ...config
          }
        })
      }
    },
  }
  // main
  const contentProps = {
    className: `${styles.content} ${fixedHeader ? styles['fixed-header-content'] : ''}`,
  }
  // footer
  const footerProps = {
    copyRight,
    className: '',
  }
  
  return (
    <Layout>
      <LeftSlider {...sliderProps}></LeftSlider>
      <Layout className={styles['main-content']}>
        <GlobalHeader {...headerProps}></GlobalHeader>
        <Content {...contentProps}>
          <Breadcrumb routes={routesConfig} {...props}>
            <Button type="link" icon="rollback" onClick={() => { history.goBack() }}>返回</Button>
          </Breadcrumb>
          <div className={styles['main-box']}>
            {props.children}
          </div>
        </Content>
        <GlobalFooter {...footerProps}></GlobalFooter>
      </Layout>

      {/* <SettingDrawer
        settings={theme}
        onSettingChange={(config) =>
          dispatch({
            type: 'theme/changeSetting',
            payload: config,
          })
        }
      /> */}
    </Layout>
  )
}

function mapStateToProps({App, User, theme}) {
  return {App, User, theme}
}

export default connect(mapStateToProps)(BaseLayout);
