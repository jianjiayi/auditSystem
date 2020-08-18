/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-29 14:44:51
 * @LastEditTime: 2020-08-18 10:26:06
 */ 
import React, {useState, useEffect, useRef} from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import {Form, Select, Input, Button } from 'antd';
import { BaseForm, MoreSelect } from '@components/BasicForm';
import { BaseTable } from '@components/BasicTable';

import styles from './index.module.less';

import wrapAuth from '@components/WrapAuth';
const AuthButton = wrapAuth(Button);

const { Option } = Select;

function AuditSearch(props) {
  
  const formRef = useRef(null);
  // 搜索标题、ID参数名称
  const [params, setParams] = useState('title');

  const {
    dispatch,
    category, //分类
    Global: {
      firstCategory,
      secondCategory,
      thirdCategory,
    },
    User: {
      business
    },
    Search:{
      table
    },
    form: {getFieldDecorator, getFieldValue, setFieldsValue},
  } = props;


  useEffect(()=>{
    dispatch({
      type: 'Search/init',
      payload: {}
    })
  }, [])


  /**三级分类参数*/ 
  const moreSelectProps = {
    size: 'default',
    style: { width: '420px' },
    category, //分类
    firstCategory,
    secondCategory,
    thirdCategory,
    onSelect: (values) => {
      let arr = Object.values(values);
      arr = arr.filter((item,index)=>item != undefined)
      formRef.current.setFieldsValue({'category':arr.join('/')})
    },
    selectFirstCategory: (id) =>{
      dispatch({
        type: 'Global/getSecondCategory',
        payload: {
          id: id
        }
      })
    },
    selectSecondCategory: (id)=>{
      dispatch({
        type: 'Global/getThirdCategory',
        payload: {
          id: id
        }
      })
    },
  }

  // 多条搜索表单配置
  const searchFormProps = {
    className: styles['form-contaner'],
    layout: 'inline',
    okPerms: 'news:select',
    dataSource: [
      {
        label: '业务线',
        type: 'SELECT',
        name:'params1',
        initialValue: '0',
        map: business
      },
      {
        label: '内容类型',
        type: 'SELECT',
        name:'params2',
        initialValue: '0',
        map: { 0: '图文', 1: '视频', 2: '音频', 3: '图集' }
      },
      {
        label: '内容分类',
        name:'params3',
        itemRender: getFieldDecorator => (
          <div className="">
            {
              getFieldDecorator('category', {
                // rules: [{ required: true, message: `请选择` }],
                // initialValue: formValues.name5,
              })(<MoreSelect {...moreSelectProps}></MoreSelect>)
            }
          </div>
        )
      },
      {
        label: '所属队列',
        type: 'SELECT',
        name:'params4',
        initialValue: '0',
        map: { 0: '全部', 1: '选项1', 2: '选项2' }
      },
      {
        label: '审核状态',
        type: 'SELECT',
        name:'params5',
        initialValue: '0',
        map: { 0: '全部', 1: '待审核', 2: '审核通过', 3: '审核未通过' }
      },
      {
        label: '是否上架',
        type: 'SELECT',
        name:'params6',
        initialValue: '0',
        map: { 0: '全部', 1: '上架', 2: '下架' }
      },
      { label: '入审时间', name: 'params7', type: 'DATATIME_START_END'},
      { label: '来源', name: 'params8'},
      { label: '采集源ID', name: 'params9'},
      { label: '采集源', name: 'params10'},
      {
        label: '',
        type: 'SELECT',
        name:'params11',
        placeholder:'选择状态',
        itemRender: getFieldDecorator => (
          <div  type="flex">
            {
              getFieldDecorator('isInclude', {
                initialValue: 'title'
              })(
                <Select 
                  style={{width: '160px'}}
                  onChange={(e)=>{
                      console.log('change',e);
                      setParams(e)
                    } 
                  } 
                >
                  <Option value={'title'}>内容标题</Option>
                  <Option value={'ID'}>内容ID</Option>
                </Select>
              )
            }
            {
              getFieldDecorator(params, {
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


  // 审核详情页
  const goDetails = (id)=>{
    router.push(
      {
        pathname:'/search/cdetails',
        query:{
          id: id,
        }
      }
    );
  }

   // 列表配置
  const tableProps = {
    // 类型
    selectionType: 'checkbox', //checkbox or radio or null||false
    // 表头
    columns: [
      {
        title: '标题',
        dataIndex: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: 'ID',
        align: 'center',
        dataIndex: 'id',
      },
      {
        title: '分类',
        align: 'center',
        dataIndex: 'address1',
      },
      {
        title: '来源',
        align: 'center',
        dataIndex: 'age',
      },
      {
        title: '采集源ID',
        align: 'center',
        dataIndex: 'address2',
      },
      {
        title: '所属队列',
        align: 'center',
        dataIndex: 'age3',
      },
      {
        title: '封面图',
        align: 'center',
        dataIndex: 'age4',
      },
      {
        title: '审核状态',
        align: 'center',
        width: '160px',
        dataIndex: 'age5',
      },
      {
        title: '是否上架',
        align: 'center',
        width: '160px',
        dataIndex: 'age6',
      },
      {
        title: '入审时间',
        align: 'center',
        dataIndex: 'age7',
      },
      {
        title: '操作',
        width: '240px',
        align: 'center',
        render(r) {
          return (
            <div className={styles.tableaction}>
              <AuthButton perms={'news:get'} type="primary" size="small" onClick={()=>goDetails(r.id)}>领审</AuthButton>
              <AuthButton perms={'queue:add'} size="small" type="dashed" onClick={()=>{console.log(r.id)}}>加队列</AuthButton>
              <AuthButton perms={'history:select'} size="small" onClick={()=>{console.log(r.id)}}>操作记录</AuthButton>
            </div>);
        }
      },
    ],
    ...table,
  }

  return (
    <div>
      <BaseForm {...searchFormProps}  wrappedComponentRef={formRef}></BaseForm>
      <BaseTable {...tableProps}>
        <div className={styles['right-button']}>
          <AuthButton perms={'news:audit'} type="primary" onClick={()=>{}}>通过</AuthButton>
          <AuthButton perms={'news:audit'} type="danger" onClick={() =>{}}>未通过</AuthButton>
        </div>
      </BaseTable>
    </div>
  )
}

function mapStateToProps({Global, User, Search}){
  return {Global, User, Search}
}

export default Form.create({})(connect(mapStateToProps)(AuditSearch))