/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-29 14:44:51
 * @LastEditTime: 2020-07-20 17:19:27
 */ 
import React, {useRef} from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import { BaseForm, ModalForm } from '@components/BasicForm';
import { BaseTable } from '@components/BasicTable'

import styles from './index.module.less';

function RoleRights(props) {
  const modalFormRef = useRef(null);
  const {Rights: {table}} = props;

  // 多条件搜索配置
  const searchFormProps = {
    className: styles['form-contaner'],
    layout: 'inline',
    dataSource: [
      {
        label: '业务线',
        type: 'SELECT',
        name:'params1',
        initialValue: '0',
        map: { 0: '全部', 1: '选项1', 2: '选项2' }
      },
      {
        label: '角色',
        type: 'SELECT',
        name:'params2',
        initialValue: '0',
        map: { 0: '全部', 1: '选项1', 1: '选项2' }
      },
      {
        label: '状态',
        type: 'SELECT',
        name:'params3',
        initialValue: '0',
        map: { 0: '全部', 1: '选项1', 2: '选项2' }
      },
      { label: '更新人', name: 'params4'},
      { label: '更新时间', name: 'params5', type: 'DATATIME'},
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
        dataIndex: 'age',
      },
      {
        title: '更新时间',
        align: 'center',
        dataIndex: 'address',
      },
      {
        title: '更新人',
        align: 'center',
        dataIndex: 'age',
      },
      {
        title: '状态',
        align: 'center',
        width: '160px',
        dataIndex: 'address',
      },
      {
        title: '操作',
        width: '150px',
        align: 'center',
        render(r) {
          return (
            <div className={styles.tableaction}>
              <Button type="primary" size="small" onClick={()=>{console.log(r.id)}}>编辑</Button>
              <Button size="small" onClick={()=>{console.log(r.id)}}>注销</Button>
            </div>);
        }
      },
    ],
    ...table,
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
          name:'title',
          itemRender: () => (
            <b>分配权限</b>
          )
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
      <BaseForm {...searchFormProps}>
        <Button  ghost type="primary" onClick={()=>addUser()}>创建角色</Button>
      </BaseForm>
      <BaseTable {...tableProps}></BaseTable>
      <ModalForm {...modalFormProps} ref={modalFormRef}></ModalForm>
    </div>
  )
}

function mapStateToProps({Rights}){
  return {Rights}
}

export default connect(mapStateToProps)(RoleRights)