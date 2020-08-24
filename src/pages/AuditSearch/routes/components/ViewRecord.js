/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-08-20 10:33:16
 * @LastEditTime: 2020-08-22 15:24:37
 */
import React, {useState, useEffect, useImperativeHandle, forwardRef} from 'react';
import {Modal, List} from 'antd';
import _ from 'lodash';

import styles from './index.module.less';

function ViewRecord(props, ref) {
  // modal状态
  const [visible, setVisible] = useState(false);

  const {
    dataSource,
    ...rest
  } = props;

  // 向父组件暴露的方法
  useImperativeHandle(ref, () => {
    return {
      setVisible, //设置modal状态
    }
  })
  
  const modalProps = {
    title: '操作记录',
    visible,
    centered: true,
    okText: "确认",
    cancelText: "取消",
    ...rest,
    destroyOnClose: true,
    // onOk: () =>{this.handleOk},
    onCancel: () =>{setVisible(!visible)},
  }


  // 处理回显
  useEffect(()=>{

  },[])


  return (
    <div>
      <Modal {...modalProps}>
        <List
          itemLayout="horizontal"
          dataSource={dataSource}
          renderItem={item => (
            <List.Item>
              <div className={styles.item}>
                <span className={styles.label}>{item.label} : </span>
                <div className={styles.values_text}>{item.itemRender}</div>
              </div>
            </List.Item>
            )}
        />
      </Modal>
    </div>
  )
}

ViewRecord = forwardRef(ViewRecord);

export default ViewRecord;
