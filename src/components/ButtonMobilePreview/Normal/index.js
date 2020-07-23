/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-03 16:20:55
 * @LastEditTime: 2020-07-03 16:40:58
 */ 
import React from 'react';
import styles from './index.module.less';

function Normal(props) {
  const { detail = {} } = props;
  
  const textHtml = {__html:detail.text};
  return (
    <div className={styles.normal}>
        <h1>{detail.title}</h1>
        <p className={styles.source}>
            {detail.pubTime && <span>{detail.pubTime}</span>}
            <span> 来源：{detail.source}</span>
        </p>
        <div className={styles['content-detail']} dangerouslySetInnerHTML={textHtml}></div>
    </div>
  )
}

export default Normal
