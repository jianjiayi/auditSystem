/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-29 14:44:51
 * @LastEditTime: 2020-07-22 15:37:01
 */ 
import React, {useRef} from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Button } from 'antd';
import { BaseForm } from '@components/BasicForm';
import { BaseTable } from '@components/BasicTable';

import styles from './index.module.less';

function AuditSettings(props) {
  
  const {Settings: {table}} = props;

  // 搜索表单配置项
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
        label: '内容类型',
        type: 'SELECT',
        name:'params2',
        initialValue: '0',
        map: { 0: '全部', 1: '图文', 2: '视频', 3: '音频', 4: '图集' }
      },
      {
        label: '队列机制',
        type: 'SELECT',
        name:'params3',
        initialValue: '0',
        map: { 0: '先审后发', 1: '先发后审', 2: '免审' }
      },
      {
        label: '保存时长',
        type: 'SELECT',
        name:'params4',
        initialValue: '0',
        map: { 0: '全部', 1: '1天', 3: '3天', 7: '7天', 15: '15天', 30: '30天', 60: '60天', 90: '90天' }
      },
      {
        label: '状态',
        type: 'SELECT',
        name:'params5',
        initialValue: '0',
        map: { 0: '全部', 1: '有效', 2: '隐藏' }
      },
      { label: '更新时间', name: 'params6', type: 'DATATIME_START_END'},
      { label: '更新人', name: 'params7'},
      { label: '队列名称', name: 'params8'},
    ],
    onSearch: (formValues)=>{
      console.log('formValues', formValues)
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
        render: text => <a>{text}</a>,
      },
      {
        title: '队列规则',
        align: 'center',
        dataIndex: 'id',
        render: text => <a>{text}</a>,
      },
      {
        title: '内容类型',
        align: 'center',
        dataIndex: 'address1',
      },
      {
        title: '队列机制',
        align: 'center',
        dataIndex: 'age',
      },
      {
        title: '保存时长',
        align: 'center',
        dataIndex: 'address2',
      },
      {
        title: '更新时间',
        align: 'center',
        dataIndex: 'age3',
      },
      {
        title: '更新人',
        align: 'center',
        dataIndex: 'age4',
      },
      {
        title: '状态',
        align: 'center',
        width: '160px',
        dataIndex: 'age5',
      },
      {
        title: '操作',
        width: '210px',
        align: 'center',
        render(r) {
          return (
            <div className={styles.tableaction}>
              <Button type="primary" size="small"onClick={()=>goDetails({id: '2222',action: 'update'})}>修改</Button>
              <Button size="small" onClick={()=>{console.log(r.id)}}>停用</Button>
              <Button size="small" onClick={()=>goDetails({id: '2222',action: 'copy'})}>复制</Button>
            </div>);
        }
      },
    ],
    ...table,
  }

  
  return (
    <div>
      <BaseForm {...searchFormProps}>
        <Button  ghost type="primary" onClick={()=>goDetails({action: 'create'})}>创建队列</Button>
      </BaseForm>
      <BaseTable {...tableProps}></BaseTable>
    </div>
  )
}

function mapStateToProps({Settings}){
  return {Settings}
}

export default connect(mapStateToProps)(AuditSettings)