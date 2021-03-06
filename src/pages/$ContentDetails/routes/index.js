/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-29 14:44:51
 * @LastEditTime: 2020-08-24 17:46:38
 */ 
import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import debounce from 'lodash.debounce';


import Content from './content';
import Operate from './operate';
import PageLoading from '@components/PageLoading';

import useDebounce from '@utils/useDebounce';

import styles from './index.module.less';

function ContentDetails(props) {
  const { 
    history,
    dispatch,
    CDetails: {
      loading,
      actionLoading,
    }, 
  } = props;

  useEffect(()=>{
    dispatch({
      type: 'CDetails/init',
      payload: {}
    })
  }, [dispatch])


  const contentProps = {
    className: styles.content,
  }
  const operateProps = {
    className: styles.action,
    history,
  }

  const pageProps = {
    className: styles.container,
    onClick: useDebounce(v => {
      // alert('22222')
    },2000)
  }

  return (
    <PageLoading loading = {false}>
      <div {...pageProps}>
        <Content {...contentProps}></Content>
        <Operate {...operateProps}></Operate>
        {actionLoading && <div className={styles.loading}>
          <Spin size="large"></Spin>
        </div>}
      </div>
    </PageLoading>
  )
}

function mapStateToProps({CDetails}){
  return {CDetails}
}

export default connect(mapStateToProps)(ContentDetails);