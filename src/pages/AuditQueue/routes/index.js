/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-29 14:44:51
 * @LastEditTime: 2020-08-22 10:42:26
 */ 
import React, {useEffect} from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { message, Form, Select, Button } from 'antd';
import _ from 'lodash';

import { BaseTable } from '@components/BasicTable';

import {contentType, queueType} from '@config/constants';
import { ExObject } from '@utils/utils.js';

import styles from './index.module.less';

import wrapAuth from '@components/WrapAuth';
const AuthButton = wrapAuth(Button);

const { Option } = Select;

function AuditQueue(props) {
  const {
    dispatch,
    User: {
      business
    },
    Queue: { 
      loading,
      dataSource, 
    }, 
    form: {getFieldDecorator},
  } = props;

  useEffect(()=>{
    let payload = props.form.getFieldsValue();
    dispatch({
      type: 'Queue/init',
      payload,
    })
  }, [business, dispatch])
  

  // 搜索
  const handleSubmit = e => {
    e.preventDefault();
    let payload = props.form.getFieldsValue();
    dispatch({
      type: 'Queue/init',
      payload,
    })
  }

  // 领审
  const goDetails = (id)=>{
    let formValues = props.form.getFieldsValue();
    let params = {
      id,
      formValues,
    }
    dispatch({
      type: 'CDetails/getNewsGetTask',
      payload: params,
      callback: (data) =>{
        if(_.isEmpty(data)){
          return message.error('当前队列没有文章可以领取');
        }

        dispatch({type: 'CDetails/save', payload: {query: params}});
        sessionStorage.setItem('$QUERY', params);
        router.push({pathname:'/queue/cdetails'});
      }
    })
    
  }

  const tableProps = {
    className: styles.tablebox,
    // 类型
    selectionType: null, //checkbox or radio or null||false
    // 表头
    columns: [
      {
        title: '名称',
        dataIndex: 'queueName',
        width: 150,
        render: text => <b>{text}</b>,
      },
      {
        title: '数量',
        dataIndex: 'queueLen',
        align: 'center',
        width: 150,
      },
      {
        title: '操作',
        render(r) {
          return (<AuthButton perms={'queue:receive'} onClick={()=>{goDetails(r.queueId)}}>领取</AuthButton>);
        }
      },
    ],
    loading,
    dataSource,
  }

  return (
    <div>
      <Form layout="inline" onSubmit={handleSubmit}>
        <Form.Item>
          {getFieldDecorator('bid', {
            initialValue: ExObject.getFirstValue(business),
          })(
           <Select style={{ width: '160px' }}>
              {
                Object.keys(business).map((item,index) =>{
                  return <Option key={item} value={item}>{business[item]}</Option>
                })
              }
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('type', {
            initialValue: 'NEWS',
          })(
           <Select style={{ width: '160px' }}>
              {
                Object.keys(contentType).map((item,index) =>{
                  return <Option key={item} value={item}>{contentType[item]}</Option>
                })
              }
            </Select>
          )}
        </Form.Item>
        <Form.Item >
          {getFieldDecorator('queueType', {
            initialValue: '',
          })(
            <Select style={{ width: '160px' }}>
              {
                Object.keys(queueType).map((item,index) =>{
                  return <Option key={item} value={item}>{queueType[item]}</Option>
                })
              }
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          <AuthButton perms={'queue:select'} type="primary" htmlType="submit">刷新</AuthButton>
        </Form.Item>
      </Form>

      <BaseTable {...tableProps}></BaseTable>
    </div>
  )
}

function mapStateToProps({User, Queue, CDetails}){
  return {User, Queue, CDetails}
}

export default Form.create({})(connect(mapStateToProps)(Form.create({})(AuditQueue)))