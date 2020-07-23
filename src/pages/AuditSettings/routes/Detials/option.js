/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-14 09:06:08
 * @LastEditTime: 2020-07-23 15:33:39
 */
import {message, Modal, Tag, Select, Input, InputNumber, Button, Row, Col } from 'antd';
import { renderSelect, renderCheckBoxGroup } from '@components/BasicForm/BaseForm'; 
const { Option } = Select;
const InputGroup = Input.Group;

let formValues = {};

// 违禁词、敏感词、热词、人物词、抓取来源、内容来源
export const getModelSelect = (formRef, ItemName, label, onOpenModal) =>{
  const {getFieldDecorator, getFieldValue} = formRef.current;
  let values = getFieldValue(ItemName) || []
  return getFieldDecorator(ItemName, {
    // rules: [{ required: true, message: `请选择` }],
    // initialValue: 'all',
  })(
    <div>
      {
        values.map((item, index)=>{
          return <Tag key={index}>{item.name}</Tag>
        })
      }
      {values.length == 0 && <Button type="link" onClick={()=>{onOpenModal(ItemName, label)}}>全部</Button>}
    </div>
  );
}

// 内容分值
export const getContentNumber = (getFieldDecorator,ItemName) =>{
  return getFieldDecorator(ItemName, {
    // rules: [{ required: true, message: `请选择` }],
    // initialValue: formValues.name5,
  })(
    <InputGroup compact>
      <Input style={{ width: 100, textAlign: 'center' }} placeholder="Minimum" />
      <Input
        style={{
          width: 30,
          borderLeft: 0,
          pointerEvents: 'none',
          backgroundColor: '#fff',
        }}
        placeholder="~"
        disabled
      />
      <Input style={{ width: 100, textAlign: 'center', borderLeft: 0 }} placeholder="Maximum" />
    </InputGroup>
  )
}

// 媒体权重
export const getMediaWeight = (getFieldDecorator, ItemName) => {
  return getFieldDecorator(ItemName, {
    // rules: [{ required: true, message: `请选择` }],
    // initialValue: formValues.name5,
  })(<InputNumber min={1} max={10}></InputNumber>)
}

// 媒体类型
export const getMediaType = (getFieldDecorator, ItemName) =>{
  const map = { 1: '公众媒体', 2: '自媒体(机构)', 3: '自媒体(个人)'};
  return getFieldDecorator(ItemName, {
    // rules: [{ required: true, message: `请选择` }],
    // initialValue: formValues.name5,
  })(renderCheckBoxGroup(map));
}

// 媒体属性
export const getMediaAttr = (getFieldDecorator, ItemName) =>{
  const map = { 1: '白名单', 2: '非白名单'}
  return  getFieldDecorator(ItemName, {
    // rules: [{ required: true, message: `请选择` }],
    // initialValue: formValues.name5,
  })(renderCheckBoxGroup(map));
}

// 媒体数据
export const getMediaData = (getFieldDecorator, ItemName) =>{
  const map= { 1: '人民系', 2: '非人民系'}
  return  getFieldDecorator(ItemName, {
    // rules: [{ required: true, message: `请选择` }],
    // initialValue: formValues.name5,
  })(renderCheckBoxGroup(map));
}

// 涉黄/政暴恐/二维码/广告
export const getBreakRules = (getFieldDecorator, ItemName, label) =>{
  return  getFieldDecorator(ItemName, {
    // rules: [{ required: true, message: `请选择` }],
    initialValue: label,
  })(
    <span>{label}</span>
  );
}

// 特定词
export const getSpecificText = (getFieldDecorator, ItemName) =>{
  return  getFieldDecorator(ItemName, {
    // rules: [{ required: true, message: `请选择` }],
    // initialValue: formValues.name5,
  })(<Input placeholder='输入框输用","隔开或是"||"隔开，仅支持一种模式'/>);
}

// 时效性
export const getTimeLiness = (getFieldDecorator, ItemName) =>{
  const map= { 1: '高时效', 2: '中时效', 3:'低时效', 4: '无时效'}
  return  getFieldDecorator(ItemName, {
    // rules: [{ required: true, message: `请选择` }],
    // initialValue: formValues.name5,
  })(renderCheckBoxGroup(map));
}

// 审核机制
export const getAuditType = (getFieldDecorator, ItemName) =>{
  const map= { 1: '先审后发', 2: '先发后审', 3:'免审'}
  return  getFieldDecorator(ItemName, {
    // rules: [{ required: true, message: `请选择` }],
    // initialValue: formValues.name5,
  })(renderCheckBoxGroup(map));
}

