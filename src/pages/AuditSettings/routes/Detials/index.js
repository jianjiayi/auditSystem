/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-29 14:44:51
 * @LastEditTime: 2020-08-14 17:47:13
 */ 
import React, {useState, useEffect, useRef} from 'react';
import {message, Form, Select, Input, InputNumber, Button, Row, Col } from 'antd';
import { connect } from 'dva';
import debounce from 'lodash.debounce';
import { renderSelect } from '@components/BasicForm/BaseForm'; 
import { BaseForm, MoreSelect } from '@components/BasicForm';
import { ModalTable } from '@components/BasicTable';
import PageLoading from '@components/PageLoading';

import {getRulesItem, getRules, getDenyWordsKey, isShowInclude} from './config';
import {
  getModelSelect, 
  getContentNumber, 
  getMediaWeight, 
  getMediaType, 
  getMediaClassify,
  getMediaAttr, 
  getMediaData,
  getBreakRules, 
  getSpecificText, 
  getTimeLiness, 
  getAuditType
} from './option';

import { ExArray } from '@utils/utils.js';

import styles from './index.module.less';

const { Option } = Select;
const InputGroup = Input.Group;

/**
* formOptions改变量用于辅助动态创建表单用
*/ 
let formOptions =  [];


function QueueDetails(props) {
  const formRef = useRef(null);
  const rulesModal = useRef(null);
  // 创建key
  const [itemKey, setItemKey] = useState(null);
  // 包含状态
  const [include, setInclude] = useState(0);
  // 动态表单项数组
  const [itemOptions, setItemOptions] = useState([]);
  // modal状态
  const [modalProps, setModalProps] = useState({});

  // 获取state
  const {
    dispatch,
    location,
    User: {
      business
    },
    Global: {
      firstCategory,  // 一级分类
      secondCategory, // 二级分类
      thirdCategory,  // 三级分类
    },
    QDetails: {
      loading,
      configRule,
      mediaInfo,
      mediaInfoList,
      category,
      dataSource, 
      pagination,
      art
    }, 
  } = props;

  // console.log(props)

  // 组件销毁时候
  useEffect(() => {
    dispatch({
      type: 'QDetails/init',
      payload: {
        action: location.query.action || ''
      }
    })

    return ()=>{
      formOptions =  [];//组件销毁时候，清空配置数组
    }
  }, [dispatch, location.query.action]);
  
  
  /**添加要创建的表单项*/ 
  const addItemOption = (item, isInclude) => {
    console.log(item)
    let ItemName = item.id +'_'+ isInclude;

    // 判断是否存在该表单项
    let isExist = itemOptions.find((v)=>{
      return v.name == ItemName;
    })
    if(isExist){
      return message.error('该表单项已被创建');
    };

    // const getFieldDecorator = formRef.current.getFieldDecorator;

    let options = {
      label: isShowInclude(itemKey) ? `${item.name}(${( isInclude == 0 ? '包含': '不包含')})` : item.name,
      name: ItemName,
      isInclude,
      itemRender:  getFieldDecorator => (
        <Row type="flex">
          <Col span={18}>
            {
              (itemKey >= 1 && itemKey <= 4) && 
              getModelSelect(formRef,ItemName,item.name,onOpenModal)
            }
            {itemKey == 5 && getContentNumber(formRef,ItemName)}
            {itemKey == 6 && getMediaWeight(getFieldDecorator,ItemName)}
            {itemKey == 7 && getMediaType(formRef,ItemName,mediaInfo, mediaInfoList)}
            {itemKey == 8 && getMediaClassify(formRef,ItemName)}
            {itemKey == 9 && getMediaAttr(getFieldDecorator,ItemName)}
            {itemKey == 10 && getMediaData(getFieldDecorator,ItemName)}
            {
              itemKey >= 11 && itemKey <= 14 && 
              getBreakRules(getFieldDecorator,ItemName,item.label)
            }
            {itemKey == 15 && getSpecificText(getFieldDecorator,ItemName)}
            {itemKey == 16 && getTimeLiness(getFieldDecorator,ItemName)}
            {itemKey == 17 && getAuditType(getFieldDecorator,ItemName)}
            { 
              (itemKey >= 18 && itemKey <= 19 )  && 
              getModelSelect(formRef,ItemName,item.name,onOpenModal)
            }
          </Col>
          <Col span={1}>
            <Button type='link' icon="delete" onClick={()=>delItemOption(ItemName)}>删除</Button>
          </Col>
        </Row>
      )
    }
    formOptions.push(options)
    setItemOptions([...formOptions])
  }

  /**删除创建的表单项*/ 
  const delItemOption = (name) =>{
    let arr = formOptions;
    arr.splice(arr.findIndex(item =>  item.name === name), 1);
    setItemOptions([...formOptions])
  }


  /**三级分类参数*/ 
  const moreSelectProps = {
    size: 'default',
    style: { width: '420px' },
    category, //分类
    firstCategory,
    secondCategory,
    thirdCategory,
    onSelect: (values) => {
      let arr = Object.values(values);
      arr = arr.filter((item,index)=>item != undefined)
      formRef.current.setFieldsValue({'category':arr.join('/')})
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

  /**表单参数*/ 
  const searchFormProps = {
    className: styles['form-contaner'],
    layout: 'horizontal',
    okText: "保存",
    dataSource: [
      {
        label: '业务线',
        type: 'SELECT',
        name:'bid',
        initialValue: '3001004',
        placeholder:'选择业务线',
        map: { '3001004': '聚合分发', key1: '选项1', key2: '选项2' }
      },
      {
        label: '内容类型',
        type: 'SELECT',
        name:'type',
        required: true,
        placeholder:'选择类型',
        map: { noraml: '图文', video: '视频', audio: '音频', images: '图集' }
      },
      { label: '队列名称', name: 'name', required: true,},
      {
        label: '对应分类',
        name:'category',
        itemRender: getFieldDecorator => (
          <div>
            {
              getFieldDecorator('category', {
                rules: [{ required: true, message: `请选择分类` }],
              })(<MoreSelect {...moreSelectProps}></MoreSelect>)
            }
          </div>
        )
      },
      {
        label: '规则配置',
        type: 'SELECT',
        name:'params5',
        placeholder:'选择状态',
        itemRender: getFieldDecorator => (
          <div  type="flex">
            {
              getFieldDecorator('params5', {
                rules: [{ required: true, message: `请选择` }],
              })(
                renderSelect(getRules(configRule), { 
                  style: {width: '160px'},
                  onChange: (e)=>{
                    // console.log('change',e);
                    setItemKey(e)
                  }
                })
              )
            }
            {
              isShowInclude(itemKey) && 
              getFieldDecorator('isInclude', {
                initialValue: 0
              })(
                <Select 
                  style={{width: '160px', marginLeft: '15px'}} 
                  onChange={(e)=>{ setInclude(e)}}
                >
                  <Option value={0}>包含</Option>
                  <Option value={1}>不包含</Option>
                </Select>
              )
            }
            <Button 
              type='link' 
              disabled={itemKey ==null || itemKey ==0} 
              onClick={()=>addItemOption(getRulesItem(itemKey,configRule), include)}
            >添加</Button>
          </div>
        )
      },
      ...itemOptions,
      {
        label: '队列机制',
        type: 'RADIO',
        name:'queueType',
        required: true,
        map: { 1: '免审', 2: '先发后审', 3: '先审后发'}
      },
      {
        label: '保存时长',
        type: 'RADIO',
        name:'keepDays',
        required: true,
        map: { 1: '1天', 3: '3天', 7: '7天', 15: '15天', 30: '30天', 60: '60天', 90: '90天' }
      },
    ],
    formValues: {
      ...art
    },
    onSearch: (formValues)=>{
      console.log('formValues', formValues)
    }
  }

  const refForm = null;

  // 打开模态框
  const onOpenModal = (name, label)=>{
    // 获取词库
    dispatch({
      type: 'QDetails/getDenyWords',
      payload: {
        type: getDenyWordsKey(label).key,
        id: formRef.current.getFieldValue('bid')
      },
    });
    // 临时保存已存在数据
    let oldData= formRef.current.getFieldValue(name) || [];

    setModalProps({
      name,
      title: label,
      handleSubmit: (name,data)=>{
        // 合并新老数据
        let newData = ExArray.listRemoveRepeat([...oldData, ...data]);
        // 设置form中的name数据
        let obj = {};
        obj[name]= newData;
        formRef.current.setFieldsValue(obj)
      }
    });
    rulesModal.current.setVisible(true)
  }

  // modal table配置项
  const ModalTableProps = {
    // 类型
    selectionType: 'checkbox', //checkbox or radio or null||false
    // 表头
    columns: [
      {
        title: 'id',
        dataIndex: 'id',
      },
      {
        title: '名称',
        align: 'center',
        dataIndex: 'word',
        render: text => <a>{text}</a>,
      },
    ],
    onPageChg: (page) => {
      // console.log(page)
      dispatch({
        type:'Methods/getDenyWords',
        payload:{
          pageNo: page.current,
          pageSize: page.pageSize
        }
      })
    },
    dataSource,
    pagination,
    ...modalProps
  }

  return (
    <PageLoading loading = {loading}>
      <div className={styles.container}>
        <BaseForm {...searchFormProps} wrappedComponentRef={formRef}></BaseForm>
        <ModalTable {...ModalTableProps} ref={rulesModal}></ModalTable>
      </div>
    </PageLoading>
  )
}

function mapStateToProps({User, Global, QDetails}){
  return {User, Global, QDetails}
}

export default Form.create({})(connect(mapStateToProps)(QueueDetails));