/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-08-20 10:33:16
 * @LastEditTime: 2020-08-20 14:44:42
 */
import React, {useState, useEffect, useImperativeHandle, forwardRef} from 'react';
import {Modal, List} from 'antd';
import _ from 'lodash';

import {getRulesItem, getRules, getDenyWordsKey, isShowInclude} from '../../Detials/config';

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

let formOptions = []

function ViewRules(props, ref) {
  // modal状态
  const [visible, setVisible] = useState(false);
   // 动态表单项数组
  const [itemOptions, setItemOptions] = useState([]);
  const {rulesJson, configRule, mediaInfo, mediaInfoList, ...rest} = props;

  // 向父组件暴露的方法
  useImperativeHandle(ref, () => {
    return {
      setVisible, //设置modal状态
    }
  })
  
  const modalProps = {
    title: '查看队列规则',
    visible,
    centered: true,
    okText: "确认",
    cancelText: "取消",
    ...rest,
    destroyOnClose: true,
    // onOk: () =>{this.handleOk},
    onCancel: () =>{setVisible(!visible)},
  }


  // 处理规则配置回显
  useEffect(()=>{
    insertForm(rulesJson);
    return ()=>{
      formOptions = []
    }
  },[insertForm, rulesJson])

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
    console.log('item',item)
    console.log('itemKey', isShowInclude(itemKey))
    
    let ItemName = isShowInclude(itemKey) ? `${item.id}_${isInclude == 0 ? 'in': 'notIn'}` : _.toString(item.id);
    // const getFieldDecorator = formRef.current.getFieldDecorator;

    let options = {
      label: isShowInclude(itemKey) ? `${item.name}(${( isInclude == 0 ? '包含': '不包含')})` : item.name,
      name: ItemName,
      isInclude,
      itemRender: <span>
        {
          (itemKey >= 1 && itemKey <= 4) && 
          getModelSelect(values)
        }
        {itemKey == 5 && getContentNumber(values)}
        {itemKey == 6 && getMediaWeight(values)}
        {itemKey == 7 && getMediaType(mediaInfo, mediaInfoList, values)}
        {itemKey == 8 && getMediaClassify( values)}
        {itemKey == 9 && getMediaAttr(values)}
        {itemKey == 10 && getMediaData(values)}
        {
          itemKey >= 11 && itemKey <= 14 && 
          getBreakRules(item.name)
        }
        {itemKey == 15 && getSpecificText(values)}
        {itemKey == 16 && getTimeLiness(values)}
        {itemKey == 17 && getAuditType(values)}
        { 
          (itemKey >= 18 && itemKey <= 19 )  && 
          getSourceSelect(values)
        }
      </span>
    }
    
    formOptions.push(options)
    setItemOptions([...formOptions])
  }


  return (
    <div>
      <Modal {...modalProps}>
        <List
          itemLayout="horizontal"
          dataSource={itemOptions}
          renderItem={item => (
            <List.Item>
              <div className={styles.item}>
                <span className={styles.label}>{item.label} : </span>
                <div className={styles.values_text}>{item.itemRender}</div>
              </div>
            </List.Item>
            )}
        />
      </Modal>
    </div>
  )
}

ViewRules = forwardRef(ViewRules);

export default ViewRules
