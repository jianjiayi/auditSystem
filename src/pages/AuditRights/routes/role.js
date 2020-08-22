/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-29 14:44:51
 * @LastEditTime: 2020-08-22 10:20:20
 */ 
import React, {useState, useEffect, useRef} from 'react';
import { connect } from 'dva';
import { message, Button, TreeSelect, Tag } from 'antd';
import _ from 'lodash';


import { BaseForm, ModalForm } from '@components/BasicForm';
import { BaseTable } from '@components/BasicTable';
import { getTreeData }  from '@utils/rights.js';

import { ExArray, ExObject } from '@utils/utils.js';
import {contentType, queueType, roleStatus, dateFormat} from '@config/constants';

import styles from './index.module.less';

import wrapAuth from '@components/WrapAuth';
const AuthButton = wrapAuth(Button);

// 获取用户路由权限
const user = JSON.parse(sessionStorage.getItem('$user')) || {};


function RolePage(props) {
  const modalFormRef = useRef(null);
  // modal标题
  const [title, setTitle] = useState('');
  // 临时存储用户信息
  const [formValues, setFormValues] = useState({});
  // 保存由业务线创建出来的角色列表
  const [ItemOptions, setItemOptions] = useState([]);
  // 表单按钮状态
  const [btnLoading, setBtnLoading] = useState(false);

  const {
    dispatch,
    User: {
      business,
      authority,
    },
    Rights: {
      loading,
      permissionIds,
      roleList,
      dataSource, 
      pagination,
    }
  } = props;

  useEffect(()=>{
    dispatch({
      type: 'Rights/init',
      payload: {
        type: 'role'
      }
    })
  }, [dispatch])

  // 多条件搜索配置
  const searchFormProps = {
    className: styles['form-contaner'],
    layout: 'inline',
    okPerms: 'role:select',
    dataSource: [
      {
        label: '业务线',
        type: 'SELECT',
        name:'businessId',
        initialValue: '',
        map: {'': '全部', ...business},
      },
      {
        label: '角色',
        name:'roleName',
      },
      {
        label: '状态',
        type: 'SELECT',
        name:'state',
        initialValue: '',
        map: roleStatus
      },
      { label: '更新人', name: 'updateUser'},
      { label: '更新时间', name: 'datatime', type: 'DATATIME_START_END'},
    ],
    onReset : () =>{
      dispatch({
        type: 'Rights/init',
        payload: {
          type: 'role'
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
        type: 'Rights/getUserOrRoleQuery',
        payload: {
          ...formValues,
          type: 'role'
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
        title: '角色名',
        dataIndex: 'roleName',
        render: text => <span>{text}</span>,
      },
      {
        title: '业务线',
        align: 'center',
        render(data){
          return (!_.isEmpty(data) && <Tag color="#108ee9" key={data.id}>{data.businessName}</Tag>)
        },
      },
      {
        title: '更新时间',
        align: 'center',
        dataIndex: 'updateTime',
      },
      {
        title: '更新人',
        align: 'center',
        dataIndex: 'updateUser',
      },
      {
        title: '状态',
        align: 'center',
        width: '160px',
        dataIndex: 'state',
        render: text => <span>{text === '' ? '全部' :  roleStatus[text]}</span>,
      },
      {
        title: '操作',
        width: '150px',
        align: 'center',
        render(r) {
          return (
            <div className={styles.tableaction}>
              <AuthButton perms={'role:edit'} type="primary" size="small" onClick={()=>openUserModal('edit', r)}>编辑</AuthButton>
              <AuthButton perms={'role:edit'} size="small" onClick={()=>updateUserOrRoleStatus('role', r.state, r.id)}>
                {r.state !=2 ? '注销' : '开启'}
              </AuthButton>
            </div>);
        }
      },
    ],
    loading,
    dataSource, 
    pagination,
    onPageChg: (page) => {
      // console.log(page)
      dispatch({
        type: 'Rights/getUserOrRoleQuery',
        payload:{
          type: 'role',
          pageNum: page.current,
          pageSize: page.pageSize
        }
      })
    },
  }

  // 更新角色状态
  const updateUserOrRoleStatus = (type, number, id) => {
    console.log(type, id)
    dispatch({
      type: 'Rights/updateUserOrRoleStatus',
      payload: {
        type, 
        name: number == 1 ? 'enable' : 'disable',
        id
      },
      callback: ()=> {
        // 更新当前列表状态
        let tableList = _.cloneDeep(dataSource);
        const index = tableList.findIndex(item => id == item.id);
        const item = tableList[index];
        tableList.splice(index, 1, {
          ...item,
          ...{state: number == 1 ? 0 : 1}
        });
        dispatch({
          type: 'Rights/save',
          payload:{dataSource: tableList}
        })
      }
    })
  }

  // 点击打开用户编辑模态框
  const openUserModal = (type, values) =>{
    setTitle(type == 'create' ? '创建' : '编辑');
    dispatch({type: 'Rights/save',payload:{permissionIds: []}});
    
    modalFormRef.current.setVisible(true);
    if(!values) return;

    // 处理编辑用户回显逻辑
    dispatch({
      type: 'Rights/getRuleDetailsById',
      payload: {
        id: values.id
      }
    })

    values.businessId = values.businessId.toString()
    console.log(values)
    setFormValues(values);
  }

  // 创建modal配置
  const modalFormProps = {
    title: title+'角色',
    footer: null,
    onCancel: () =>{
      modalFormRef.current.setModalStatus(false, ()=>{
        setItemOptions([])
        setFormValues({})
      });
    },
    /**表单参数*/ 
    formProps: {
      className: styles['form-contaner'],
      layout: 'horizontal',
      okText: "保存",
      dataSource: [
        { label: '角色名', name: 'roleName', required: true},
        {
          label: '业务线',
          type: 'SELECT',
          name:'businessId',
          required: true,
          map: business,
        },
        {
          label: '分配权限',
          name:'title',
          itemRender: getFieldDecorator => (
            <div className="">
              {
                getFieldDecorator('permissionIds', {
                  initialValue: permissionIds || [],
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
      ],
      formValues:formValues,
      onSearch: (formValues)=>{
        // console.log('formValues', formValues)
        setBtnLoading(true);
        dispatch({
          type: 'Rights/addUserOrRole',
          payload: {
            ...formValues,
            name: 'role',
            type: title == '创建'? 'add' : 'edit',
          },
          callback: (res) => {
            setBtnLoading(false);
            if(res == 200){
              modalFormRef.current.setModalStatus(false, ()=>{
                setItemOptions([])
                setFormValues({})
              });
              return
            }
          }
        })
      }
    }
  }


  return (
    <div>
      <BaseForm {...searchFormProps}>
        <AuthButton perms={'role:add'}  ghost type="primary" onClick={()=>openUserModal('create')}>创建角色</AuthButton>
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