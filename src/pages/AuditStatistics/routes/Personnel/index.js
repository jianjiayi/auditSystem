/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-29 14:44:51
 * @LastEditTime: 2020-08-22 11:32:38
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
const InputGroup = Input.Group;

function AuditStatistics(props) {
  const formRef = useRef(null);
  // 搜索标题、ID参数名称
  const [params, setParams] = useState('default');
  
  const {
    dispatch,
    User: {
      business
    },
    Statistics: {
      loading,
      dataSource, 
      pagination,
    },
  } = props;

  useEffect(()=>{
    dispatch({
      type: 'Statistics/init',
      payload: {
        type: 'person',
        businessId: formRef.current.getFieldValue('businessId'),
      }
    })
  }, [dispatch])

  // 多条件搜索配置
  const searchFormProps = {
    className: styles['form-contaner'],
    layout: 'inline',
    okPerms: 'statistics:person:select',
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
        label: '人员',
        name:'user',
      },
      { label: '时间', name: 'datatime', type: 'DATATIME_START_END'},
      {
        label: '排序',
        type: 'SELECT',
        name:'params11',
        placeholder:'选择状态',
        itemRender: getFieldDecorator => (
          <InputGroup compact>
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
          </InputGroup>
        )
      },
    ],
    onReset : () =>{
       dispatch({
        type: 'Statistics/init',
        payload: {
          type: 'person',
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
          type: 'person'
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
        title: '人员',
        align: 'center',
        dataIndex: 'auditorName',
      },
      {
        title: '领审量',
        align: 'center',
        dataIndex: 'takeCount',
      },
      {
        title: '审核量',
        align: 'center',
        dataIndex: 'auditCount',
      },
      {
        title: '审核通过量',
        align: 'center',
        dataIndex: 'auditPassedCount',
      },
      {
        title: '操作',
        width: '100px',
        align: 'center',
        render(r) {
          return (<AuthButton perms={'statistics:person:select'} type="primary" size="small" onClick={()=>goDetails(r.auditorName)}>明细</AuthButton>);
        }
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
          type: 'person',
          pageNum: page.current,
          pageSize: page.pageSize,
          businessId: formRef.current.getFieldValue('businessId'),
        }
      })
    },
  }

  // 审核详情页
  const goDetails = (username)=>{
    router.push(
      {
        pathname:'/statistics/personnel/details',
        query:{
          user: username,
        }
      }
    );
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