/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-29 14:44:51
 * @LastEditTime: 2020-08-17 19:53:16
 */ 
import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Form, Select, Button } from 'antd';
import { BaseTable } from '@components/BasicTable';
import wrapAuth from '@components/WrapAuth';

import styles from './index.module.less';

const AuthButton = wrapAuth(Button);

const { Option } = Select;

function AuditQueue(props) {
  const {
    dispatch,
    Queue: {table, pagination}, 
    form: {getFieldDecorator},
  } = props;

  // 搜索
  const handleSubmit = () => {

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
          {getFieldDecorator('username', {
            initialValue: '0',
          })(
           <Select style={{ width: '160px' }}>
              <Option value="0">图文</Option>
              <Option value="1">视频</Option>
              <Option value="2">音频</Option>
              <Option value="3">图集</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item >
          {getFieldDecorator('password', {
            initialValue: '0',
          })(
            <Select style={{ width: '160px' }}>
              <Option value="0">全部</Option>
              <Option value="1">先审后发</Option>
              <Option value="2">先发后审</Option>
              <Option value="3">免审</Option>
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

function mapStateToProps({Queue}){
  return {Queue}
}

export default connect(mapStateToProps)(Form.create({})(AuditQueue))