/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-08-03 10:02:00
 * @LastEditTime: 2020-08-25 20:58:33
 */ 
import React from 'react';
import { Spin } from 'antd';
import classNames from 'classnames';

import styles from './index.module.less';

function PageLoading(props) {
  const {loading, className, children} = props;
  
  return (
    <div className={classNames(className)}>
      {
        loading && <div className={styles['spin-container']}>
          <Spin size="large"></Spin>
        </div>
      }
      { !loading && children }
    </div>
  )
}

export default PageLoading;
