/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:06:57
 * @LastEditTime: 2020-08-10 16:02:10
 */ 
import React, { useState } from 'react';
import { connect } from 'dva';
import {Button} from 'antd';
import PageLoading from '@components/PageLoading';
import TextCountUp from '@components/TextCountUp';

import DemoCharts from '@components/Charts/demo.js';
// import Bar from '@components/Charts/Bar';
// import WordCloud from '@components/Charts/WordCloud';
import echarts from 'echarts/lib/echarts';

import styles from './index.module.less';

function HomePage(props) {
  const {DataView} = props;

  
  let TextCountUpProps = {
    datasource:DataView.datasource
  }

  var colorArray = [
    {
        top: '#ffa800', //黄
        bottom: 'rgba(11,42,84,.3)'
    }, {
        top: '#1ace4a', //绿
        bottom: 'rgba(11,42,84, 0.3)'
    },
    {
        top: '#4bf3ff', //蓝
        bottom: 'rgba(11,42,84,.3)'
    }, {
        top: '#4f9aff', //深蓝
        bottom: 'rgba(11,42,84,.3)'
    },
    {
        top: '#b250ff', //粉
        bottom: 'rgba(11,42,84,.3)'
    }
  ],
  option = {
    xAxis: {
      data: colorArray
    },
    yAxis: {
      data: ['first', 'two', 'three', 'four', 'five']
    },
    series: [{
      type: 'bar',
      barWidth:20,
      label: {
        show: true,
        position: 'top',
        textStyle:{
          color:'#ffffff'
        }
      },
      itemStyle:{
        normal:{
          color:  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(89,208,207,1)'
          },{
            offset: 1,
            color: 'rgba(0,28,189,0)'
          }])
        }
      },
      animationDelay: function (idx) {
        return idx * 900;
      },
      data: [60, 132, 89, 134, 60]
    }],
  };
  console.log(option)
  return (
    <PageLoading loading={false}>
      <div className={styles.container}>
        <TextCountUp {...TextCountUpProps}></TextCountUp>
        {/* <Bar></Bar>
        <WordCloud></WordCloud> */}
        <DemoCharts></DemoCharts>
      </div>
    </PageLoading>
  )
}

function mapStateToProps({DataView}){
  return {DataView}
}

export default connect(mapStateToProps)(HomePage)