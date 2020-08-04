/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-01 09:55:51
 * @LastEditTime: 2020-08-03 14:31:00
 */ 
import React from 'react';
import {Button} from 'antd';
import styles from './index.module.less';

function NotFound() {
  return (
    <div className={styles.container}>
      <div className={styles.notfound}>
        <h1>404</h1>
        <h2>UH OH! 页面丢失</h2>
        <p>您所寻找的页面不存在。你可以点击下面的按钮，返回主页。</p>
        <a href="/">返回首页</a>
      </div>
    </div>
  )
}

export default NotFound;
