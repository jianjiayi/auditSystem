/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-02 09:59:55
 * @LastEditTime: 2020-08-04 11:21:33
 */ 
import React, {useState} from 'react';
import {Modal, Button} from 'antd';
import classNames from 'classnames';
import Normal from './Normal';
import Image from './Image';
// import Audio from './Audio';
// import Video from './Video';
import styles from './index.module.less';

const iphoneBg = require('./static/iPhone_bg9.png');

function ButtonMobilePreview(props) {
  const [visible, setVisible] = useState(false);
  const {title, curArt={}, ...rest} = props;
  
  const mobileProps = {
    title,
    visible,
    centered: true,
    onCancel:()=>{setVisible(!visible)},
    ...rest,
  }

  return (
    <div>
      <Button className={styles.btn} size="small" onClick={() => {setVisible(!visible)}}>{title}</Button>
      <Modal {...mobileProps}>
        <div className={styles.container}>
          <div className={classNames(styles.bg_box, curArt.type == 'images' ? styles.dark : '')}></div>
          <div className={styles['mobile']}  style={{'backgroundImage':'url('+iphoneBg+')'}}>
            <div className={styles['body-box']}>
              {/* <Normal></Normal> */}
              <Image></Image>
            </div>
          </div>
        </div>
      </Modal>
    </div>
    
    
  )
}

export default ButtonMobilePreview;
