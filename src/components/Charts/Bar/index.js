/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-10 13:51:24
 * @LastEditTime: 2020-06-29 16:00:33
 */ 

import React, { useState, useEffect, useRef } from 'react';
import useECharts from '../lib/useECharts';

import option from './option';
import getOption from './getOptions';


function BarChart(data) {
  // console.log(data)
  const chartRef = useRef(null)
  const config = {option, getOption, data}
  
  useECharts (chartRef, config)

  return (
    <div>
      <div style={{width: "300px", height: "200px"}} ref={chartRef} />
    </div>
  )
}

export default BarChart



