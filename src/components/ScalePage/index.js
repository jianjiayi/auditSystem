/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-11 13:51:14
 * @LastEditTime: 2020-07-20 16:37:34
 */
import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import styles from './index.less';

function ScalePage(props) {
  const {width=1440, height=810} = props;
  
  const getScale=() => {
    let ww = window.innerWidth/width
    let wh = window.innerHeight/height
    return ww < wh ? ww : wh
  }

  // 设置初始化缩放比
  const [scale, setScale] = useState(getScale());
  
  // 页面大小变化重置缩放比例
  const setScaleFun = debounce(() => {
    let scale = getScale()
    setScale(scale)
  }, 500)

  useEffect(()=>{
    setScaleFun();
    window.addEventListener('resize', setScaleFun)
    return () => {
       window.removeEventListener('resize', setScaleFun)
    }
  },[])


  return (
    <div
      className={`${styles['scale-box']}`}
      style={{
        transform: `scale(${scale}) translate(-50%, -50%)`,
        WebkitTransform: `scale(${scale}) translate(-50%, -50%)`,
        width,
        height
      }}
    >
      {props.children}
    </div>
  )
}

export default ScalePage
