/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-29 14:44:51
 * @LastEditTime: 2020-08-22 13:33:40
 */ 
import React, {useState, useEffect, useRef} from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import {Form, Select, Input, Button } from 'antd';
import _ from 'lodash';

import { BaseForm, MoreSelect } from '@components/BasicForm';
import { BaseTable } from '@components/BasicTable';
import { renderSelect } from '@components/BasicForm/BaseForm'; 

import { ExArray, ExObject } from '@utils/utils.js';
import {contentType, auditStatus, runningStatus, queueType, dateFormat} from '@config/constants';

import styles from './index.module.less';

import wrapAuth from '@components/WrapAuth';
const AuthButton = wrapAuth(Button);

const { Option } = Select;
const InputGroup = Input.Group;

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
      loading,
      dataSource, 
      pagination,
    },
    form: {getFieldDecorator, getFieldValue, setFieldsValue},
  } = props;


  useEffect(()=>{
    dispatch({
      type: 'Search/init',
      payload: {
        businessId: formRef.current.getFieldValue('businessId'),
      }
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
        name:'businessId',
        initialValue: ExObject.getFirstValue(business),
        map: business,
      },
      {
        label: '内容类型',
        type: 'SELECT',
        name:'newsType',
        initialValue: '',
        map: contentType
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
        initialValue: '',
        map: auditStatus
      },
      {
        label: '是否上架',
        type: 'SELECT',
        name:'params6',
        initialValue: '',
        map: runningStatus
      },
      { label: '入审时间', name: 'datatime', type: 'DATATIME_START_END'},
      { label: '来源', name: 'params8'},
      { label: '采集源ID', name: 'params9'},
      { label: '采集源', name: 'params10'},
      {
        label: '',
        type: 'SELECT',
        name:'params11',
        placeholder:'选择状态',
        itemRender: getFieldDecorator => (
          <InputGroup compact>
            {
              getFieldDecorator('inputKey', {
                initialValue: 'title'
              })(
                renderSelect({'title': '标题', 'id': 'ID'}, {style: {width: '160px'},})
              )
            }
            {
              getFieldDecorator('inputValue', {
                placeholder:'请输入',
                initialValue: ''
              })(
                <Input style={{width: '300px'}} />
              )
            }
          </InputGroup>
        )
      },
    ],
    onReset : () =>{
       dispatch({
        type: 'Statistics/init',
        payload: {
          type: 'category',
          businessId: formRef.current.getFieldValue('businessId'),
        }
      })
    },
    onSearch: (formValues)=>{
      // 整理时间
      if(!_.isEmpty(formValues.datatime)){
        formValues.startTime = formValues.datatime[0].format(dateFormat);
        formValues.endTime = formValues.datatime[1].format(dateFormat);
      }
      delete formValues.datatime;

      // 整理标题和Id的key&value
      let inputKey = formRef.current.getFieldValue('inputKey');
      let inputValue = formRef.current.getFieldValue('inputValue');
      formValues[inputKey] = formValues[inputValue];
      delete formValues.inputKey;
      delete formValues.inputValue;
      
      console.log('formValues', formValues)
      dispatch({
        type: 'Statistics/getStatisticQuery',
        payload: {
          ...formValues,
          type: 'category'
        }
      })
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
    loading,
    dataSource, 
    pagination,
    onPageChg: (page) => {
      // console.log(page)
      dispatch({
        type: 'Statistics/getStatisticQuery',
        payload:{
          type: 'category',
          pageNum: page.current,
          pageSize: page.pageSize,
          businessId: formRef.current.getFieldValue('businessId'),
        }
      })
    },
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