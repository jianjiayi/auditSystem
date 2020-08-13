/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-01 09:55:43
 * @LastEditTime: 2020-08-13 09:16:32
 */ 
import React from 'react';
import {Button} from 'antd';
import styles from './index.module.less';

function NotPression() {
  return (
    <div className={styles.container}>
      <div className={styles.notfound}>
        <h1>403</h1>
        <h2>抱歉，您无权限访问该页面</h2>
        <p>你可以点击下面的按钮，返回主页。</p>
        <a href="/">返回首页</a>
      </div>
    </div>
  )
}

export default NotPression;