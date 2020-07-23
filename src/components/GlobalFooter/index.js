/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-22 16:54:36
 * @LastEditTime: 2020-06-22 17:10:21
 */ 
import React from 'react';
import classNames from 'classnames';
import { Layout } from 'antd';
import styles from './index.module.less';

const { Footer} = Layout;

function GlobalFooter(props) {
  const {className, copyRight} = props;
  return (
    <Footer className={classNames(className, styles.container)}>{copyRight}</Footer>
  )
}

export default GlobalFooter;
