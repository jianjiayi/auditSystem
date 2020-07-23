/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-29 14:44:51
 * @LastEditTime: 2020-07-17 16:49:51
 */ 
import React, {useState, useRef} from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Select, Input, Button } from 'antd';
import { BaseForm, ModalForm } from '@components/BasicForm';
import { BaseTable } from '@components/BasicTable'

import styles from './index.module.less';

const { Option } = Select;

function AuditStatistics(props) {
  const modalFormRef = useRef(null);
  // 搜索标题、ID参数名称
  const [params, setParams] = useState('default');
  
  const {Statistics: {table}} = props;

  // 多条件搜索配置
  const searchFormProps = {
    className: styles['form-contaner'],
    layout: 'inline',
    dataSource: [
      {
        label: '类型',
        type: 'SELECT',
        name:'params1',
        initialValue: '0',
        map: { 0: '图文', 1: '选项1', 2: '选项2' }
      },
      {
        label: '分类',
        type: 'SELECT',
        name:'params2',
        initialValue: '0',
        map: { 0: '全部', 1: '选项1', 1: '选项2' }
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
        title: '角色名',
        dataIndex: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: '业务线',
        align: 'center',
        dataIndex: 'age1',
      },
      {
        title: '更新时间',
        align: 'center',
        dataIndex: 'address',
      },
      {
        title: '更新人',
        align: 'center',
        dataIndex: 'age2',
      },
      {
        title: '状态',
        align: 'center',
        width: '160px',
        dataIndex: 'address3',
      },
      {
        title: '操作',
        width: '100px',
        align: 'center',
        render(r) {
          return (<Button type="primary" size="small" onClick={()=>goDetails(r.id)}>明细</Button>);
        }
      },
    ],
    ...table,
  }

  // 审核详情页
  const goDetails = (id)=>{
    router.push(
      {
        pathname:'/statistics/details',
        query:{
          id: id,
        }
      }
    );
  }

  // 点击创建用户
  const addUser = () =>{
    modalFormRef.current.setVisible(true);
  }
  // 创建modal配置
  const modalFormProps = {
    title: '创建角色',
    footer: null,
    /**表单参数*/ 
    formProps: {
      className: styles['form-contaner'],
      layout: 'horizontal',
      okText: "保存",
      dataSource: [
        { label: '角色名', name: 'params1', required: true},
         {
          label: '业务线',
          type: 'SELECT',
          name:'params2',
          required: true,
          placeholder:'请选择',
          map: { all: '聚合分发', key1: '选项1', key2: '选项2' }
        },
        {
          label: '审核设置',
          type: 'CHECKBOX',
          name:'params3',
          required: true,
          map: { 1: '查询', 2: '新增', 3: '修改', 4: '删除'}
        },
        {
          label: '审核设置',
          type: 'CHECKBOX',
          name:'params4',
          required: true,
          map: { 1: '查询', 2: '新增', 3: '修改', 4: '删除'}
        },
        {
          label: '审核队列',
          type: 'CHECKBOX',
          name:'params5',
          required: true,
          map: { 1: '查询', 2: '新增', 3: '修改', 4: '删除'}
        },
        {
          label: '审核检索',
          type: 'CHECKBOX',
          name:'params6',
          required: true,
          map: { 1: '查询', 2: '新增', 3: '修改', 4: '删除'}
        },
        {
          label: '审核统计',
          type: 'CHECKBOX',
          name:'params7',
          required: true,
          map: { 1: '查询', 2: '新增', 3: '修改', 4: '删除'}
        },
        {
          label: '权限管理',
          type: 'CHECKBOX',
          name:'params8',
          required: true,
          map: { 1: '查询', 2: '新增', 3: '修改', 4: '删除'}
        },
      ],
      onSearch: (formValues)=>{
        console.log('formValues', formValues)
      }
    }
  }


  return (
    <div>
      <BaseForm {...searchFormProps}></BaseForm>
      <BaseTable {...tableProps}></BaseTable>
      <ModalForm {...modalFormProps} ref={modalFormRef}></ModalForm>
    </div>
  )
}

function mapStateToProps({Statistics}){
  return {Statistics}
}

export default connect(mapStateToProps)(AuditStatistics)