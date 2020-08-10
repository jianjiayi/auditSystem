/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-10 13:51:24
 * @LastEditTime: 2020-08-10 15:51:20
 */ 

import React, { useState, useEffect, useRef } from 'react';
import useECharts from '../lib/useECharts';

import options from './option';
import getOption from './getOption';


function WordCloud(props) {
  const {option = options, width = '300px', height = '200px',} = props;
  // console.log(data)
  const chartRef = useRef(null)
  const config = {option, getOption, props}
  
  useECharts (chartRef, config)

  return (
    <div>
      <div style={{width: width, height: height}} ref={chartRef} />
    </div>
  )
}

export default WordCloud;



