/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-29 14:44:51
 * @LastEditTime: 2020-07-28 09:06:54
 */ 
import React from 'react';
import { connect } from 'dva';
import debounce from 'lodash.debounce';
import Content from './content';
import Operate from './operate';

import styles from './index.module.less';

function ContentDetails(props) {
  // 更新
  const updateLife = debounce(()=>{
    console.log('点击了')
  },1000)

  const contentProps = {
    className: styles.content,
  }
  const operateProps = {
    className: styles.action,
  }
  return (
    <div className={styles.container}  onClick={()=> updateLife()}>
      <Content {...contentProps}></Content>
      <Operate {...operateProps}></Operate>
    </div>
  )
}

function mapStateToProps({CDetails}){
  return {CDetails}
}

export default connect(mapStateToProps)(ContentDetails);