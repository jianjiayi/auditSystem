/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-06 09:48:30
 * @LastEditTime: 2020-08-24 09:33:40
 */ 
import React from 'react';
import classNames from 'classnames';

import styles from './index.module.less';

function SectionInfo(props) {
  const {className, curArt} = props;
  console.log(curArt)
  console.log(curArt.extra)
  // console.log(curArt.extra.sourceExtra)
  return (
    <div className={classNames(className,styles['section2'])}>
      <p>
        <span>抓取来源ID: {curArt.extra&&curArt.extra.sourceExtra.source_id || ''}</span>
        <span>抓取来源： {curArt.extra&&curArt.extra.sourceExtra.name || ''}</span>
      </p>
      <p>
        原文链接： <a href={curArt.originLink || ''}>{curArt.originLink || ''}</a>
      </p>
      <p>
        摘要： {curArt.summary || ''}
      </p>
    </div>
  )
}

export default SectionInfo;
