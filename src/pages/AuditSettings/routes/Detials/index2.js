/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-29 14:44:51
 * @LastEditTime: 2020-08-19 21:57:53
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
let itemKey = null;


function QueueDetails(props) {
  const formRef = useRef(null);
  const rulesModal = useRef(null);
  // 创建key
  // const [itemKey, setItemKey] = useState(null);
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
      formOptions = []
      setItemOptions([]);//组件销毁时候，清空配置数组
    }
  }, [art, dispatch, location.query.action, location.query.id]);

  // 处理规则配置回显
  useEffect(()=>{
    insertForm(art.ruleJson);

    return ()=>{
      formOptions = []
    }
  },[art, insertForm])

  // 将创建配置规则嵌入Form里面
  const insertForm = (ruleJson) => {
    formOptions = []
    if(_.isEmpty(ruleJson)) return;

    let data = JSON.parse(ruleJson);
    console.log(data)
    for (let key in data){
      console.log(key)
      let keyArr = key.split("_");
      // console.log('include',keyArr)
      
      let iKey = keyArr[0];
      
      
      if(keyArr.length>1){
        let include = keyArr[1] == 'in' ? 0 : 1;
        // console.log('configRule', configRule)
        console.log('keyArr[0]',iKey)
        addItemOption(iKey, getRulesItem(iKey, configRule), include, data[key])
      }else{
        addItemOption(iKey, getRulesItem(iKey, configRule), 0, data[key])
      }
      
    }
  }
  
  
  /**添加要创建的表单项*/ 
  const addItemOption = (itemKey, item, isInclude, values='') => {
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
        <Row key={itemKey} type="flex">
          <Col span={18}>
            {
              (itemKey >= 1 && itemKey <= 4) && 
              getModelSelect(formRef,ItemName,item.name,onOpenModal, values)
            }
            {itemKey == 5 && getContentNumber(formRef,ItemName,values)}
            {itemKey == 6 && getMediaWeight(formRef,ItemName,values)}
            {itemKey == 7 && getMediaType(formRef,ItemName,mediaInfo, mediaInfoList, values)}
            {itemKey == 8 && getMediaClassify(formRef,ItemName, values)}
            {itemKey == 9 && getMediaAttr(getFieldDecorator,ItemName, values)}
            {itemKey == 10 && getMediaData(getFieldDecorator,ItemName, values)}
            {
              itemKey >= 11 && itemKey <= 14 && 
              getBreakRules(getFieldDecorator,ItemName,item.name, values)
            }
            {itemKey == 15 && getSpecificText(getFieldDecorator,ItemName, values)}
            {itemKey == 16 && getTimeLiness(getFieldDecorator,ItemName, values)}
            {itemKey == 17 && getAuditType(getFieldDecorator,ItemName, values)}
            { 
              (itemKey >= 18 && itemKey <= 19 )  && 
              getSourceSelect(formRef,ItemName,item.name,sourceList, values=null)
            }
          </Col>
          <Col span={1}>
            <Button key={ItemName} type='link' icon="delete" onClick={()=>delItemOption(ItemName)}>删除</Button>
          </Col>
        </Row>
      )
    }
    
    formOptions.push(options)
    setItemOptions([...formOptions])
  }

  /**删除创建的表单项*/ 
  const delItemOption = (name) =>{
    
    let remoteItem = formOptions.find(item =>  item.name == name);
    console.log('remoteItem',remoteItem)
    _.pull(formOptions, remoteItem);
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
        map: { 1: '图文', 2: '视频', 3: '音频', 4: '图集' }
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
        initialValue: '无',
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
                    itemKey = e
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
              onClick={()=>addItemOption(itemKey, getRulesItem(itemKey,configRule), include)}
            >添加</Button>
          </div>
        )
      },
      ...formOptions,
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
      category: _.cloneDeep(art['category']),
      queueType: _.toString(art['queueType']),
      keepDays: _.toString(art['keepDays']),
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
      
      console.log('formValues', formValues)
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