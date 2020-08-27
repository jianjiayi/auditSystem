/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-30 09:35:29
 * @LastEditTime: 2020-08-26 14:13:39
 */ 
import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import classNames from 'classnames';
import { Table, Button } from 'antd';
import styles from './index.module.less';

function BaseTable(props, ref) {
  // 存储选中元素
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  // 向父组件暴露的方法
  useImperativeHandle(ref, () => {
    return {
      selectedRowKeys,
      setSelectedRowKeys,
      selectedRows,
      setSelectedRows,
    }
  })

  
  const {className, columns, dataSource, selectionType, pagination, onPageChg, children, selectedKeys, ...rest} = props;

  useEffect(() => {
    setSelectedRowKeys(selectedKeys);
  }, [selectedKeys])

  // table 单选、多选配置
  const rowSelection = {
    type: 'checkbox',
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      // console.log(selectedRowKeys, selectedRows)
      setSelectedRowKeys(selectedRowKeys);
      setSelectedRows(selectedRows)
    },
    onSelectAll: (selected, selectedRows) => {
      console.log(selected, selectedRows)
      // setSelectedRowKeys(selectedRows);
      setSelectedRows(selectedRows)
    }
  }
  let rowLelection = Boolean;
  if (selectionType === false || selectionType === null) {
    rowLelection = false;
  } else if (selectionType === "checkbox") {
    rowSelection.type = "checkbox";
  } else {
    rowSelection.type = "radio";
  }

  //table 合并数组单元格
  const createNewArr = (data) =>{
    if(!data || data.length == 0) return [];
    
    return data.reduce((result, item) => {
    //首先将name字段作为新数组result取出
      if (result.indexOf(item.name) < 0) {
        result.push(item.name)
      }
      return result
    }, []).reduce((result, name) => {
    //将name相同的数据作为新数组取出，并在其内部添加新字段**rowSpan**
      const children = data.filter(item => item.name === name);
      result = result.concat(
        children.map((item, index) => ({
          ...item,
          rowSpan: index === 0 ? children.length : 0,//将第一行数据添加rowSpan字段
        }))
      )
      return result;
    }, [])
  }

  const footer = () =>{
    return <div className={styles['right-btn']}>
      {children}
    </div>
  }

  // table配置
  const tableProps = {
    columns,
    // dataSource,
    dataSource: createNewArr(dataSource),
    pagination: pagination,
    rowKey: (record, index) => record.id || index,
    rowSelection: rowLelection ? rowSelection : null,
    onChange: onPageChg,
    footer: children ? footer : null,
    ...rest
  }

  return (
    <div className={classNames(styles.container, className)}>
      <Table {...tableProps}/>
    </div>
  )
}

BaseTable = forwardRef(BaseTable);
 
export default BaseTable;
 