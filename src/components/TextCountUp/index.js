/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-30 15:16:18
 * @LastEditTime: 2020-08-10 14:28:46
 */ 
import React from 'react';
import { Countup } from 'count-up-react';
import classNames from 'classnames';
import styles from './index.module.less';

function TextCountUp(props) {

  const countupProps = {
    className: styles.countup,
    itemHeight: 40,
    symbol: ',',
    scrollTime: 2000,
    initStatus: true,
  }

  const {className, datasource} = props;

  return (
    <div className={classNames(className, styles.container)}>
      {
        datasource.map((item,index) => {
          return <div key={index} className={styles.item}>
            <span>{item.text}</span>
            <Countup number={item.value} {...countupProps}/>
          </div>
        })
      }
    </div>
  )
}

export default TextCountUp
