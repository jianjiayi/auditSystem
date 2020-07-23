/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-07 10:21:51
 * @LastEditTime: 2020-07-13 15:18:18
 */ 
import React, {useState} from 'react';
import {Form, Select, Row, Col} from 'antd';
import styles from './index.module.less';

const { Option } = Select;


function MoreSelect(props) {
  const [firstCategory, setFirstCategory] = useState(props.firstCategory || []);
  const [secondCategory, setSecondCategory] = useState(props.secondCategory ||[]);
  const [thirdCategory, setThirdCategory] = useState(props.thirdCategory ||[]);
  
  const {
    style = {},
    selectFirstCategory, 
    selectSecondCategory, 
    form:{getFieldDecorator, resetFields}
  } = props;

  const selectProps = {
    size: props.size || 'small',
    allowClear: true,
    showSearch: true,
    notFoundContent: null,
    filterOption: false,
  }
  
  const handleSearch = (type, value) =>{console.log(type, value)}

  const onSelectFirstCategory = (value) =>{
    if (value) {
      selectFirstCategory(value);
    }
    resetFields(['secondCategoryId', 'thirdCategoryId']);
  }
  const onSelectSecondCategory = (value) =>{
    if (value) {
      selectSecondCategory(value);
    }
    resetFields(['thirdCategoryId']);
  }

  return (
    <Row type="flex" justify="space-between" style={style}>
      <Col span={7}>
        <Select 
          {...selectProps}
          onSearch={handleSearch.bind(this, 'firstCategory')}
          placeholder="一级分类内容"
          onChange={() => {onSelectFirstCategory()}}>
          {
            firstCategory.length>0 && firstCategory.map((item, index) => {
              return <Option key={index} value={item.treeCode}>{item.treeName}</Option>
            })
          }
        </Select>
      </Col>
      <Col span={7}>
        <Select 
          {...selectProps}
          onSearch={handleSearch.bind(this, 'secondCategory')}
          placeholder="二级分类内容"
          onChange={onSelectSecondCategory.bind(this)}>
          {
            secondCategory.length>0 && secondCategory.map((item, index) => {
                return <Option key={index} value={item.treeCode}>{item.treeName}</Option>
            })
          }
        </Select>
      </Col>
      <Col span={7}>
        <Select 
          {...selectProps}
          onSearch={handleSearch.bind(this, 'thirdCategory')}
          placeholder="三级分类内容">
          {
            thirdCategory.map((item, index) => {
                return <Option key={index} value={item.treeCode}>{item.treeName}</Option>
            })
          }
        </Select>
      </Col>
    </Row>
  )
}

export default Form.create({})(MoreSelect);
