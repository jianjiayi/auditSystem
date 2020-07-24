/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-24 15:09:31
 * @LastEditTime: 2020-07-24 16:43:47
 */ 
import React, {useState, useEffect} from 'react';
import classNames from 'classnames';
import Swiper from "swiper";
import "swiper/swiper.less";

import styles from './index.module.less';

function ImagePage(props) {

  
  const initSwiper = () =>{
    new Swiper ('.swiper-container', {
      direction: 'horizontal', // 垂直切换选项
      loop: true, // 循环模式选项

      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      },

      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // 如果需要滚动条
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    })
  };

  useEffect(()=>{
    initSwiper();
  },[])

  return (
    <div className={classNames('swiper-container', styles.container)}>
      <div className={classNames("swiper-wrapper")}>
        <div className={classNames("swiper-slide", styles.slider)}>
          Slide 1
        </div>
      </div>
      <div class={classNames("content-detail")}>
        <div>
          {/* <p class="content-text">{{item.text}}</p> */}
        </div>
      </div>
      {/* 如果需要分页器 */}
      <div className={classNames("swiper-pagination")}></div>

      {/* 如果需要导航按钮 */}
      <div className={classNames("swiper-button-prev")}></div>
      <div className={classNames("swiper-button-next")}></div>

      {/* 如果需要滚动条 */}
      <div className={classNames("swiper-scrollbar")}></div>
  </div>
  )
}

export default ImagePage;
