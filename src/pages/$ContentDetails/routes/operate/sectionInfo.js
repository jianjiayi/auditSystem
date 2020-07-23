/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-06 09:48:30
 * @LastEditTime: 2020-07-07 17:06:38
 */ 
import React from 'react';
import classNames from 'classnames';

import styles from './index.module.less';

function SectionInfo(props) {
  const {className} = props;

  return (
    <div className={classNames(className,styles['section2'])}>
      <p>
        <span>抓取来源ID: 123456</span>
        <span>抓取来源： 人民网</span>
      </p>
      <p>
        原文链接： <a href="www.baidu.com">www.baidu.com</a>
      </p>
      <p>
        摘要： 领取规则：当一个用户领取了一篇内容，其他用户无法领取到相同的内容，领取为入队列时间倒序提取，每人每次领审30条数据，在审核至最后1条时，再次请求30条新数据

领取释放规则：点击跳过，该条信息释放回队列，并安插在原时间点位置；在停留审核页面3分钟，自动释放
      </p>
    </div>
  )
}

export default SectionInfo;
