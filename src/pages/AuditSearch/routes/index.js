/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-29 14:44:51
 * @LastEditTime: 2020-08-27 10:58:34
 */ 
import React, {useState, useEffect, useRef} from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import {message, Modal, Tag, Tooltip, Form, Select, Input, Button } from 'antd';
import _ from 'lodash';

import { BaseForm, MoreSelect } from '@components/BasicForm';
import { BaseTable } from '@components/BasicTable';
import { renderSelect } from '@components/BasicForm/BaseForm'; 
import ViewRecord from './components/ViewRecord.js';

import { ExArray, ExObject } from '@utils/utils.js';
import {contentType, auditStatus, auditResult, runningStatus, queueType, dateFormat} from '@config/constants';

import styles from './index.module.less';

import wrapAuth from '@components/WrapAuth';
const AuthButton = wrapAuth(Button);

const { Option } = Select;
const InputGroup = Input.Group;

function AuditSearch(props) {
  const tableRef = useRef(null);
  const formRef = useRef(null);
  const viewRecordRef = useRef(null);

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
      query,
      loading,
      queueMap,
      dataSource, 
      pagination,
    },
    form: {getFieldDecorator, getFieldValue, setFieldsValue},
  } = props;


  useEffect(()=>{
    const params = formRef.current.getFieldsValue();
    let query = JSON.parse(sessionStorage.getItem('$QUERY_FROM_SEARCH')) || {};//获取缓存中查询条件
    console.log(query)
    dispatch({
      type: 'Search/init',
      payload: {
        ...params,
        ...query
      }
    })


    // router.setRouteLeaveHook(
    //   props.route,
    //   routerWillLeave
    // )

  }, [dispatch]);


  const routerWillLeave = (nextLocation) =>{
    console.log('nextLocation', nextLocation)
  }


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
        onChange: (e)=>{
          console.log('e',e)
          if(!e) return;
          
          dispatch({
            type: 'Search/getQueue',
            payload: {
              bid: e
            }
          })
        }
      },
      {
        label: '内容类型',
        type: 'SELECT',
        name:'type',
        initialValue: 'NEWS',
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
        name:'queue',
        initialValue: '',
        map: { '': '全部', ...queueMap }
      },
      {
        label: '审核状态',
        type: 'SELECT',
        name:'resultStatus',
        initialValue: '',
        map: auditResult
      },
      {
        label: '是否上架',
        type: 'SELECT',
        name:'status',
        initialValue: '',
        map: runningStatus
      },
      { label: '入审时间', name: 'datatime', type: 'DATATIME_START_END'},
      { label: '来源', name: 'source'},
      { label: '采集源ID', name: 'crawlSourceId'},
      { label: '采集源', name: 'crawlSource'},
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
    formValues: JSON.parse(sessionStorage.getItem('$QUERY_FROM_SEARCH')) || query,
    onReset : () =>{
      const params = formRef.current.getFieldsValue();
       dispatch({
        type: 'Statistics/init',
        payload: { ...params }
      })
    },
    onSearch: (formValues)=>{
      // 取消table选中的数据
      tableRef.current.setSelectedRowKeys(null);
      
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
        type: 'Search/getNewsList',
        payload: {
          ...formValues
        }
      })
    }
  }


  // 格式化所属队列
  const getQueueText = (data) =>{
    let str = ''
    if(!_.isEmpty(data)){
      data.map(item=>{
        str += item.name + ","
      })
    }
    let text = str.length > 20 ? str.slice(0, 20) + '...': str;

    return <Tooltip title={str}>
      <a>{text}</a>
    </Tooltip>
  }

   // 列表配置
  const tableProps = {
    // 类型
    selectionType: 'checkbox', //checkbox or radio or null||false
    // 表头
    columns: [
      {
        title: '标题',
        dataIndex: 'title',
        align: 'center',
        render: text => <Tooltip title={text}>
                          <a>{text.length > 15 ? text.slice(0, 15) + '...': text}</a>
                        </Tooltip>,
      },
      {
        title: 'ID',
        align: 'center',
        dataIndex: 'id',
        render: text => <span>{text}</span>,
      },
      {
        title: '分类',
        align: 'center',
        dataIndex: 'categorys',
      },
      {
        title: '来源',
        align: 'center',
        dataIndex: 'source',
      },
      {
        title: '采集源ID',
        align: 'center',
        dataIndex: 'crawlSourceId',
      },
      {
        title: '所属队列',
        align: 'center',
        dataIndex: 'queues',
        render: text => getQueueText(text),
      },
      {
        title: '封面图',
        align: 'center',
        dataIndex: 'cover',
      },
      {
        title: '审核状态',
        width: '80px',
        align: 'center',
        dataIndex: 'status',
        render: text => <span>{text}</span>,
      },
      {
        title: '是否上架',
        align: 'center',
        width: '80px',
        dataIndex: 'resultStatus',
        render: text => <span>{text}</span>,
      },
      {
        title: '入审时间',
        align: 'center',
        align: 'center',
        dataIndex: 'createTime',
      },
      {
        title: '操作',
        width: '40px',
        align: 'center',
        render(r) {
          return (
            <div className={styles.tableaction}>
              <AuthButton perms={'news:get'} type="primary" size="small" onClick={()=>goDetails(r)}>领审</AuthButton>
              <AuthButton perms={'queue:add'} size="small" type="dashed" onClick={()=>openAddQueueModal(r)}>加队列</AuthButton>
              <AuthButton perms={'history:select'} size="small" onClick={()=>getViewRecord(r.id)}>操作记录</AuthButton>
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
        type: 'Search/getNewsList',
        payload:{
          pageNum: page.current,
          pageSize: page.pageSize,
        }
      })

      tableRef.current.setSelectedRowKeys(null);
      tableRef.current.setSelectedRows(null);
    },
  }

  // 领审操作
  const goDetails = (data)=>{
    console.log(data)
    const {businessId,id, queues, type} = data;
    let {queueType,id: queue} = queues[0]
    let params = {
      routersource: 'search',
      businessId,
      id,
      queue,
      queueType,
      type
    }

    console.log(params);
    dispatch({
      type: 'CDetails/getNewsGetTask',
      payload: params,
      callback: (data) =>{
        if(_.isEmpty(data)){
          return message.error('当前文章不可以领取');
        }

        dispatch({type: 'CDetails/save', payload: {query: params}});
        // sessionStorage.setItem('$QUERY', params);
        sessionStorage.setItem('$QUERY', JSON.stringify(params));
        sessionStorage.setItem('$QUERY_FROM_SEARCH', JSON.stringify(query));
        router.push({pathname:'/search/cdetails'});
      }
    })
  }

  // 加队列操作
  const openAddQueueModal = (data) => {
    const {businessId, id, type} = data;
    dispatch({
      type: 'Search/getNewsReAduit',
      payload:{
        businessId,
        id,
        type,
      },
      callback: (code,data)=>{
        if(code == 200){
          if(data == 1){
            message.success('加入复审队列成功');
          }else{
            message.warning('该文章已经在复审队列，请勿重复添加');
          }
        }else{
          message.error('加入复审队列失败');
        }
        
      }
    })
  }

  // 查看操作记录
  const getViewRecord = (data) => {
    viewRecordRef.current.setVisible(true)
  }
  const recordProps = {
    footer: null,
    dataSource: {}
  } 


  // 批量审核操作
  const batchAudit = (status) => {
    let pass = status;
    // console.log(tableRef.current.selectedRows)
    let selectedRows = tableRef.current.selectedRows; //获取选中的列表
    if(_.isEmpty(selectedRows)) return message.error('请勾选文章列表后在操作');

    // 处理选中文章数据
    let paramsList = [];
    selectedRows.map(item=>{
      let id = item.id;
      let firstQueue = item.queues[0];
      let queueInfo = {
        bid: firstQueue.bid,
        id: firstQueue.id,
        queueType: firstQueue.queueType,
        type: firstQueue.type
      };
      paramsList.push({id, queueInfo})
    })

    // console.log(paramsList)

    dispatch({
      type: 'Search/batchAudit',
      payload: {
        pass,
        paramsList
      },
      callback: (data) => {
        tableRef.current.setSelectedRowKeys(null);
        tableRef.current.setSelectedRows(null);

        if(pass && _.isEmpty(data._2) || !pass && _.isEmpty(data._1)) return;
        
        // 温馨提示
        Modal.warning({
          title: '温馨提示',
          content: (
            <div>
              {
                pass ?
                <div className="">
                  <p>以下文章id没有操作成功</p>
                  {
                    data._2.map((item,index)=>{
                      return <Tag key={item}>{item}</Tag>
                    })
                  }
                </div>:
                <div className="">
                  <p>以下文章id没有操作成功</p>
                  {
                    data._1.map((item,index)=>{
                      return <Tag key={item}>{item}</Tag>
                    })
                  }
                </div>
              }
            </div>
          ),
          onOk() {},
        });
      }
    })
  }

  return (
    <div>
      <BaseForm {...searchFormProps}  wrappedComponentRef={formRef}></BaseForm>
      <BaseTable {...tableProps} ref= {tableRef}>
        <div className={styles['right-button']}>
          <AuthButton perms={'news:audit'} type="primary" onClick={()=> batchAudit(true)}>通过</AuthButton>
          <AuthButton perms={'news:audit'} type="danger" onClick={() => batchAudit(false)}>未通过</AuthButton>
        </div>
      </BaseTable>
      <ViewRecord {...recordProps} ref={viewRecordRef}></ViewRecord>
    </div>
  )
}

function mapStateToProps({Global, User, Search}){
  return {Global, User, Search}
}

export default Form.create({})(connect(mapStateToProps)(AuditSearch))