/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-22 16:54:36
 * @LastEditTime: 2020-06-29 13:42:44
 */ 
import React from 'react';
import classNames from 'classnames';
import { Layout, Menu, Dropdown, Button, Avatar, Input, Icon } from 'antd';
import styles from './index.module.less';

const { Header} = Layout;

function GlobalHEader(props) {
  const {collapsed, onCollapse, fixedHeader, navTheme, className, userinfo, userSetMenu, userClick} = props;

  const userMenu = (
    <Menu onClick={userClick}>
      {
        userSetMenu.length>0 && userSetMenu.map((item,index) => {
          return <Menu.Item key={item.id}>{item.name}</Menu.Item>
        })
      }
    </Menu>
  );

  return (
    <Header 
      style = {{'width': fixedHeader ? 'calc(100% - '+(!collapsed ? '200' : '80') +'px)' : 'auto'}}
      className={classNames(
        className, styles.container, 
        `${fixedHeader && styles.fixed}`, 
        `${navTheme != 'realdark' ? styles.light : ''}`
        )
      }>
      <Icon
        className={`${styles.trigger} "trigger"`}
        type={collapsed ? 'menu-unfold' : 'menu-fold'}
        onClick={onCollapse}
      />
      <div className={styles['right-menu']}>
        <Dropdown overlay={userMenu} placement="bottomRight">
          <div className={styles.auth}>
            <div className={styles.name_text}>
              <span>欢迎</span>
              <span className={styles.name}>{userinfo.name || 'admin'}</span>
            </div>
            <Avatar className={styles.avatar} icon="user" src={userinfo.avatar}/>
        </div>
      </Dropdown>
      </div>
    </Header>
  )
}

export default GlobalHEader;
