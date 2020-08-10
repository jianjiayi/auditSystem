/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-06 09:48:30
 * @LastEditTime: 2020-08-06 13:57:48
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
  const {className, form: {getFieldDecorator, getFieldValue, setFieldsValue}} = props;

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
            <Tag color="red">magenta</Tag>
            <Tag color="red">red</Tag>
            <Tag color="red">volcano</Tag>
            <Tag color="red">orange</Tag>
          </p>
        </Form.Item>
        <Form.Item label="敏感词">
          <p className={styles}>
            <Tag color="volcano">magenta</Tag>
            <Tag color="volcano">red</Tag>
            <Tag color="volcano">volcano</Tag>
          </p>
        </Form.Item>
        <Form.Item label="人物次">
          <p className={styles}>
            <Tag color="green">green</Tag>
            <Tag color="green">cyan</Tag>
            <Tag color="green">blue</Tag>
            <Tag color="green">geekblue</Tag>
            <Tag color="green">purple</Tag>
          </p>
        </Form.Item>
        <Form.Item label="热词">
          <p className={styles}>
            <Tag color="blue">gold</Tag>
            <Tag color="blue">lime</Tag>
            <Tag color="blue">green</Tag>
            <Tag color="blue">cyan</Tag>
            <Tag color="blue">blue</Tag>
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
      </div>
    )
  }

  // 审核结果
  const getResultTpl = () =>{
    const result = getFieldValue('result');
    return (
      <div>
        <Form.Item label="审核结果" {...layout}>
          {getFieldDecorator('result', {
              // initialValue: curArt.title
              rules: [{ required: true, message: `选择审核结果` }],
          })(
            <Radio.Group>
              <Radio value="0">审核通过</Radio>
              <Radio value="1">审核未通过</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        {
          result == '0' &&
          <Form.Item>
            {getFieldDecorator('result_0', {
                // initialValue: curArt.title
            })(
              <Checkbox.Group style={{ width: '100%' }}>
                <Checkbox value="A">去杂不净</Checkbox>
                <Checkbox value="C">广告</Checkbox>
              </Checkbox.Group>
            )}
          </Form.Item>
        }
        {
          result == '1' &&
          <Form.Item>
            {getFieldDecorator('result_1', {
                // initialValue: curArt.title
                rules: [{ required: true, message: `选择审核未通过原因` }],
            })(
              <Checkbox.Group style={{ width: '100%' }}>
                <Checkbox value="">文章质量差</Checkbox>
                <Checkbox value="">广告</Checkbox>
                <Checkbox value="">软文</Checkbox>
                <Checkbox value="">封图</Checkbox>
                <Checkbox value="">去杂不净</Checkbox>
                <Checkbox value="">抓取不全/错误</Checkbox>
                <Checkbox value="">版权问题</Checkbox>
                <Checkbox value="">其他</Checkbox>
              </Checkbox.Group>
            )}
          </Form.Item>
        }
      </div>
    )
  }

  return (
    <Form {...formItemLayout} className={classNames(className, styles['section3'])}>
      {getMoreSelectTpl()}
      {getTagsTpl()}
      {getMarkTpl()}
      {getResultTpl()}
    </Form>
  )
}

SectionAction = forwardRef(SectionAction);

export default Form.create({})(SectionAction);
