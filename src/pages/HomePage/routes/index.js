/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:06:57
 * @LastEditTime: 2020-07-17 15:43:47
 */ 
import React, { useState } from 'react';
import { connect } from 'dva';
import {Button} from 'antd';

import TextCountUp from '@components/TextCountUp';

import Bar from '@components/Charts/Bar';

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
      backgroundColor: '#0E2A43',
      tooltip: {
            show: true,
            formatter: "{b}:{c}"
          },
    grid: {
            left: '5%',
            top: '12%',
            right: '1%',
            bottom: '8%',
            containLabel: true
          },
    
      xAxis: {
          type: 'value',
          show:false,
          position: 'top',
          axisTick: {
              show: false
          },
          axisLine: {
              show: false,
              lineStyle: {
                  color: '#fff',
              }
          },
          splitLine: {
              show: false
          },
      },
      yAxis: [{
              type: 'category',
              axisTick: {
                  show: false,
                  alignWithLabel: false,
                  length: 5,

              },
              "splitLine": { //网格线
                  "show": false
              },
              inverse: 'true', //排序
              axisLine: {
                  show: false,
                  lineStyle: {
                      color: '#fff',
                  }
              },
              data: ['first', 'two', 'three', 'four', 'five']
          }

      ],
      series: [{
              name: '能耗值',
              type: 'bar',
                  label: {
                  normal: {
                    show: true,
                    position: 'right',
                    formatter: '{c}',
                    textStyle: {
                      color: 'white' //color of value
                    }
                  }
                },
              itemStyle: {
                  normal: {
                      show: true,
                      color: function(params) {
                          let num = colorArray.length;
                          return {
                              type: 'linear',
                              colorStops: [{
                                  offset: 0,
                                  color: colorArray[params.dataIndex % num].bottom
                              }, {
                                  offset: 1,
                                  color: colorArray[params.dataIndex % num].top
                              }, {
                                  offset: 0,
                                  color: colorArray[params.dataIndex % num].bottom
                              }, {
                                  offset: 1,
                                  color: colorArray[params.dataIndex % num].top
                              }, {
                                  offset: 0,
                                  color: colorArray[params.dataIndex % num].bottom
                              }, {
                                  offset: 1,
                                  color: colorArray[params.dataIndex % num].top
                              }, {
                                  offset: 0,
                                  color: colorArray[params.dataIndex % num].bottom
                              }, {
                                  offset: 1,
                                  color: colorArray[params.dataIndex % num].top
                              }, {
                                  offset: 0,
                                  color: colorArray[params.dataIndex % num].bottom
                              }, {
                                  offset: 1,
                                  color: colorArray[params.dataIndex % num].top
                              }, {
                                  offset: 0,
                                  color: colorArray[params.dataIndex % num].bottom
                              }, {
                                  offset: 1,
                                  color: colorArray[params.dataIndex % num].top
                              }],
                              //globalCoord: false
                          }
                      },
                      barBorderRadius: 70,
                      borderWidth: 0,
                      borderColor: '#333',
                  }
              },
              barGap: '0%',
              barCategoryGap: '50%',
              data: [60, 132, 89, 134, 60]
          }

      ]
  };
  console.log(option)
  return (
    <div className={styles.container}>
      <TextCountUp {...TextCountUpProps}></TextCountUp>
      <Bar {...option}></Bar>
    </div>
  )
}

function mapStateToProps({DataView}){
  return {DataView}
}

export default connect(mapStateToProps)(HomePage)