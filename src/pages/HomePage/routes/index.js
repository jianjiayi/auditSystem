/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:06:57
 * @LastEditTime: 2020-08-24 16:19:53
 */ 
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'dva';
import _ from 'lodash';

import { BaseForm } from '@components/BasicForm';
import PageLoading from '@components/PageLoading';
import TextCountUp from '@components/TextCountUp';

import PieChart from '@components/Charts/Pie';
import echarts from 'echarts/lib/echarts';

import { ExObject } from '@utils/utils.js';
import {contentType, colorList} from '@config/constants';

import styles from './index.module.less';

function HomePage(props) {
  const formRef = useRef(null);

  const {
    dispatch,
    User: {
      business
    },
    DataView:{
      loading,
      dataSource,
    },
  } = props;

  useEffect(()=>{
    let businessId = formRef.current.getFieldValue('businessId');
    if(!businessId) return;
    dispatch({
      type: 'DataView/init',
      payload: {
        businessId,
      }
    })
  }, [dispatch, business])

  // 多条件搜索配置
  const searchFormProps = {
    className: styles['form-contaner'],
    layout: 'inline',
    dataSource: [
      {
        label: '业务线',
        type: 'SELECT',
        name:'businessId',
        initialValue: ExObject.getFirstValue(business),
        map: business,
      },
    ],
    onSearch: (formValues)=>{
      
      dispatch({
        type: 'DataView/getStatisticCount',
        payload: {
          ...formValues,
        }
      })
    }
  }

  
  let TextCountUpProps = {
    dataSource,
  }

  const option = {
    color: colorList,
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    series: [{
      name: '统计',
      type: 'pie',
      // radius: [30, 110],
      center: ['50%', '50%'],
      // roseType: 'radius',
      label: {
        show: true,
        formatter: '{b} : {c} ({d}%)',
      },
      emphasis: {
        label: {
          show: true
        }
      },
      data: dataSource,
    }]
  }
  console.log(option)

  const pieChartsProps = {
    option,
    width: '800px',
    height: '500px'
  }
  return (
    <div className={styles.container}>
      <BaseForm {...searchFormProps} wrappedComponentRef={formRef}></BaseForm>
      <PageLoading loading={loading}>
        <TextCountUp {...TextCountUpProps}></TextCountUp>
        <PieChart {...pieChartsProps}></PieChart>
      </PageLoading>
    </div>
  )
}

function mapStateToProps({User,DataView}){
  return {User,DataView}
}

export default connect(mapStateToProps)(HomePage)