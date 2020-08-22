/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-29 14:44:51
 * @LastEditTime: 2020-08-22 10:18:56
 */ 
import React, {useState, useEffect, useRef} from 'react';
import { connect } from 'dva';
import { Select, Input, Button } from 'antd';
import _ from 'lodash';

import { BaseForm, ModalForm } from '@components/BasicForm';
import { BaseTable } from '@components/BasicTable';

import { ExArray, ExObject } from '@utils/utils.js';
import {contentType, auditStatus, orderFieldMap, orderTypeMap, dateFormat} from '@config/constants';

import styles from './index.module.less';

const { Option } = Select;

function AuditStatistics(props) {
  const formRef = useRef(null);
  // 搜索标题、ID参数名称
  const [params, setParams] = useState('default');
  
  const {
    dispatch,
    location,
    User: {
      business
    },
    Statistics: {
      loading,
      dataSource, 
      pagination,
    }
  } = props;

  useEffect(()=>{
    dispatch({
      type: 'Statistics/getPersoneDetailQuery',
      payload: {
        user: location.query.user,
        businessId: formRef.current.getFieldValue('businessId'),
      }
    })
  }, [dispatch])

  // 多条件搜索配置
  const searchFormProps = {
    className: styles['form-contaner'],
    layout: 'inline',
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
        label: '审核结果',
        type: 'SELECT',
        name:'auditStatus',
        initialValue: '',
        map: auditStatus
      },
      { label: '时间', name: 'datatime', type: 'DATATIME_START_END'},
      { label: '标题', name: 'title',},
    ],
    onReset : () =>{
       dispatch({
        type: 'Statistics/getPersoneDetailQuery',
        payload: {
          user: location.query.user,
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
        type: 'Statistics/getPersoneDetailQuery',
        payload: {
          ...formValues,
          user: location.query.user,
        }
      })
    }
  }

  // 列表配置
  const tableProps = {
    bordered: true,
    // 类型
    selectionType: null, //checkbox or radio or null||false
    // 表头
    columns: [
      {
        title: '人名',
        dataIndex: 'auditorName',
        key: 'auditorName',
        align: 'center',
        className: styles.tdmiddle,
        render(_, row) {
          return {
            children: <span>{row.auditorName}</span>,
            props: {
              rowSpan: row.rowSpan,
            }
          }
        }
      },
      {
        title: '队列',
        align: 'center',
        dataIndex: 'queue',
        key:'queue',
      },
      {
        title: '标题',
        align: 'center',
        dataIndex: 'title',
      },
      {
        title: '审核时间',
        align: 'center',
        dataIndex: 'finishAuditDatetime',
      },
      {
        title: '审核结果',
        align: 'center',
        width: '260px',
        dataIndex: 'auditStatus',
        render: text => <span>{auditStatus[text]}</span>,
      },
    ],
    loading,
    dataSource, 
    pagination,
    onPageChg: (page) => {
      // console.log(page)
      dispatch({
        type: 'Statistics/getPersoneDetailQuery',
        payload:{
          user: location.query.user,
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

function mapStateToProps({User, Statistics}){
  return {User, Statistics}
}

export default connect(mapStateToProps)(AuditStatistics)