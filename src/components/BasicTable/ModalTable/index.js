/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-15 16:10:41
 * @LastEditTime: 2020-07-22 16:35:26
 */ 
import React, {useState, useImperativeHandle, forwardRef, useRef} from 'react';
import {Modal, Button} from 'antd';
import classNames from 'classnames';
import BaseTable from '../BaseTable';

import styles from './index.module.less'

function ModalTable(props, ref) {
  const tableRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const {title, name, handleSubmit, ...rest} = props;

  // console.log(props)

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
    onOk: () =>{
      // console.log(tableRef.current.selectedRowKeys);
      setVisible(!visible);
      handleSubmit(name,tableRef.current.selectedRowKeys);
    },
    onCancel: () =>{
      setVisible(!visible);
      tableRef.current.cancelSelected()
    },
  }

  const tableProps = {
    className: styles['modal-table'],
    ...rest,
  }

  return (
    <Modal {...modalProps}>
      <BaseTable {...tableProps} ref={tableRef}></BaseTable>
    </Modal>
  )
}

ModalTable = forwardRef(ModalTable)

export default ModalTable;
