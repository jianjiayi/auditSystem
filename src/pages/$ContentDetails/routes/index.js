/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-29 14:44:51
 * @LastEditTime: 2020-08-04 11:31:05
 */ 
import React, { useEffect } from 'react';
import { connect } from 'dva';
import debounce from 'lodash.debounce';
import Content from './content';
import Operate from './operate';
import PageLoading from '@components/PageLoading';

import styles from './index.module.less';

function ContentDetails(props) {
  const { CDetails: {loading}, dispatch } = props;

  useEffect(()=>{
    dispatch({
      type: 'CDetails/queryArt',
      payload: {}
    })
  }, [dispatch])


  const contentProps = {
    className: styles.content,
  }
  const operateProps = {
    className: styles.action,
  }

  const pageProps = {
    className: styles.container,
    onClick: ()=> debounce(()=>{
      console.log('点击了')
    },1000)
  }

  return (
    <PageLoading loading = {loading}>
      <div {...pageProps}>
        <Content {...contentProps}></Content>
        <Operate {...operateProps}></Operate>
      </div>
    </PageLoading>
  )
}

function mapStateToProps({CDetails}){
  return {CDetails}
}

export default connect(mapStateToProps)(ContentDetails);