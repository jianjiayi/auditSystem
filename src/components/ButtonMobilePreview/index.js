/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-02 09:59:55
 * @LastEditTime: 2020-08-24 15:25:21
 */ 
import React, {useState} from 'react';
import {Modal, Button} from 'antd';
import classNames from 'classnames';
import Normal from './Normal';
import Image from './Image';
// import Audio from './Audio';
import Video from './Video';
import styles from './index.module.less';

const iphoneBg = require('@assets/iPhone_bg9.png');

function ButtonMobilePreview(props) {
  const [visible, setVisible] = useState(false);
  const {title, curArt={}, ...rest} = props;
  
  const mobileProps = {
    title,
    visible,
    centered: true,
    destroyOnClose: true,
    onCancel:()=>{setVisible(!visible)},
    ...rest,
  }

  return (
    <div>
      <Button className={styles.btn} size="small" onClick={() => {setVisible(!visible)}}>{title}</Button>
      <Modal {...mobileProps}>
        <div className={styles.container}>
          <div className={classNames(styles.bg_box, curArt.newsType == 'IMAGE' ? styles.dark : '')}></div>
          <div className={styles['mobile']}  style={{'backgroundImage':'url('+iphoneBg+')'}}>
            <div className={styles['body-box']}>
              {curArt.newsType == 'NEWS' && <Normal curArt={curArt}></Normal>}
              {curArt.newsType == 'IMAGE' && <Image images={curArt.oppoPics}></Image>}
              {curArt.newsType == 'VIDEO' && <Video curArt={curArt}></Video>}
            </div>
          </div>
        </div>
      </Modal>
    </div>
    
    
  )
}

export default ButtonMobilePreview;
