/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-01 10:07:19
 * @LastEditTime: 2020-07-08 14:20:13
 */ 
import React, {useState} from 'react';
import classNames from 'classnames';
import styles from './index.module.less';

function Video(props) {
  const {className, name, url, poster} = props;

  const videoProps = {
    src: url,
    controlslist: "nodownload",
    autoplay: false,
    poster,
    style: {'position': 'relative', 'zIndex': 9}
  }
  return (
    <div className={classNames(className, styles.container)}>
      <video {...videoProps}>浏览器版本过低，不支持video标签</video>
    </div>
  )
}

export default Video;
