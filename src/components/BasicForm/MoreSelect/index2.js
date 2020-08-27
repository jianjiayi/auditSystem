/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-07 10:21:51
 * @LastEditTime: 2020-08-27 19:18:47
 */ 
import React, {useState, useCallback, useEffect} from 'react';
import {Form, Select, Tag, Row, Col, Button, Icon} from 'antd';
import styles from './index.module.less';
import _ from 'lodash';

const { Option } = Select;


function MoreSelect(props) {
  // 临时存储分类
  const [dataList, setDataList] = useState([]);
  const [dataIdArr, setDataIdArr] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);


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
    if(!_.isEmpty(firstCategory)){
      initSelect(category);
    }
    return () => {}
  },[category, initSelect, firstCategory])


  // 调用父级方法
  useEffect(()=>{
    onSelect({dataIdArr,dataList})
  }, [dataIdArr, dataList, onSelect])

  const initSelect = useCallback((category) => {
    // 保存分类id
    if (category != '' && dataIdArr.indexOf(category) === -1) {
      setDataIdArr([...dataIdArr, category]);
    }

    // 保存分类名称
    let categoryArr = category && category.split('/') || [];
    if(_.isEmpty(categoryArr)){
      resetFields(['firstCategoryId','secondCategoryId', 'thirdCategoryId']);
      return;
    }
    let categoryStr = '';
    for(var i in categoryArr){
      (function(i){
        switch(i){
          case '0':
            selectFirstCategory(categoryArr[i]);
            
            categoryStr += fingCategoryName(firstCategory,categoryArr[i]);
            break;
          case '1':
            selectSecondCategory(categoryArr[i]);

            categoryStr += '/'+fingCategoryName(secondCategory || [],categoryArr[i]);
            break;
          case '2':
            categoryStr += '/'+fingCategoryName(thirdCategory,categoryArr[i]);
            break;
        }
      })(i);
    }
    
    if (categoryStr && dataList.indexOf(categoryStr) === -1) {
      setDataList([...dataList, categoryStr]);
    }
  })

  // 根据id查找分类名称
  const fingCategoryName = (data, id) => {
    let item = data.find(item =>item.id == id) || {};
    return item.name;
  }

  // 删除分类
  const deleteTagClose = (removedTag) => {
    let tagsList = _.cloneDeep(dataList);
    let arrList = _.cloneDeep(dataIdArr)
    arrList.splice(tagsList.findIndex(item => item === removedTag), 1);
    setDataIdArr([...arrList]);
    _.pull(tagsList, removedTag);
    setDataList(tagsList);
  }

  // 取消
  const handleInputCancel = () => {
    setInputVisible(false)
  }

  // 保存分类
  const handleInputConfirm = () => {
    console.log(getFieldsValue())
    let arr = Object.values(getFieldsValue());
    arr = arr.filter((item,index)=>item != undefined);
    // 保存一选择的id
    setDataIdArr([...dataIdArr, arr.join('/')]);
    // 处理成文字
    initSelect(arr.join('/'));
  };

  const selectProps = {
    size: props.size || 'small',
    notFoundContent: null,
    filterOption: false,
  }
  
  const handleSearch = (type, value) =>{console.log(type, value)}

  // 一级分类
  const onSelectFirstCategory = (value) =>{
    if (value) {
      selectFirstCategory(value);
      resetFields(['secondCategoryId', 'thirdCategoryId']);
    }
    
  }
  // 二级分类
  const onSelectSecondCategory = (value) =>{
    if (value) {
      selectSecondCategory(value);
      resetFields(['thirdCategoryId']);
    }
  }

  const onSelectThirdCategory = (value) => {

  }

  return (
    <div className="">
      {
        dataList.map((tag, index) => {
          return <Tag key={index+tag} closable onClose={() => deleteTagClose(tag)}>{tag}</Tag>
        })
      }
      {
        (inputVisible &&dataList.length ==0) && <Row type="flex" justify="space-between" style={style}>
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
          <div className="">
            <Button size="small" type="primary" onClick={() => handleInputConfirm()}>保存</Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button size="small" onClick={() => handleInputCancel()}>取消</Button>
          </div>
        </Row>
      }

      {(!inputVisible && dataList.length ==0) &&
        <Tag onClick={()=>{setInputVisible(true)}} style={{ background: '#fff', borderStyle: 'dashed' }}>
          <Icon type="plus" /> 新增标签
        </Tag>
      }
      
    </div>
  )
}

export default Form.create({})(MoreSelect);
