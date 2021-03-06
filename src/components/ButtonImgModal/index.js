/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-08 10:57:04
 * @LastEditTime: 2020-07-09 16:21:57
 */ 
import React, {useState} from 'react';
import {Modal, Button} from 'antd';
import classNames from 'classnames';
// 图片懒加载
import LazyImgComponent from '@components/LazyImgComponent';

import styles from './index.module.less'

function ButtonImgModal(props) {
  const [visible, setVisible] = useState(false);
  const {title, dataList, disabled, handleOk, ...rest} = props;
  
  const modalProps = {
    title,
    visible,
    centered: true,
    okText: "确认",
    cancelText: "取消",
    onOk: () =>{
      setVisible(!visible);
      handleOk();
    },
    onCancel: () =>{setVisible(!visible)},
    ...rest,
  }
  const buttonProps = {
    className: styles.btn,
    size: "small",
    disabled, 
    onClick: () => {setVisible(!visible)}
  }
  return (
    <div>
      <Button {...buttonProps}>{title}</Button>
      <Modal {...modalProps}>
        <ul className={styles['img-container']}>
          {
            dataList.length > 0 && dataList.map((item, index) =>{
              return <li className={styles.item} key = {index}>
                <LazyImgComponent 
                  hover = {true}
                  src = {item.image}
                  className = {styles['img-item']}>
                </LazyImgComponent>
              </li>
            })
          }
        </ul>
      </Modal>
    </div>
  )
}

export default ButtonImgModal;
