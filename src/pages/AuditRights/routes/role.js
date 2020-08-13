/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-29 14:44:51
 * @LastEditTime: 2020-08-13 09:30:05
 */ 
import React, {useRef} from 'react';
import { connect } from 'dva';
import { Button, TreeSelect } from 'antd';
import { BaseForm, ModalForm } from '@components/BasicForm';
import { BaseTable } from '@components/BasicTable';
import { sliderMenus }  from '../../../router/slidermenus';

import styles from './index.module.less';
console.log(sliderMenus)
const treeData = [
  {
    label: '审核设置',
    value: '10001',
    key: '10001',
    children: [
      {
        title: '查询',
        value: '10011',
        key: '10011',
      },
    ],
  },
  {
    title: '审核队列',
    value: '10002',
    key: '10002',
    children: [
      {
        title: '查询',
        value: '10012',
        key: '10012',
      },
      {
        title: '领取',
        value: '10022',
        key: '10022',
      },
    ],
  },
  {
    title: '审核检索',
    value: '10003',
    key: '10003',
    children: [
      {
        title: '查询',
        value: '10013',
        key: '10013',
      },
      {
        title: '领审',
        value: '10023',
        key: '10023',
      },
      {
        title: '加队列',
        value: '10033',
        key: '10033',
      },
    ],
  },
  {
    title: '审核统计',
    value: '10004',
    key: '10004',
    children: [
      {
        title: '分类统计',
        value: '10014',
        key: '10014',
        children: [
          {
            title: '查询',
            value: '100141',
            key: '100141',
          },
        ]
      },
      {
        title: '人员统计',
        value: '10024',
        key: '10024',
        children: [
          {
            title: '查询',
            value: '100241',
            key: '100241',
          },
        ]
      },
    ],
  },
  {
    title: '权限管理',
    value: '/rights',
    key: '10005',
    children: [
      {
        title: '用户管理',
        value: '10015',
        key: '10015',
        children: [
          {
            title: '查询',
            value: '100151',
            key: '100151',
          },
        ]
      },
      {
        title: '角色管理',
        value: '10025',
        key: '10025',
        children: [
          {
            title: '查询',
            value: '100251',
            key: '100251',
          },
        ]
      },
    ],
  },
];

function RolePage(props) {
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
                      treeData={treeData}
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

export default connect(mapStateToProps)(RolePage)