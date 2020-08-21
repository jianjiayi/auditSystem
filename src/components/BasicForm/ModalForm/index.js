/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-08 10:57:04
 * @LastEditTime: 2020-08-21 12:01:01
 */ 
import React, {useState, useImperativeHandle, forwardRef} from 'react';
import {Modal, Button} from 'antd';
import classNames from 'classnames';

import BaseForm from '../BaseForm';

import styles from './index.module.less';

function ModalForm(props, ref) {
  const [visible, setVisible] = useState(false);
  const {title, formProps, disabled, onCancel,...rest} = props;

  // 向父组件暴露的方法
  useImperativeHandle(ref, () => {
    return {
      visible,
      setVisible, //设置modal状态
      setModalStatus,
    }
  })

  const setModalStatus = (status, callback) =>{
    setVisible(status);
    callback();
  }
  
  const modalProps = {
    title,
    visible,
    centered: true,
    okText: "确认",
    cancelText: "取消",
    destroyOnClose: true,
    // onOk: () =>{this.handleOk},
    onCancel,
    ...rest,
  }
  return (
    <div className={classNames(styles.container)}>
      <Modal {...modalProps}>
        <BaseForm {...formProps}>
          <Button onClick={()=> onCancel()}>取消</Button>
        </BaseForm>
      </Modal>
    </div>
  )
}

ModalForm = forwardRef(ModalForm);

export default ModalForm;
