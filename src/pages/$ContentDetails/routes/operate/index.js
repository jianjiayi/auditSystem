/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-06 09:48:30
 * @LastEditTime: 2020-08-24 15:58:58
 */ 
import React, { useRef } from 'react';
import { connect } from 'dva';
import {message, Modal, Button} from 'antd';
import classNames from 'classnames';

import SectionCover from './sectionCover';
import SectionInfo from './sectionInfo';
import SectionAction from './sectionAction';

import styles from './index.module.less';

import wrapAuth from '@components/WrapAuth';
const AuthButton = wrapAuth(Button);

const { confirm } = Modal;

function Operate(props) {
  const {
    history,
    className, 
    CDetails, 
    Global,
    dispatch
  } = props;
  console.log(props)

  const { curArt, isEdit, category, queueContentId } = CDetails

  const coverRef = useRef(null);
  const actonRef = useRef(null);

  const sectionImgProps = {
    curArt,
    dispatch,
    ref: coverRef,
    className: styles.section,
  }

  const sectionInfoProps = {
    curArt,
    dispatch,
    className: styles.section,
  }
  
  const sectionActionProps = {
    curArt,
    category,
    Global,
    dispatch,
    ref: actonRef,
    className: styles.section,
  }

  // 审核操作
  const auditSubmit = () => {
    if(isEdit){
      return message.error('左侧内容区域正处于编辑状态，请保存，或取取消编辑');
    }
    let cover = coverRef.current;
    console.log('cover', cover)
    let current = actonRef.current
    current.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        // 处理大事件和热点
        values['hotValue'] = values.hotValue[0];
        values['bigEvent'] = values.bigEvent[0];
        // 处理分类
        values['categoryIds'] = [values.category];
        delete values.category;
        // 处理标签

        // 处理审核结果

        console.log(values)
        
        dispatch({
          type: 'CDetails/getNewsSkip',
          payload: {}
        })
      }
    });
  }


  // 跳过操作
  const skipNowContent = () =>{
    dispatch({
      type: 'CDetails/getNewsSkip',
      payload: {
        data: {
          id: queueContentId
        }
      }
    })
  }

  // 退出操作
  const exitQueue = () => {
    confirm({
      title: '温馨提示',
      content: '确定退出吗',
      onOk() {
        console.log('OK');
        dispatch({
          type: 'CDetails/getNewsExit',
          payload: {},
          callback: () => {
            history.goBack()
          }
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
    
  }

  return (
    <div className={classNames(className, styles.container)}>
      <SectionCover {...sectionImgProps}></SectionCover>
      <SectionInfo {...sectionInfoProps}></SectionInfo>
      <SectionAction {...sectionActionProps}></SectionAction>
      
      <div className={styles['button-group']}>
        <AuthButton perms={'news:audit'} type="primary" onClick={()=>auditSubmit()}>确定</AuthButton>
        <AuthButton perms={'news:skip'} onClick={()=>skipNowContent()}>跳过</AuthButton>
        <Button type="primary" ghost onClick={()=>exitQueue()}>退出</Button>
      </div>
    </div>
  )
}

function mapStateToProps({Global, CDetails}){
  return {Global, CDetails}
}

export default connect(mapStateToProps)(Operate);
