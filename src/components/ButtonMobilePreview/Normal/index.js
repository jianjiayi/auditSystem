/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-03 16:20:55
 * @LastEditTime: 2020-08-24 15:35:38
 */ 
import React from 'react';
import { ExTime } from '@utils/utils.js';

import styles from './index.module.less';

function Normal(props) {
  const { curArt = {} } = props;
  
  // 过滤富文本的样式
  const replaceImgStyle = (text) => {
    if(!text) return;
    
    return  text.replace(/<[^>]+>/ig, function (tag) {
      var reg = /style\s*?=\s*?([‘"])[\s\S]*?\1/
      var tag = tag.replace(reg,'');
      if(!(tag.indexOf('<img') > -1)){
        tag = tag.replace(/width/gi, '');
        tag = tag.replace(/height/gi, '');
      }
      return tag;
    });
  }

  const textHtml = {__html:replaceImgStyle(curArt.content) || ''};


  return (
    <div className={styles.normal}>
        <p className={styles.title}>{curArt.title}</p>
        <p className={styles.source}>
            {curArt.createtime && <span>{ExTime.formatDate(curArt.createtime)}</span>}
            {
              curArt.origin.length > 5 && <br/>
            }
            <span> 来源：{curArt.origin}</span>
        </p>
        <div className={styles['content-detail']} dangerouslySetInnerHTML={textHtml}></div>
    </div>
  )
}

export default Normal
