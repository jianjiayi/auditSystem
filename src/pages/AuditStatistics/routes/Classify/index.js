/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-29 14:44:51
 * @LastEditTime: 2020-08-22 10:17:34
 */ 
import React, {useState, useEffect, useRef} from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Select, Input, Button } from 'antd';
import _ from 'lodash';

import { BaseForm, ModalForm } from '@components/BasicForm';
import { BaseTable } from '@components/BasicTable';
import { renderSelect } from '@components/BasicForm/BaseForm'; 

import { ExArray, ExObject } from '@utils/utils.js';
import {contentType, queueType, rightStatus, orderFieldMap, orderTypeMap, dateFormat} from '@config/constants';

import styles from './index.module.less';

import wrapAuth from '@components/WrapAuth';
const AuthButton = wrapAuth(Button);

const { Option } = Select;

// const dateFormat = 'YYYY-MM-DD';

function AuditStatistics(props) {
  const formRef = useRef(null);
  // 存放分类
  const [categoryMap,setCategoryMap] = useState({});
  // 搜索标题、ID参数名称
  const [params, setParams] = useState('default');
  
  const {
    dispatch,
    User: {
      business
    },
    Global: {
      firstCategory,
    },
    Statistics: {
      loading,
      dataSource, 
      pagination,
    }
  } = props;

  useEffect(()=>{
    dispatch({
      type: 'Statistics/init',
      payload: {
        type: 'category',
        businessId: formRef.current.getFieldValue('businessId'),
      }
    })
  }, [dispatch])

  useEffect(()=>{
    let mapObj = {};
    firstCategory.map(item=>{
      mapObj[item.id.toString()] = item.name
    })
    setCategoryMap(mapObj);
  },[firstCategory])

  // 多条件搜索配置
  const searchFormProps = {
    className: styles['form-contaner'],
    layout: 'inline',
    okPerms: 'statistics:classify:select',
    dataSource: [
      {
        label: '业务线',
        type: 'SELECT',
        name:'businessId',
        initialValue: ExObject.getFirstValue(business),
        map: business,
      },
      {
        label: '类型',
        type: 'SELECT',
        name:'newsType',
        initialValue: '',
        map: contentType
      },
      {
        label: '分类',
        type: 'SELECT',
        name:'categoryId',
        initialValue: '',
        map: {'': '全部', ...categoryMap}
      },
      { label: '时间', name: 'datatime', type: 'DATATIME_START_END'},
      {
        label: '排序',
        type: 'SELECT',
        name:'params11',
        placeholder:'选择状态',
        itemRender: getFieldDecorator => (
          <div  type="flex">
            {
              getFieldDecorator('orderField', {
                initialValue: ''
              })(
                renderSelect(orderFieldMap, {style: {width: '160px'},})
              )
            }
            {
              getFieldDecorator('orderType', {
                initialValue: 'desc'
              })(
                renderSelect(orderTypeMap, {style: {width: '160px'},})
              )
            }
          </div>
        )
      },
    ],
    onReset : () =>{
       dispatch({
        type: 'Statistics/init',
        payload: {
          type: 'category',
          businessId: formRef.current.getFieldValue('businessId'),
        }
      })
    },
    onSearch: (formValues)=>{
      if(!_.isEmpty(formValues.datatime)){
        formValues.startTime = formValues.datatime[0].format(dateFormat);
        formValues.endTime = formValues.datatime[1].format(dateFormat);
      }
      delete formValues.datatime;
      
      console.log('formValues', formValues)
      dispatch({
        type: 'Statistics/getStatisticQuery',
        payload: {
          ...formValues,
          type: 'category'
        }
      })
    }
  }

  // 列表配置
  const tableProps = {
    // 类型
    selectionType: null, //checkbox or radio or null||false
    // 表头
    columns: [
      {
        title: '时间',
        dataIndex: 'dt',
        render: text => <span>{text}</span>,
      },
      {
        title: '分类',
        align: 'center',
        dataIndex: 'categoryName',
      },
      {
        title: '入审量',
        align: 'center',
        dataIndex: 'entryQueueCount',
      },
      {
        title: '审核量',
        align: 'center',
        dataIndex: 'auditCount',
      },
      {
        title: '审核通过量',
        align: 'center',
        width: '160px',
        dataIndex: 'auditPassedCount',
      },
    ],
    loading,
    dataSource, 
    pagination,
    onPageChg: (page) => {
      // console.log(page)
      dispatch({
        type: 'Statistics/getStatisticQuery',
        payload:{
          type: 'category',
          pageNum: page.current,
          pageSize: page.pageSize,
          businessId: formRef.current.getFieldValue('businessId'),
        }
      })
    },
  }

  return (
    <div>
      <BaseForm {...searchFormProps} wrappedComponentRef={formRef}></BaseForm>
      <BaseTable {...tableProps}></BaseTable>
    </div>
  )
}

function mapStateToProps({User, Global, Statistics}){
  return {User, Global, Statistics}
}

export default connect(mapStateToProps)(AuditStatistics)