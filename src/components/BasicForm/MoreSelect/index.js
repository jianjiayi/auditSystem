/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-07 10:21:51
 * @LastEditTime: 2020-08-25 15:50:29
 */ 
import React, {useState, useEffect} from 'react';
import {Form, Select, Row, Col} from 'antd';
import styles from './index.module.less';
import _ from 'lodash';

const { Option } = Select;


function MoreSelect(props) {

  const {
    style = {},
    category,
    onSelect,
    firstCategory = [],
    secondCategory = [],
    thirdCategory = [],
    selectFirstCategory, 
    selectSecondCategory, 
    form:{getFieldDecorator, setFieldsValue,getFieldsValue, resetFields}
  } = props;

  useEffect(()=>{
    initSelect();

    return () => {}
  },[category, initSelect])

  const initSelect = () => {
    // console.log('category',category)
    let categoryArr = category && category.split('/') || [];
    if(_.isEmpty(categoryArr)){
      resetFields(['firstCategoryId','secondCategoryId', 'thirdCategoryId']);
      return;
    }
    for(var i in categoryArr){
      (function(i){
        switch(i){
          case '0':
            setFieldsValue({'firstCategoryId':categoryArr[i]});
            onSelectFirstCategory(categoryArr[i]);
            break;
          case '1':
            setFieldsValue({'secondCategoryId':categoryArr[i]});
            onSelectSecondCategory(categoryArr[i]);
            break;
          case '2':
            setFieldsValue({'thirdCategoryId':categoryArr[i]});
            break;
        }
      })(i);
    }

    console.log(getFieldsValue())
  }

  

  const selectProps = {
    size: props.size || 'small',
    allowClear: true,
    // showSearch: true,
    notFoundContent: null,
    filterOption: false,
  }
  
  const handleSearch = (type, value) =>{console.log(type, value)}

  // 一级分类
  const onSelectFirstCategory = (value) =>{
    if (value) {
      selectFirstCategory(value);
      resetFields(['secondCategoryId', 'thirdCategoryId']);
      onSelect(getFieldsValue())
    }
    
  }
  // 二级分类
  const onSelectSecondCategory = (value) =>{
    if (value) {
      selectSecondCategory(value);
      resetFields(['thirdCategoryId']);
      onSelect(getFieldsValue())
    }
  }
  // 三级分类
  const onSelectThirdCategory = (value) => {
    if (value) {
      onSelect(getFieldsValue())
    }
  }

  return (
    <Row type="flex" justify="space-between" style={style}>
      
      <Col span={7}>
        {
          getFieldDecorator('firstCategoryId', {
            // rules: [{ required: true, message: `请选择媒体类型` }],
            // initialValue: firstCategoryId,
          })(
            <Select 
              {...selectProps}
              onSearch={handleSearch.bind(this, 'firstCategory')}
              placeholder="一级分类内容"
              onSelect={(value) => {onSelectFirstCategory(value)}}>
              {
                !_.isEmpty(firstCategory) && firstCategory.map((item, index) => {
                  return <Option key={item.id} value={item.id}>{item.name}</Option>
                })
              }
            </Select>
          )
        }
        
      </Col>
      <Col span={7}>
        {
          getFieldDecorator('secondCategoryId', {
            // rules: [{ required: true, message: `请选择媒体类型` }],
            // initialValue: secondCategoryId,
          })(
            <Select 
              {...selectProps}
              onSearch={handleSearch.bind(this, 'secondCategory')}
              placeholder="二级分类内容"
              onSelect={(value) => onSelectSecondCategory(value)}>
              {
                !_.isEmpty(secondCategory) && secondCategory.map((item, index) => {
                    return <Option key={item.id} value={item.id}>{item.name}</Option>
                })
              }
            </Select>
          )
        } 
      </Col>
      <Col span={7}>
        {
          getFieldDecorator('thirdCategoryId', {
            // rules: [{ required: true, message: `请选择媒体类型` }],
            // initialValue: thirdCategoryId,
          })(
            <Select 
              {...selectProps}
              onSearch={handleSearch.bind(this, 'thirdCategory')}
              placeholder="三级分类内容"
              onSelect={(value) => onSelectThirdCategory(value)}>
              {
                !_.isEmpty(thirdCategory) && thirdCategory.map((item, index) => {
                    return <Option key={item.id} value={item.id}>{item.name}</Option>
                })
              }
            </Select>
          )
        }
      </Col>
    </Row>
  )
}

export default Form.create({})(MoreSelect);
