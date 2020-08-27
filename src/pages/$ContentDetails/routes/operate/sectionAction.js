/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-06 09:48:30
 * @LastEditTime: 2020-08-25 10:08:23
 */ 
import React, {useState, useRef, useImperativeHandle, forwardRef} from 'react';
import {message, Form, Checkbox, Radio, Input, Tag, Button, Row, Col, Icon} from 'antd';
import classNames from 'classnames';
import _ from 'lodash';
import { MoreSelect2 } from '@components/BasicForm'

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
  // 存储标签
  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const saveInputRef = useRef(null);

  const {
    className, 
    curArt,
    dispatch,
    category, //分类
    Global: {
      firstCategory,
      secondCategory,
      thirdCategory,
    },
    form: {getFieldDecorator, getFieldValue, setFieldsValue}, 
  } = props;

  /**三级分类参数*/ 
  const moreSelectProps = {
    size: 'small',
    style: { width: '320px' },
    category: category[0], //分类
    firstCategory,
    secondCategory,
    thirdCategory,
    onSelect: (values) => {
      console.log(values)
      // let arr = Object.values(values);
      // arr = arr.filter((item,index)=>item != undefined)
      // setFieldsValue({'category':arr.join('/')})
    },
    selectFirstCategory: (id) =>{
      dispatch({
        type: 'Global/getSecondCategory',
        payload: {
          id: id
        }
      })
    },
    selectSecondCategory: (id)=>{
      dispatch({
        type: 'Global/getThirdCategory',
        payload: {
          id: id
        }
      })
    },
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
              <MoreSelect2 {...moreSelectProps}></MoreSelect2>
            </div>
            {/* <Button icon='delete' type="link">删除</Button> */}
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


  // 删除标签tags
  const deleteTagClose = (removedTag) => {
    let tagsList = _.cloneDeep(tags);
    _.pull(tagsList, removedTag);
    setTags(tagsList);
  }
  // 保存标签
  const handleInputConfirm = () => {
    let inputValue = saveInputRef.current.state.value;
    if(!inputValue)return false;

    if(calcStrLength(inputValue) > 10){
      return message.error('您输入的文字过长，最多可输入50个字');
    }

    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue])
    }
    console.log(tags);
    dispatch({
      type: 'CDetails/getSaveTags',
      payload: {

      },
      callback: () =>{
        setInputVisible(false)
      }
    })
  };
  // 取消
  const handleInputCancel = () => {
    setInputVisible(false)
  }

  // 标签文字长度校验
  const calcStrLength = (value) => {
    return Math.ceil(calcByteLength(value) / 2);
  }
  const calcByteLength = (s) => {
    return s.replace(/[^\x00-\xff]/g, 'aa').length;
  }
  const validateTextLength  = (rule, value, callback) => {
    if (calcStrLength(value) > 10) {
      callback('您输入的文字过长，最多可输入50个字'); // 校验未通过
    }
    callback(); // 校验通过
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
          <Row type="flex" justify="start">
            <Col>
              {getFieldDecorator('hotValue', {
                initialValue: [curArt.hotValue] || 0
              })(<Checkbox.Group><Checkbox value={1}>热点</Checkbox></Checkbox.Group>)}
            </Col>
            <Col>
              {getFieldDecorator('bigEvent', {
                initialValue: [curArt.bigEvent] || false
              })(<Checkbox.Group><Checkbox value={true}>大事件</Checkbox></Checkbox.Group>)}
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="标签">
          {getFieldDecorator('tags', {
            initialValue: curArt.bigEvent || [],
          })(
            <div>
              {tags.map((tag, index) => {
                const tagElem = (
                  <Tag key={index+tag} closable onClose={() => deleteTagClose(tag)}>{tag}</Tag>
                );
                return tagElem;
              })}
              {inputVisible && (
                <div>
                  <Input
                    ref={saveInputRef}
                    type="text"
                    size="small"
                  />
                  <Button size="small" type="primary" onClick={() => handleInputConfirm()}>保存</Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <Button size="small" onClick={() => handleInputCancel()}>取消</Button>
                </div>
              )}
              {!inputVisible && (
                <Tag onClick={()=>{setInputVisible(true)}} style={{ background: '#fff', borderStyle: 'dashed' }}>
                  <Icon type="plus" /> 新增
                </Tag>
              )}
            </div>
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
