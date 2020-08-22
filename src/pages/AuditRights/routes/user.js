/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-29 14:44:51
 * @LastEditTime: 2020-08-22 10:19:59
 */ 
import React, {useState, useEffect, useRef} from 'react';
import { connect } from 'dva';
import { message, Button, Input, Select, Tag  } from 'antd';
import _ from 'lodash';

import { BaseForm, ModalForm } from '@components/BasicForm';
import { BaseTable } from '@components/BasicTable';

import { ExArray, ExObject } from '@utils/utils.js';
import {contentType, queueType, rightStatus, dateFormat} from '@config/constants';

import styles from './index.module.less';

import wrapAuth from '@components/WrapAuth';
const AuthButton = wrapAuth(Button);

const { TextArea } = Input;
const { Option } = Select;

function UserRights(props) {
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
    },
    Rights: {
      loading,
      roleList,
      dataSource, 
      pagination,
    }
  } = props;

  useEffect(()=>{
    dispatch({
      type: 'Rights/init',
      payload: {
        type: 'user'
      }
    })
  }, [dispatch])

  // 多条件搜索表单
  const searchFormProps = {
    className: styles['form-contaner'],
    layout: 'inline',
    okPerms: 'user:select',
    dataSource: [
      {
        label: '业务线',
        type: 'SELECT',
        name:'businessId',
        initialValue: '',
        map: {'': '全部', ...business},
        onChange: (e)=>{
          console.log('e',e)
          if(!e) return;
          
          dispatch({
            type: 'Rights/getRuleListByBusiness',
            payload: {
              id: e
            }
          })
        }
      },
      {
        label: '角色',
        type: 'SELECT',
        name:'roleId',
        initialValue: '',
        map: { '': '全部', ...roleList}
      },
      {
        label: '状态',
        type: 'SELECT',
        name:'state',
        initialValue: '',
        map: rightStatus
      },
      { label: 'ip', name: 'loginIp'},
      { label: '时间', name: 'datatime', type: 'DATATIME_START_END'},
      { label: '真实姓名', name: 'name'},
      { label: '用户名', name: 'username'},
    ],
    onReset : () =>{
      dispatch({
        type: 'Rights/init',
        payload: {
          type: 'user'
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
          type: 'user'
        }
      })
    }
  }

  // 分页table列表
  const tableProps = {
    // 类型
    selectionType: null, //checkbox or radio or null||false
    // 表头
    columns: [
      {
        title: '用户名',
        dataIndex: 'username',
        render: text => <span>{text}</span>,
      },
      {
        title: '业务线',
        align: 'center',
        dataIndex: 'businesses',
        render(data){
          return (
            !_.isEmpty(data) && data.map((item,index) => {
              return <Tag color="#108ee9" key={item.id}>{item.coorpName}</Tag>
            })
          )
        },
      },
      {
        title: '真实姓名',
        align: 'center',
        dataIndex: 'name',
      },
      {
        title: '角色',
        align: 'center',
        dataIndex: 'roles',
        render: data => {
          return (
            !_.isEmpty(data) && data.map((item,index) => {
              return <Tag color="#87d068" key={item.id}>{item.roleName}</Tag>
            })
          )
        },
      },
      {
        title: '登陆时间',
        align: 'center',
        dataIndex: 'loginTime',
      },
      {
        title: '登录IP',
        align: 'center',
        dataIndex: 'loginIp',
      },
      {
        title: '登出时间',
        align: 'center',
        dataIndex: 'logoutTime',
      },
      {
        title: '状态',
        align: 'center',
        width: '160px',
        dataIndex: 'state',
        render: text => <span>{text === '' ? '全部' :  rightStatus[text]}</span>,
      },
      {
        title: '操作',
        width: '150px',
        align: 'center',
        render(r) {
          return (
            <div className={styles.tableaction}>
              <AuthButton perms={'user:edit'} type="primary" size="small" onClick={()=>openUserModal('edit', r)}>编辑</AuthButton>
              <AuthButton perms={'user:edit'} size="small" onClick={()=>updateUserOrRoleStatus('user', r.state, r.username)}>
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
          type: 'user',
          pageNum: page.current,
          pageSize: page.pageSize
        }
      })
    },
  }

  // 更新用户状态
  const updateUserOrRoleStatus = (type, number, username) => {
    console.log(type, number, username)
    dispatch({
      type: 'Rights/updateUserOrRoleStatus',
      payload: {
        type,
        name: number == 2 ? 'enable' : 'disable',
        username
      },
      callback: ()=> {
        // 更新当前列表状态
        let tableList = _.cloneDeep(dataSource);
        const index = tableList.findIndex(item => username == item.username);
        const item = tableList[index];
        tableList.splice(index, 1, {
          ...item,
          ...{state: number == 2 ? 0 : 2}
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
    modalFormRef.current.setVisible(true);
    if(!values) return;

    // 处理编辑用户回显逻辑
    values.businesses = values.businesses.map(item=>{
      return item = item.id.toString();
    })
    let options = [];
    values.roles.map((item) => {
      values[item.businessId] = item.id.toString();
      dispatch({
        type: 'Rights/getRuleListByBusiness',
        payload: {
          id: item.businessId
        },
        callback:(data) =>{
          options.push(
            {
              label: business[item.businessId]+'角色',
              type: 'SELECT',
              name: item.businessId.toString(),
              required: true,
              placeholder: '请选择',
              map: data,
            }
          )

          console.log(options)
          setItemOptions([...options])
        }
      })
    })

    
    console.log(values)
    setFormValues(values);
  }


  // 创建用户moddal表
  const modalFormProps = {
    title: title+'用户',
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
      loading: btnLoading,
      dataSource: [
        { label: '用户名', name: 'username', required: true},
        { label: '密码', name: title == '创建'?'password': null, required: true},
        {
          label: '业务线',
          type: 'CHECKBOX',
          name:'businesses',
          required: true,
          map: business,
          onChange: (e)=>{
            console.log('e',e)
            let options = [];

            if(_.isEmpty(e)){
              setItemOptions([]);
              return;
            }
            
            e.map((item)=>{
              dispatch({
                type: 'Rights/getRuleListByBusiness',
                payload: {
                  id: item
                },
                callback:(data) =>{
                  options.push(
                    {
                      label: business[e]+'角色',
                      type: 'SELECT',
                      name: item,
                      required: true,
                      placeholder: '请选择',
                      map: data,
                    }
                  )

                  setItemOptions([...options]);
                }
              })
             
            })
          }
        },
        { label: '真实姓名', name: 'name', required: true},

        ...ItemOptions,
        
        { 
          label: '备注', 
          name: 'remarks',
          itemRender: getFieldDecorator => (
            <div className="">
              {
                getFieldDecorator('remarks', {
                  placeholder:'请输入',
                  initialValue: formValues['remarks'],
                })(<TextArea rows={4} />)
              }
            </div>
          )
        },
      ],
      formValues:formValues,
      onSearch: (formValues)=>{
        // 整理配置规则
        let ruleJson = [];
        if(_.isEmpty(ItemOptions)){
          return message.error('请添加配置规则')
        }
        !_.isEmpty(ItemOptions) && ItemOptions.map((option, index) => {
          ruleJson.push({
            'businessId': option.name,
            'roleId': formValues[option.name]
          })
          delete formValues[option.name];
        })
        formValues.roles = ruleJson;
        
        // console.log('formValues', formValues)
        setBtnLoading(true);
        dispatch({
          type: 'Rights/addUserOrRole',
          payload: {
            ...formValues,
            name: 'user',
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
        <AuthButton perms={'user:add'}  ghost type="primary" onClick={()=> openUserModal('create')}>创建用户</AuthButton>
      </BaseForm>
      <BaseTable {...tableProps}></BaseTable>
      <ModalForm {...modalFormProps} ref={modalFormRef}></ModalForm>
    </div>
  )
}

function mapStateToProps({User, Rights}){
  return {User, Rights}
}

export default connect(mapStateToProps)(UserRights)