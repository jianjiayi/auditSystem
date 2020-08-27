/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-09 09:41:19
 * @LastEditTime: 2020-08-26 18:40:24
 */
import React, {useState, useEffect, useImperativeHandle, forwardRef, useRef} from 'react';
import {Modal, Radio, Button, Icon} from 'antd';
import classNames from 'classnames';
import _ from 'lodash';
// 图片懒加载
import LazyImgComponent from '@components/LazyImgComponent';
import UploadCoverImg from '@components/UploadCoverImg';

import styles from './index.module.less';

function ButonCoverImg(props, ref) {
  const uploadCoverModal = useRef(null);
  const [visible, setVisible] = useState(false);// modal状态
  const [dataList, setDataList] = useState([]); //封面图存贮
  const [coverType, setCoverType] = useState(props.type || 3); //1：单图。3：三图
  // 当期选中图片key
  const [indexKey, setIndexKey] = useState(null);
  
  
  const {
    title, 
    fileList, 
    disabled, 
    dispatch,
    setCoverImages=()=>{}, 
    ...rest
  } = props;


  useEffect(() =>{
    setDataList(fileList);
  }, [fileList]);

  useEffect(() =>{
    if(coverType == 3){
      setDataList(fileList);
    }else{
      setDataList([fileList[0]]);
    }
  }, [coverType, fileList])

  // 向父组件暴露的方法
  useImperativeHandle(ref, () => {
    return {
      setVisible, //设置modal状态
    }
  })
  
  const modalProps = {
    title,
    visible,
    centered: true,
    okText: "确认",
    cancelText: "取消",
    onOk: () =>{
      // console.log(dataList)
      setCoverImages(dataList);
      setVisible(false)
    },
    onCancel: () =>{setVisible(false)},
    ...rest,
  }
  const buttonProps = {
    className: styles.btn,
    size: "small",
    disabled, 
    onClick: () => {setVisible(!visible)}
  }

  const UploadCoverImgProps = {
    maxLength: 1,
    upload: {
      fileList,
      acceptType: ["jpg","png","jpeg","gif"],
      maxFileSize: 5,
      successUpload: (data) => {
        console.log(data)
        let src = data[0].response.data.fileUrl;
        console.log(src)
         let List = _.cloneDeep(dataList);
        List.splice(indexKey,1, src);
        setDataList(List);
        console.log('success')
      }
    },
    getImages: (src) =>{
      let List = _.cloneDeep(dataList);
      List.splice(indexKey,1, src[0]);
      setIndexKey(null);
      setDataList(List);
    }
  }

  // 打开前上传图片modal
  const openUploadModal = (index, item) => {
    setIndexKey(index);
    dispatch({
      type:'Images/save',
      payload:{
        visible: true
      }
    })
  }



  return (
    <div>
      <Button {...buttonProps}>{title}</Button>
      <Modal {...modalProps}>
        <div className={styles.header}>
          <Radio.Group onChange={(e)=>{setCoverType(e.target.value)}} value={coverType}>
            <Radio value={1}>单图</Radio>
            <Radio value={3}>三图</Radio>
          </Radio.Group>
        </div>
        <div className={styles['img-container']}>
          <ul className={styles['img-list']}>
            {
              dataList.length > 0 && dataList.map((item, index) =>{
                return <li className={`${styles.item}`} key = {index} onClick={()=>openUploadModal(index,item)}>
                  <img 
                    src = {item}
                    className = {styles['img-item']}/>
                </li>
              })
            }
          </ul>

          {/* 修改封面组件 */}
          <UploadCoverImg {...UploadCoverImgProps}>
            {/* {
              coverType !== fileList.length && 
              <div 
                className="ant-upload ant-upload-select ant-upload-select-picture-card" 
                onClick={()=>{
                  dispatch({
                    type:'Images/save',
                    payload:{
                      visible: true
                    }
                  })
                }}
              >
                <span tabIndex="0" className="ant-upload" role="button">
                  <div>
                    <Icon type="plus" />
                    <div className="ant-upload-text">选择图片</div>
                  </div>
                </span>
              </div>
            } */}
          </UploadCoverImg>
        </div>
      </Modal>
    </div>
  )
}

ButonCoverImg = forwardRef(ButonCoverImg)

export default ButonCoverImg;
