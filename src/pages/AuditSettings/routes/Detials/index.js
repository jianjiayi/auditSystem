/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-29 14:44:51
 * @LastEditTime: 2020-08-25 20:51:19
 */ 
import React, {useState, useEffect, useRef} from 'react';
import {message, Form, Select, Input, InputNumber, Button, Row, Col } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import debounce from 'lodash.debounce';
import { renderSelect } from '@components/BasicForm/BaseForm'; 
import { BaseForm, MoreSelect } from '@components/BasicForm';
import { ModalTable } from '@components/BasicTable';
import PageLoading from '@components/PageLoading';
import _ from 'lodash';

import {contentType} from '@config/constants';

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
  getAuditType,
  getSourceSelect
} from './option';

import { ExArray, ExObject } from '@utils/utils.js';

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
  // 表单按钮状态
  const [btnLoading, setBtnLoading] = useState(false);

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
      sourceList,
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
        id: location.query.id || '',
        action: location.query.action || ''
      },
      callback: ()=>{
        console.log('22222222111111111111111',art)
      }
    })

    return ()=>{
      formOptions =  [];//组件销毁时候，清空配置数组
    }
  }, [art, dispatch, location.query.action, location.query.id]);

  // 处理规则配置回显
  useEffect(()=>{
    insertForm(art.ruleJson);

    return ()=>{

    }
  },[art, insertForm])

  // 将创建配置规则嵌入Form里面
  const insertForm = (ruleJson) => {
    if(_.isEmpty(ruleJson)) return;

    let data = JSON.parse(ruleJson);
    for (let key in data){
      console.log(key)
      addItemOption(key)
    }
  }
  
  
  /**添加要创建的表单项*/ 
  const addItemOption = (item, isInclude) => {
    console.log(item)
    console.log('itemKey', isShowInclude(itemKey))
    
    let ItemName = isShowInclude(itemKey) ? `${item.id}_${isInclude == 0 ? 'in': 'notIn'}` : _.toString(item.id);
    
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
            {itemKey == 5 && getContentNumber(formRef,ItemName,[45,88])}
            {itemKey == 6 && getMediaWeight(formRef,ItemName,[4,9])}
            {itemKey == 7 && getMediaType(formRef,ItemName,mediaInfo, mediaInfoList)}
            {itemKey == 8 && getMediaClassify(formRef,ItemName)}
            {itemKey == 9 && getMediaAttr(getFieldDecorator,ItemName)}
            {itemKey == 10 && getMediaData(getFieldDecorator,ItemName)}
            {
              itemKey >= 11 && itemKey <= 14 && 
              getBreakRules(getFieldDecorator,ItemName,item.name)
            }
            {itemKey == 15 && getSpecificText(getFieldDecorator,ItemName)}
            {itemKey == 16 && getTimeLiness(getFieldDecorator,ItemName)}
            {itemKey == 17 && getAuditType(getFieldDecorator,ItemName)}
            { 
              (itemKey >= 18 && itemKey <= 19 )  && 
              getSourceSelect(formRef,ItemName,item.name,sourceList)
            }
          </Col>
          <Col span={1}>
            <Button type='link' icon="delete" onClick={()=>delItemOption(ItemName)}>删除</Button>
          </Col>
        </Row>
      )
    }
    console.log('222222222222')
    formOptions.push(options)
    console.log(formOptions)
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
    loading: btnLoading,
    dataSource: [
      {
        label: '业务线',
        type: 'SELECT',
        name:'bid',
        initialValue: ExObject.getFirstValue(business),
        placeholder:'选择业务线',
        map: business,
      },
      {
        label: '内容类型',
        type: 'SELECT',
        name:'type',
        required: true,
        placeholder:'选择类型',
        map: contentType
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
                initialValue: '无',
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
        // initialValue: art['queueType'].toString(),
        map: { 1: '先审后发', 2: '先发后审', 3: '免审' }
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
      ...art,
      queueType: art['queueType'] && art['queueType'].toString(),
      keepDays: art['queueType'] && art['keepDays'].toString(),
    },
    onSearch: (formValues)=>{
      // 整理配置规则
      let ruleJson = {};
      if(_.isEmpty(formOptions)){
        return message.error('请添加配置规则')
      }
      !_.isEmpty(formOptions) && formOptions.map((option, index) => {
        ruleJson[option.name] = formValues[option.name];
        delete formValues[option.name];
      })
      formValues.ruleJson = JSON.stringify(ruleJson);
      
      // 判断是否更新
      let  action= location.query.action || '';
      console.log('location.query.action',location.query.action)
      if(action != 'update'){
        console.log('action',action)
        delete formValues.id;
      }
      
      console.log('formValues', formValues);
      setBtnLoading(true);
      dispatch({
        type: 'QDetails/saveQueue',
        payload: formValues,
        callback: (res) => {
          if(res != 200){
            setBtnLoading(false);
            return
          }

          router.push({pathname:'/setting'});
        }
      })
    }
  }
  

  // 打开模态框
  const onOpenModal = (name, label)=>{
    // 获取词库
    dispatch({
      type: 'QDetails/getDenyWords',
      payload: {
        type: getDenyWordsKey(label).key,
        bid: formRef.current.getFieldValue('bid')
      },
    });
    // 临时保存已存在数据
    let oldData= formRef.current.getFieldValue(name) || [];
    console.log(oldData)

    setModalProps({
      name,
      title: label,
      handleSubmit: (name,data)=>{
        console.log(name,data)
        // 合并新老数据
        let newData = ExArray.listRemoveRepeat([...oldData, ...data]);
        console.log('newData',newData)
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
    // selectedRowKeys: formRef.current.getFieldValue('1') || [],
    dataSource,
    // pagination,
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