/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-06 09:48:30
 * @LastEditTime: 2020-07-07 17:20:37
 */ 
import React, {useImperativeHandle, forwardRef} from 'react';
import {Form, Checkbox, Radio, Input, Tag, Button} from 'antd';
import classNames from 'classnames';
import { MoreSelect } from '@components/BasicForm'

import styles from './index.module.less';

const formItemLayout = {
  labelAlign: 'left',
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' },
];



function SectionAction(props, ref) {
  const {className, form: {getFieldDecorator, validateFields}} = props;

  const moreSelectPrtops = {
    firstCategoryId: '',
    secondCategoryId: '',
    thirdCategoryId: '',
    firstCategory: [],
    secondCategory: [],
    thirdCategory: [],
    selectFirstCategory: () =>{

    },
    selectSecondCategory: ()=>{

    }
  }
  // 文章分类
  const getMoreSelectTpl = () =>{
    return(
      <Form.Item label="分类">
        {getFieldDecorator('category', {
            // initialValue: curArt.title
        })(
          <div className={styles.category}>
            <div className={styles['more-select']}>
              <MoreSelect></MoreSelect>
            </div>
            <Button icon='delete' type="link">删除</Button>
          </div>
        )}
      </Form.Item>
    )
  }
  // 敏感词、违禁词标签
  const getTagsTpl = () =>{
    return (
      <div className="">
        <Form.Item label="违禁词">
            <p className={styles}>
              <Tag color="magenta">magenta</Tag>
              <Tag color="red">red</Tag>
              <Tag color="volcano">volcano</Tag>
              <Tag color="orange">orange</Tag>
              <Tag color="gold">gold</Tag>
              <Tag color="lime">lime</Tag>
              <Tag color="green">green</Tag>
              <Tag color="cyan">cyan</Tag>
              <Tag color="blue">blue</Tag>
              <Tag color="geekblue">geekblue</Tag>
              <Tag color="purple">purple</Tag>
            </p>
        </Form.Item>
        <Form.Item label="敏感词">
            <p className={styles}>
              <Tag color="magenta">magenta</Tag>
              <Tag color="red">red</Tag>
              <Tag color="volcano">volcano</Tag>
              <Tag color="orange">orange</Tag>
              <Tag color="gold">gold</Tag>
              <Tag color="lime">lime</Tag>
              <Tag color="green">green</Tag>
              <Tag color="cyan">cyan</Tag>
              <Tag color="blue">blue</Tag>
              <Tag color="geekblue">geekblue</Tag>
              <Tag color="purple">purple</Tag>
            </p>
        </Form.Item>
      </div>
    )
  }

  // 审核打标
  const getMarkTpl = () =>{
    return (
      <div className="">
        <Form.Item label="是否可重复分发" {...layout}>
          {getFieldDecorator('title', {
              // initialValue: curArt.title
          })(
            <Radio.Group>
              <Radio value="0">是</Radio>
              <Radio value="1">否</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('hot', {
              // initialValue: curArt.title
          })(
            <Checkbox.Group style={{ width: '100%' }}>
              <Checkbox value="A">热点</Checkbox>
              <Checkbox value="C">大事件</Checkbox>
            </Checkbox.Group>
          )}
        </Form.Item>
        <Form.Item label="标签">
          {getFieldDecorator('tags', {
              // initialValue: curArt.title
          })(
              <Input placeholder="请输入标题"/>
          )}
        </Form.Item>
        <Form.Item label="审核结果" {...layout}>
          {getFieldDecorator('result', {
              // initialValue: curArt.title
          })(
            <Radio.Group>
              <Radio value="0">审核通过</Radio>
              <Radio value="1">审核未通过</Radio>
            </Radio.Group>
          )}
        </Form.Item>
      </div>
    )
  }

  return (
    <Form {...formItemLayout} className={classNames(className, styles['section3'])}>
      {getMoreSelectTpl()}
      {getTagsTpl()}
      {getMarkTpl()}
    </Form>
  )
}

SectionAction = forwardRef(SectionAction);

export default Form.create({})(SectionAction);
