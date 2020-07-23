/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-08 13:51:51
 * @LastEditTime: 2020-07-09 16:39:44
 */ 
import React, {useState} from 'react';
import Lazyimg, { withLazyimg } from 'react-lazyimg-component';
import {Modal, Button, Icon} from 'antd';
// 动画库
import 'velocity-animate';
import 'velocity-animate/velocity.ui';
import {placeholderImg} from '@config/default.config.js';
import styles from './index.module.less';

function LazyImgComponent (props){
  const [visible, setVisible] = useState(false);// modal状态 
  const {
    src, // 图片地址
    threshold= 0, // 加载触发距离
    info= {},
    hover= false,
    onDelete,
  } = props;

  const modalProps = {
    title: '预览图片',
    visible,
    centered: true,
    width: 800,
    footer: null,
    onCancel: () =>{setVisible(false)},
  }

  return(
    <div className={hover ? styles.item :''}>
      <Lazyimg
        threshold = {threshold}
        placeholder = {placeholderImg}
        js_effect = {'transition.fadeIn'}
        src={src}>
      </Lazyimg>
      {
        hover && 
        <div className={styles['dim-box']}>
          {info.cattroy && <p className={styles["text"]}>分类：时政</p>}
          {info.size && <p className={styles["text"]}>大小：500*200</p>}
          <div className={styles["btn-group"]}>
            <Button type="link" icon="eye" onClick={()=>{setVisible(true)}}></Button>
            {onDelete && <Button type="link" icon="delete" onClick={()=>{onDelete(src)}}></Button>}
          </div>
        </div>
      }

      <Modal {...modalProps}>
        <img className={styles.previewimg} src={src} alt=""/>
      </Modal>
    </div>
  )
}

export default LazyImgComponent;