/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-29 14:44:51
 * @LastEditTime: 2020-08-18 10:00:39
 */ 
import React, {useState, useRef} from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Select, Input, Button } from 'antd';
import { BaseForm, ModalForm } from '@components/BasicForm';
import { BaseTable } from '@components/BasicTable'

import styles from './index.module.less';

import wrapAuth from '@components/WrapAuth';
const AuthButton = wrapAuth(Button);

const { Option } = Select;

function AuditStatistics(props) {
  const modalFormRef = useRef(null);
  // 搜索标题、ID参数名称
  const [params, setParams] = useState('default');
  
  const {
    User: {
      business
    },
    Statistics: {
      table
    }
    } = props;

  // 多条件搜索配置
  const searchFormProps = {
    className: styles['form-contaner'],
    layout: 'inline',
    okPerms: 'statistics:person:select',
    dataSource: [
      {
        label: '业务线',
        type: 'SELECT',
        name:'params0',
        initialValue: '0',
        map: business
      },
      {
        label: '类型',
        type: 'SELECT',
        name:'params1',
        initialValue: '0',
        map: { 0: '图文', 1: '选项1', 2: '选项2' }
      },
      {
        label: '人员',
        name:'params2',
      },
      { label: '时间', name: 'params5', type: 'DATATIME'},
     {
        label: '',
        type: 'SELECT',
        name:'params11',
        placeholder:'选择状态',
        itemRender: getFieldDecorator => (
          <div  type="flex">
            {
              getFieldDecorator('isInclude', {
                initialValue: 'default'
              })(
                <Select 
                  style={{width: '160px'}}
                  onChange={(e)=>{
                      console.log('change',e);
                      setParams(e)
                    } 
                  } 
                >
                  <Option value={'default'}>默认</Option>
                  <Option value={'title'}>标题</Option>
                </Select>
              )
            }
            {
              params== 'title' && getFieldDecorator(params, {
                placeholder:'请输入',
                initialValue: ''
              })(
                <Input style={{width: '300px', marginLeft: '15px'}} />
              )
            }
          </div>
        )
      },
    ],
    onSearch: (formValues)=>{
      console.log('formValues', formValues)
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
        dataIndex: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: '人员',
        align: 'center',
        dataIndex: 'age1',
      },
      {
        title: '领审量',
        align: 'center',
        dataIndex: 'address',
      },
      {
        title: '审核量',
        align: 'center',
        dataIndex: 'age2',
      },
      {
        title: '审核通过量',
        align: 'center',
        width: '160px',
        dataIndex: 'address3',
      },
      {
        title: '操作',
        width: '100px',
        align: 'center',
        render(r) {
          return (<AuthButton perms={'statistics:person:select'} type="primary" size="small" onClick={()=>goDetails(r.id)}>明细</AuthButton>);
        }
      },
    ],
    ...table,
  }

  // 审核详情页
  const goDetails = (id)=>{
    router.push(
      {
        pathname:'/statistics/personnel/details',
        query:{
          id: id,
        }
      }
    );
  }

  return (
    <div>
      <BaseForm {...searchFormProps}></BaseForm>
      <BaseTable {...tableProps}></BaseTable>
    </div>
  )
}

function mapStateToProps({User, Statistics}){
  return {User, Statistics}
}

export default connect(mapStateToProps)(AuditStatistics)