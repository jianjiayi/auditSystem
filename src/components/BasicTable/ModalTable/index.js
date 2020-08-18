/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-15 16:10:41
 * @LastEditTime: 2020-08-18 22:05:32
 */ 
import React, {useState, useImperativeHandle, forwardRef, useRef} from 'react';
import {Modal} from 'antd';
import classNames from 'classnames';
import BaseTable from '../BaseTable';
import _ from 'lodash';

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
      const data = tableRef.current.selectedRowKeys || [];
      !_.isEmpty(data) && data.map(item=>{
        const {id, word} = item;
        item = { id, word}
      })
      // console.log(tableRef.current.selectedRowKeys);
      setVisible(!visible);
      handleSubmit(name,data);
    },
    onCancel: () =>{
      setVisible(!visible);
      tableRef.current.cancelSelected()
    },
  }

  const tableProps = {
    className: classNames(styles['modal-table']),
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
