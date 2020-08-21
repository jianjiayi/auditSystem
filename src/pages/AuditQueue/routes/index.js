/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-29 14:44:51
 * @LastEditTime: 2020-08-20 19:17:25
 */ 
import React, {useEffect} from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Form, Select, Button } from 'antd';
import { BaseTable } from '@components/BasicTable';
import wrapAuth from '@components/WrapAuth';

import {contentType, queueType} from '@config/constants';
import { ExObject } from '@utils/utils.js';

import styles from './index.module.less';

const AuthButton = wrapAuth(Button);

const { Option } = Select;

function AuditQueue(props) {
  const {
    dispatch,
    User: {
      business
    },
    Queue: {table, pagination}, 
    form: {getFieldDecorator},
  } = props;

  useEffect(()=>{
    dispatch({
      type: 'Queue/init',
      payload: {
        bname: ExObject.getFirstValue(business),
        type: 1
      }
    })
  }, [business, dispatch])
  

  // 搜索
  const handleSubmit = e => {
    e.preventDefault();
    console.log(props.form.getFieldsValue())
    let payload = props.form.getFieldsValue()
    dispatch({
      type: 'Queue/init',
      payload,
    })
  }

  // 审核详情页
  const goDetails = (id)=>{
    router.push(
      {
        pathname:'/queue/cdetails',
        query:{
          id: id,
        }
      }
    );
  }

  const tableProps = {
    className: styles.tablebox,
    // 类型
    selectionType: null, //checkbox or radio or null||false
    // 表头
    columns: [
      {
        title: '名称',
        dataIndex: 'title',
        width: 150,
        render: text => <b>{text}</b>,
      },
      {
        title: '数量',
        dataIndex: 'total',
        align: 'center',
        width: 150,
      },
      {
        title: '操作',
        render(r) {
          return (<AuthButton perms={'queue:receive'} onClick={()=>{goDetails(r.id)}}>领取</AuthButton>);
        }
      },
    ],
    ...table,
  }

  return (
    <div>
      <Form layout="inline" onSubmit={handleSubmit}>
        <Form.Item>
          {getFieldDecorator('bname', {
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
            initialValue: '1',
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

function mapStateToProps({User, Queue}){
  return {User, Queue}
}

export default Form.create({})(connect(mapStateToProps)(Form.create({})(AuditQueue)))