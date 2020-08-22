/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-29 14:44:51
 * @LastEditTime: 2020-08-22 10:23:26
 */ 
import React, {Fragment, useState, useEffect, useRef } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Button } from 'antd';
import { BaseForm } from '@components/BasicForm';
import { BaseTable } from '@components/BasicTable';
import ViewRules from './components/viewRules.js';
import wrapAuth from '@components/WrapAuth';
import _ from 'lodash';

import { ExArray, ExObject } from '@utils/utils.js';
import {contentType, queueType, keepDays, queueStatus} from '@config/constants';

import styles from './index.module.less';

const AuthButton = wrapAuth(Button);

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

function AuditSettings(props) {

  const viewRulesRef = useRef(null);
  const [rulesJsonStr, setRulesJsonStr] = useState('');
  
  const {
    dispatch,
    location,
    User: {
      business
    },
    QDetails: {
      configRule,
      mediaInfo, 
      mediaInfoList,
    },
    Settings: {
      loading,
      dataSource, 
      pagination,
    }
  } = props;

  useEffect(()=>{
    dispatch({
      type: 'Settings/init',
      payload: {}
    })
  }, [dispatch])

  // 搜索表单配置项
  const searchFormProps = {
    className: styles['form-contaner'],
    layout: 'inline',
    okPerms: 'setting:select',
    dataSource: [
      {
        label: '业务线',
        type: 'SELECT',
        name:'bid',
        initialValue: '', 
        map: {'': '全部', ...business}
      },
      {
        label: '内容类型',
        type: 'SELECT',
        name:'type',
        initialValue: '',
        map: contentType
      },
      {
        label: '队列机制',
        type: 'SELECT',
        name:'queueType',
        initialValue: '',
        map: queueType
      },
      {
        label: '保存时长',
        type: 'SELECT',
        name:'keepDays',
        initialValue: '',
        map: keepDays
      },
      {
        label: '状态',
        type: 'SELECT',
        name:'status',
        initialValue: '',
        map: queueStatus
      },
      { label: '更新时间', name: 'updateTime', type: 'DATATIME_START_END'},
      { label: '更新人', name: 'updateBy'},
      { label: '队列名称', name: 'name'},
    ],
    onReset : () =>{
      dispatch({
        type: 'Settings/init',
        payload: {}
      })
    },
    onSearch: (formValues)=>{
      if(!_.isEmpty(formValues.updateTime)){
        formValues.updateTime_start = formValues.updateTime[0].format(dateFormat);
        formValues.updateTime_end = formValues.updateTime[1].format(dateFormat);
      }
      delete formValues.updateTime;
      
      console.log('formValues', formValues)
      dispatch({
        type: 'Settings/getQueue',
        payload: formValues
      })
      
    }
  }

  // 队列详情页
  const goDetails = (params)=>{
    router.push(
      {
        pathname:'/setting/details/',
        query:{
          ...params,
        }
      }
    );
  }

   // 列表配置
  const tableProps = {
    // 类型
    selectionType: null, //checkbox or radio or null||false
    // 表头
    columns: [
      {
        title: '队列名称',
        dataIndex: 'name',
        width: '300px',
        render: text => <span>{text}</span>,
      },
      {
        title: '队列规则',
        align: 'center',
        dataIndex: 'ruleJson',
        render: text => <a onClick={() => getViewRules(text)}>查看</a>,
      },
      {
        title: '内容类型',
        align: 'center',
        dataIndex: 'type',
        render: text => <span>{contentType[text || '']}</span>,
      },
      {
        title: '队列机制',
        align: 'center',
        dataIndex: 'queueType',
        render: text => <span>{queueType[text || '']}</span>,
      },
      {
        title: '保存时长',
        align: 'center',
        dataIndex: 'keepDays',
        render: text => <span>{keepDays[text || ''] || text+'天'}</span>,
      },
      {
        title: '更新时间',
        align: 'center',
        dataIndex: 'createTime',
      },
      {
        title: '更新人',
        align: 'center',
        dataIndex: 'updateBy',
      },
      {
        title: '状态',
        align: 'center',
        width: '160px',
        dataIndex: 'status',
        render: text => <span>{queueStatus[text || '']}</span>,
      },
      {
        title: '操作',
        width: '210px',
        align: 'center',
        render(r) {
          return (
            <div className={styles.tableaction}>
              <AuthButton perms={'setting:edit'} type="primary" size="small"onClick={()=>goDetails({id: r.id,action: 'update'})}>修改</AuthButton>
              <AuthButton perms={'setting:edit'} size="small" onClick={()=>{console.log(r.id)}}>停用</AuthButton>
              <AuthButton perms={'setting:add'} size="small" onClick={()=>goDetails({id: r.id,action: 'copy'})}>复制</AuthButton>
            </div>
          );
        }
      },
    ],
    loading,
    dataSource,
    pagination,
    onPageChg: (page) => {
      // console.log(page)
      dispatch({
        type:'Settings/getQueue',
        payload:{
          pageNum: page.current,
          pageSize: page.pageSize
        }
      })
    },
  }


  // 查看队列规则
  const getViewRules = (data) => {
    setRulesJsonStr(data);
    viewRulesRef.current.setVisible(true)
  }
  const viewRuleProps = {
    footer: null,
    configRule,
    mediaInfo, 
    mediaInfoList,
    rulesJson: rulesJsonStr
  }

  
  return (
    <Fragment>
      <BaseForm {...searchFormProps}>
        <AuthButton perms={'setting:add'}  ghost type="primary" onClick={()=>goDetails({action: 'create'})}>创建队列</AuthButton>
      </BaseForm>
      <BaseTable {...tableProps}></BaseTable>
      <ViewRules {...viewRuleProps} ref={viewRulesRef}></ViewRules>
    </Fragment>
  )
}

function mapStateToProps({User,QDetails, Settings}){
  return {User, QDetails, Settings}
}

export default connect(mapStateToProps)(AuditSettings)