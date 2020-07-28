/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-06 09:48:30
 * @LastEditTime: 2020-07-28 09:16:36
 */ 
import React, { useRef } from 'react';
import { connect } from 'dva';
import { Button} from 'antd';
import classNames from 'classnames';
import SectionCover from './sectionCover';
import SectionInfo from './sectionInfo';
import SectionAction from './sectionAction';

import styles from './index.module.less';

function Operate(props) {
  const coverRef = useRef();
  const actonRef = useRef();
  const {className, curArt={}} = props;

  const handleSubmit = () => {
    let cover = coverRef.current;
    console.log('cover', cover)
    let current = actonRef.current
    current.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        return values;
      }
    });
    // console.log(current)
  };

  const sectionImgProps = {
    ref: coverRef,
    className: styles.section,
  }

  const sectionInfoProps = {
    className: styles.section,
  }
  
  const sectionActionProps = {
    ref: actonRef,
    className: styles.section,
  }
  return (
    <div className={classNames(className, styles.container)}>
      <SectionCover {...sectionImgProps}></SectionCover>
      <SectionInfo {...sectionInfoProps}></SectionInfo>
      <SectionAction {...sectionActionProps}></SectionAction>
      
      <div className={styles['button-group']}>
        <Button type="primary" onClick={()=>handleSubmit()}>确定</Button>
        <Button onClick={()=>handleSubmit()}>跳过</Button>
        <Button type="primary" ghost onClick={()=>handleSubmit()}>退出</Button>
      </div>
    </div>
  )
}

function mapStateToProps({CDetails}){
  return {CDetails}
}

export default connect(mapStateToProps)(Operate);
