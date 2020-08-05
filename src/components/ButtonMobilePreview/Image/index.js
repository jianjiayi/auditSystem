/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-24 15:09:31
 * @LastEditTime: 2020-08-04 13:50:41
 */ 
import React, {useState, useEffect} from 'react';
import classNames from 'classnames';
import Swiper from "swiper";
import "swiper/swiper.less";

import styles from './index.module.less';

const imgsrc = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596514082715&di=3cad8a79128c2fea129106b17ad1640e&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F56%2F12%2F01300000164151121576126282411.jpg';

function ImagePage(props) {
  const { images=[] } = props;
  const [showImgDesc, setShowImgDesc] = useState(false);
  
  const initSwiper = () =>{
    new Swiper ('.swiper-container', {
      direction: 'horizontal', // 垂直切换选项
      loop: true, // 循环模式选项
    })
  };

  useEffect(()=>{
    initSwiper();
  },[])

  return (
    <div className={classNames('swiper-container', styles.container)}>
      <div className={classNames("swiper-wrapper")}  onClick={()=>{setShowImgDesc(!showImgDesc)}}>
        {
          images.length && images.map((item, index) => {
            return  <div key={index} className={classNames("swiper-slide", styles.slider)}>
                      <img src = {item.pic_url}/>
                    </div>
          })
        }
      </div>
      <div className={styles["content-text"]}>
        {showImgDesc && <p className={styles.text}>{'111111'}</p>}
        {!showImgDesc && <p className={styles.number}>1/5</p>}
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
