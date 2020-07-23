/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-29 14:44:51
 * @LastEditTime: 2020-07-17 14:06:45
 */ 
import React, {useRef} from 'react';
import { connect } from 'dva';
import { Button, Input  } from 'antd';
import { BaseForm, ModalForm } from '@components/BasicForm';
import { BaseTable } from '@components/BasicTable'

import styles from './index.module.less';

const { TextArea } = Input;


function UserRights(props) {
  const modalFormRef = useRef(null);
  const {Rights: {table}} = props;


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
        map: { 0: '全部', 1: '选项1', 2: '选项2' }
      },
      {
        label: '状态',
        type: 'SELECT',
        name:'params3',
        initialValue: '0',
        map: { 0: '全部', 1: '选项1', 2: '选项2' }
      },
      { label: 'ip', name: 'params4'},
      { label: '时间', name: 'params5', type: 'DATATIME_START_END'},
      { label: '真实姓名', name: 'params6'},
      { label: '用户名', name: 'params7'},
    ],
    onSearch: (formValues)=>{
      console.log('formValues', formValues)
    }
  }

  const tableProps = {
    // 类型
    selectionType: null, //checkbox or radio or null||false
    // 表头
    columns: [
      {
        title: '用户名',
        dataIndex: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: '业务线',
        align: 'center',
        dataIndex: 'age',
      },
      {
        title: '真实姓名',
        align: 'center',
        dataIndex: 'age',
      },
      {
        title: '角色',
        align: 'center',
        dataIndex: 'age',
      },
      {
        title: '登陆时间',
        align: 'center',
        dataIndex: 'address',
      },
      {
        title: '登录IP',
        align: 'center',
        dataIndex: 'age',
      },
      {
        title: '登出时间',
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

  // 
  const modalFormProps = {
    title: '创建用户',
    footer: null,
    /**表单参数*/ 
    formProps: {
      className: styles['form-contaner'],
      layout: 'horizontal',
      okText: "保存",
      dataSource: [
        { label: '用户名', name: 'params1', required: true},
        { label: '密码', name: 'params2', required: true},
        {
          label: '业务线',
          type: 'CHECKBOX',
          name:'params3',
          required: true,
          map: { 1: '聚合分发', 2: '人民智作', 3: '人民聚发'}
        },
        { label: '真实姓名', name: 'params4', required: true},
        { label: '所属部门', name: 'params5', required: true},
        
        {
          label: '聚发角色',
          type: 'SELECT',
          name:'params6',
          required: true,
          placeholder:'请选择',
          map: { all: '聚合分发', key1: '选项1', key2: '选项2' }
        },
        {
          label: '智作角色',
          type: 'SELECT',
          name:'params7',
          required: true,
          placeholder:'请选择',
          map: { noraml: '图文', video: '视频', audio: '音频', images: '图集' }
        },
        { 
          label: '备注', 
          name: 'params8',
          itemRender: getFieldDecorator => (
            <div className="">
              {
                getFieldDecorator('params8', {
                  placeholder:'请输入',
                })(<TextArea rows={4} />)
              }
            </div>
          )
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
        <Button  ghost type="primary" onClick={()=>addUser()}>创建用户</Button>
      </BaseForm>
      <BaseTable {...tableProps}></BaseTable>
      <ModalForm {...modalFormProps} ref={modalFormRef}></ModalForm>
    </div>
  )
}

function mapStateToProps({Rights}){
  return {Rights}
}

export default connect(mapStateToProps)(UserRights)