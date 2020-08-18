/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-29 14:44:51
 * @LastEditTime: 2020-08-18 10:01:16
 */ 
import React, {useEffect, useRef} from 'react';
import { connect } from 'dva';
import { Button, TreeSelect } from 'antd';
import { BaseForm, ModalForm } from '@components/BasicForm';
import { BaseTable } from '@components/BasicTable';
import { getTreeData }  from '@utils/rights.js';

import styles from './index.module.less';

import wrapAuth from '@components/WrapAuth';
const AuthButton = wrapAuth(Button);

// 获取用户路由权限
const user = JSON.parse(sessionStorage.getItem('$user')) || {};


function RolePage(props) {
  const modalFormRef = useRef(null);
  const {
    User: {
      business,
      authority,
    },
    Rights: {table}
  } = props;

  // 多条件搜索配置
  const searchFormProps = {
    className: styles['form-contaner'],
    layout: 'inline',
    okPerms: 'role:select',
    dataSource: [
      {
        label: '业务线',
        type: 'SELECT',
        name:'params1',
        initialValue: '0',
        map: business
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
        dataIndex: 'age11',
      },
      {
        title: '状态',
        align: 'center',
        width: '160px',
        dataIndex: 'address11',
      },
      {
        title: '操作',
        width: '150px',
        align: 'center',
        render(r) {
          return (
            <div className={styles.tableaction}>
              <AuthButton perms={'role:edit'} type="primary" size="small" onClick={()=>{console.log(r.id)}}>编辑</AuthButton>
              <AuthButton perms={'role:edit'} size="small" onClick={()=>{console.log(r.id)}}>注销</AuthButton>
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
          name:'params211',
          required: true,
          placeholder:'请选择',
          map: { all: '聚合分发', key1: '选项1', key2: '选项2' }
        },
        {
          label: '分配权限',
          name:'title',
          itemRender: getFieldDecorator => (
            <div className="">
              {
                getFieldDecorator('roles', {
                  rules: [{ required: true, message: `请选择权限` }],
                })(
                  <TreeSelect 
                      allowClear
                      showSearch
                      treeDefaultExpandAll={true}
                      showCheckedStrategy={TreeSelect.SHOW_ALL}
                      placeholder="选择权限"
                      dropdownStyle={{maxHeight: 300, overflow: 'auto'}}
                      treeData={getTreeData(authority.permissions)}
                      multiple={true}
                      treeCheckable={true}
                  />
                )
              }
            </div>
          )
        },
        // {
        //   label: '审核设置',
        //   type: 'CHECKBOX',
        //   name:'setting',
        //   required: true,
        //   initialValue: ["list"],
        //   map: { 'list': '查询', 'add': '新增', 'change': '修改', 'del': '删除'}
        // },
        // {
        //   label: '审核队列',
        //   type: 'CHECKBOX',
        //   name:'/queue',
        //   required: true,
        //   initialValue: ["1"],
        //   map: { 1: '查询', 2: '新增', 3: '修改', 4: '删除'}
        // },
        // {
        //   label: '审核检索',
        //   type: 'CHECKBOX',
        //   name:'/search',
        //   required: true,
        //   initialValue: ["1"],
        //   map: { 1: '查询', 2: '新增', 3: '修改', 4: '删除'}
        // },
        // {
        //   label: '审核统计',
        //   type: 'CHECKBOX',
        //   name:'/statistics',
        //   required: true,
        //   initialValue: ["1"],
        //   map: { 1: '查询', 2: '新增', 3: '修改', 4: '删除'}
        // },
        // {
        //   label: '权限管理',
        //   type: 'CHECKBOX',
        //   name:'/rights',
        //   required: true,
        //   initialValue: ["1"],
        //   map: { 1: '查询', 2: '新增', 3: '修改', 4: '删除'}
        // },
      ],
      onSearch: (formValues)=>{
        console.log('formValues', formValues)
      }
    }
  }


  return (
    <div>
      <BaseForm {...searchFormProps}>
        <AuthButton perms={'role:add'}  ghost type="primary" onClick={()=>addUser()}>创建角色</AuthButton>
      </BaseForm>
      <BaseTable {...tableProps}></BaseTable>
      <ModalForm {...modalFormProps} ref={modalFormRef}></ModalForm>
    </div>
  )
}

function mapStateToProps({User, Rights}){
  return {User, Rights}
}

export default connect(mapStateToProps)(RolePage)