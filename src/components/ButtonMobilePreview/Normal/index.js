/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-03 16:20:55
 * @LastEditTime: 2020-08-04 13:57:23
 */ 
import React from 'react';
import styles from './index.module.less';

function Normal(props) {
  const { curArt = {} } = props;
  
  const textHtml = {__html:curArt.text};
  return (
    <div className={styles.normal}>
        <p className={styles.title}>{curArt.title}</p>
        <p className={styles.source}>
            {curArt.pubTime && <span>{curArt.pubTime}</span>}
            <span> 来源：{curArt.source}</span>
        </p>
        <div className={styles['content-detail']} dangerouslySetInnerHTML={textHtml}></div>
    </div>
  )
}

export default Normal
