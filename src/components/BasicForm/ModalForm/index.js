/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-08 10:57:04
 * @LastEditTime: 2020-08-13 10:10:00
 */ 
import React, {useState, useImperativeHandle, forwardRef} from 'react';
import {Modal, Button} from 'antd';
import classNames from 'classnames';

import BaseForm from '../BaseForm';

import styles from './index.module.less';

function ModalForm(props, ref) {
  const [visible, setVisible] = useState(false);
  const {title, formProps, disabled, ...rest} = props;

  // 向父组件暴露的方法
  useImperativeHandle(ref, () => {
    return {
      setVisible, //设置modal状态
    }
  })
  
  const modalProps = {
    title,
    visible,
    centered: true,
    okText: "确认",
    cancelText: "取消",
    destroyOnClose: true,
    // onOk: () =>{this.handleOk},
    onCancel: () =>{setVisible(!visible)},
    ...rest,
  }
  return (
    <div className={classNames(styles.container)}>
      <Modal {...modalProps}>
        <BaseForm {...formProps}>
          <Button onClick={()=>{setVisible(!visible)}}>取消</Button>
        </BaseForm>
      </Modal>
    </div>
  )
}

ModalForm = forwardRef(ModalForm);

export default ModalForm;
