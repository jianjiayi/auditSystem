/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-14 09:06:08
 * @LastEditTime: 2020-08-20 14:49:38
 */
import React, {useState} from 'react';
import _ from 'lodash';
import {message, Modal, Tag, Select, Input, InputNumber, Button, Row, Col, Icon } from 'antd';


// 违禁词、敏感词、热词、人物词、抓取来源、内容来源
export const getModelSelect = (values= []) =>{
  // render
  return !_.isEmpty(values) && values.map((item, index)=>{
    return <Tag color="orange" key={item.id+index}>{item.word}</Tag>
  })
}


// 抓取来源、内容来源
export const getSourceSelect = (values = []) =>{
  // render
  return (
    !_.isEmpty(values) && values.map((item, index) => {
      return <Tag color="gold" key={item}>{item}</Tag>
    })
  );
}


// 内容分值
export const getContentNumber = ( values = []) =>{
  return (<span>{`${values[0]}~${values[1]}`}</span>)
}

// 媒体权重
export const getMediaWeight = (values = []) => {
  return (<span>{`${values[0]}~${values[1]}`}</span>)
}

// 媒体类型
export const getMediaType = ( mediaInfo = [], mediaInfoList={}, values= []) =>{
  let map = {};
  !_.isEmpty(mediaInfo) && mediaInfo.map(item => {
    map[item.code] = item.name;
  })
  return <div className="">
    {
      !_.isEmpty(values) && values.map((item,index) => {
        return <Tag color="lime" key={index}>{map[item]}</Tag>
      })
    }
    {/* {
      !_.isEmpty(values) && values.map((item,index) => {
        // console.log(mediaInfoList[item])
        return !_.isEmpty(mediaInfoList[item]) && <div key={index}>
          {getFieldDecorator(item, {
            // initialValue: formValues.name5,
          })(renderCheckBoxGroup(mediaInfoList[item]))}
        </div> 
      })
    } */}
  </div>
}

// 媒体分类
export const getMediaClassify = (values = []) =>{
  const map = { 1: '公众媒体', 2: '自媒体(机构)', 3: '自媒体(个人)'};
  return ( 
    !_.isEmpty(values) && values.map((item,index) => {
      return <Tag color="green" key={index}>{map[item]}</Tag>
    })
  )
}

// 媒体属性
export const getMediaAttr = ( values= []) =>{
  const map = { 1: '白名单', 2: '非白名单'}
   return ( 
    !_.isEmpty(values) && values.map((item,index) => {
      return <Tag color="cyan" key={index}>{map[item]}</Tag>
    })
  )
}

// 媒体数据
export const getMediaData = (values= []) =>{
  const map= { 1: '人民系', 2: '非人民系'}
  return ( 
    !_.isEmpty(values) && values.map((item,index) => {
      return <Tag color="blue" key={index}>{map[item]}</Tag>
    })
  )
}

// 涉黄/政暴恐/二维码/广告
export const getBreakRules = (values) =>{
  return  (<Tag color="#f50">{values}</Tag>);
}

// 特定词
export const getSpecificText = (values= '') =>{
  return  (<span> {values} </span>);
}

// 时效性
export const getTimeLiness = ( values= []) =>{
  const map= { 1: '高时效', 2: '中时效', 3:'低时效', 4: '无时效'}
  return ( 
    !_.isEmpty(values) && values.map((item,index) => {
      return <Tag color="geekblue" key={index}>{map[item]}</Tag>
    })
  )
}

// 审核机制
export const getAuditType = (values= []) =>{
  
  const map= { 1: '先审后发', 2: '先发后审', 3:'免审'}
  return ( 
    !_.isEmpty(values) && values.map((item,index) => {
      return <Tag color="purple" key={index}>{map[item]}</Tag>
    })
  )
}

