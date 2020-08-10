/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-01 10:07:19
 * @LastEditTime: 2020-08-10 09:39:48
 */ 
import React, {useState} from 'react';
import classNames from 'classnames';
import styles from './index.module.less';

function AudioPlayer(props) {
  const {className, name, url} = props;

  return (
    <div className={classNames(className, styles.container)}>
      <audio src={url} controls>浏览器版本过低，不支持audio标签</audio>
    </div>
  )
}

export default AudioPlayer
