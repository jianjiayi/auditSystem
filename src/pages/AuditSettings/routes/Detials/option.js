/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-14 09:06:08
 * @LastEditTime: 2020-08-19 21:55:42
 */
import React, {useState} from 'react';
import _ from 'lodash';
import {message, Modal, Tag, Select, Input, InputNumber, Button, Row, Col, Icon } from 'antd';
import { renderSelect, renderCheckBoxGroup } from '@components/BasicForm/BaseForm'; 
import { MaxAndMin } from '@components/BasicForm';
const { Option } = Select;
const InputGroup = Input.Group;

let formValues = {};

// 违禁词、敏感词、热词、人物词、抓取来源、内容来源
export const getModelSelect = (formRef, ItemName, label, onOpenModal, data= []) =>{
  const {getFieldDecorator, getFieldValue, setFieldsValue} = formRef.current;
  
  // 获取tags
  let values = getFieldValue(ItemName) || data;
  // 删除tag
  const handleTagClose = removedTag =>{
    values.splice(values.findIndex(tag =>  tag === removedTag), 1);
    // 设置form中的name值
    let obj = {};
    obj[ItemName]= values;

    setFieldsValue(obj)
  }

  // render
  return getFieldDecorator(ItemName, {
    // rules: [{ required: true, message: `请选择` }],
    initialValue: values,
  })(
    <div key={ItemName+'222'}>
      {
        !_.isEmpty(values) && values.map((item, index)=>{
          return <Tag key={item.id+index} closable onClose={() => handleTagClose(item)}>{item.word}</Tag>
        })
      }
      <Button type="link" onClick={()=>onOpenModal(ItemName, label)}>
        {values.length == 0 ? '全部' : '+ 新增'}
      </Button>
    </div>
  );
}


// 抓取来源、内容来源
export const getSourceSelect = (formRef, ItemName, label, sourceList, values= null) =>{
  const {getFieldDecorator, getFieldValue, setFieldsValue} = formRef.current;

  const handleChange = (value) =>{
    console.log(`Selected: ${value}`);
  }

  // render
  return getFieldDecorator(ItemName, {
    rules: [{ required: true, message: `请选择来源` }],
    initialValue: values,
  })(
    <Select
      mode="tags"
      size={'default'}
      placeholder="Please select"
      onChange={handleChange}
      style={{ width: '100%' }}
    >
      {
        !_.isEmpty(sourceList) && sourceList.map((item, index) => {
          return <Option key={item.id} value={item.name}>{item.name}</Option>
        })
      }
    </Select>
  );
}


// 内容分值
export const getContentNumber = (formRef,ItemName, values = []) =>{
  const {getFieldDecorator, getFieldValue, setFieldsValue} = formRef.current;

  const MaxAndMinProps = {
    number: values,
    min: 0,
    max: 100,
    onChangeNumber: (values) => {
      console.log(values)
      
      let obj = {};
      obj[ItemName]= values;
      setFieldsValue(obj)
    }
  }

  return getFieldDecorator(ItemName, {
    rules: [{ required: true, message: `请输入内容分值` }],
    initialValue: values,
  })(<MaxAndMin {...MaxAndMinProps}></MaxAndMin>)
}

// 媒体权重
export const getMediaWeight = (formRef, ItemName, values = []) => {
  const {getFieldDecorator, getFieldValue, setFieldsValue} = formRef.current;

  const MaxAndMinProps = {
    number: values,
    min: 0,
    max: 10,
    onChangeNumber: (values) => {
      console.log(values)
      
      let obj = {};
      obj[ItemName]= values;
      setFieldsValue(obj)
    }
  }

  return getFieldDecorator(ItemName, {
    rules: [{ required: true, message: `请输入媒体权重` }],
    initialValue: values,
  })(<MaxAndMin {...MaxAndMinProps}></MaxAndMin>)
}

// 媒体类型
export const getMediaType = (formRef, ItemName, mediaInfo = [], mediaInfoList={}, data= []) =>{
  const {getFieldDecorator, getFieldValue, setFieldsValue} = formRef.current;
  // 获取选择的媒体类型
  let values = getFieldValue(ItemName) || data;
  console.log(values)
  
  let map = {};
  !_.isEmpty(mediaInfo) && mediaInfo.map(item => {
    map[item.code] = item.name;
  })
  return <div className="">
    {
      getFieldDecorator(ItemName, {
        rules: [{ required: true, message: `请选择媒体类型` }],
        // initialValue: formValues.name5,
      })(renderCheckBoxGroup(map))
    }
    {
      values.map((item,index) => {
        console.log(mediaInfoList[item])
        return !_.isEmpty(mediaInfoList[item]) && <div key={index}>
          {getFieldDecorator(item, {
            // initialValue: formValues.name5,
          })(renderCheckBoxGroup(mediaInfoList[item]))}
        </div> 
      })
    }
  </div>
}

// 媒体分类
export const getMediaClassify = (formRef, ItemName, values = []) =>{
  const {getFieldDecorator, getFieldValue, setFieldsValue} = formRef.current;
  const map = { 1: '公众媒体', 2: '自媒体(机构)', 3: '自媒体(个人)'};
  return getFieldDecorator(ItemName, {
    rules: [{ required: true, message: `请选择媒体分类` }],
    initialValue: values,
  })(renderCheckBoxGroup(map));
}

// 媒体属性
export const getMediaAttr = (getFieldDecorator, ItemName, values= []) =>{
  const map = { 1: '白名单', 2: '非白名单'}
  return  getFieldDecorator(ItemName, {
    rules: [{ required: true, message: `请选择媒体属性` }],
    initialValue: values,
  })(renderCheckBoxGroup(map));
}

// 媒体数据
export const getMediaData = (getFieldDecorator, ItemName, values= []) =>{
  const map= { 1: '人民系', 2: '非人民系'}
  return  getFieldDecorator(ItemName, {
    rules: [{ required: true, message: `请选择媒体数据` }],
    initialValue: values,
  })(renderCheckBoxGroup(map));
}

// 涉黄/政暴恐/二维码/广告
export const getBreakRules = (getFieldDecorator, ItemName, label) =>{
  return  getFieldDecorator(ItemName, {
    // rules: [{ required: true, message: `请选择` }],
    initialValue: 1,
  })(
    <span>{label}</span>
  );
}

// 特定词
export const getSpecificText = (getFieldDecorator, ItemName, values= '') =>{
  return  getFieldDecorator(ItemName, {
    rules: [{ required: true, message: `请输入特定词` }],
    initialValue: values,
  })(<Input placeholder='输入框输用","隔开或是"||"隔开，仅支持一种模式'/>);
}

// 时效性
export const getTimeLiness = (getFieldDecorator, ItemName, values= []) =>{
  const map= { 1: '高时效', 2: '中时效', 3:'低时效', 4: '无时效'}
  return  getFieldDecorator(ItemName, {
    rules: [{ required: true, message: `请选择时效性` }],
    initialValue: values,
  })(renderCheckBoxGroup(map));
}

// 审核机制
export const getAuditType = (getFieldDecorator, ItemName, values= []) =>{
  
  const map= { 1: '先审后发', 2: '先发后审', 3:'免审'}
  return  getFieldDecorator(ItemName, {
    rules: [{ required: true, message: `请选择审核机制` }],
    initialValue: values,
  })(renderCheckBoxGroup(map));
}

