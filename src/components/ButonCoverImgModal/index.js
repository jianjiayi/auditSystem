/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-09 09:41:19
 * @LastEditTime: 2020-07-09 16:50:28
 */
import React, {useState, useImperativeHandle, forwardRef, useRef} from 'react';
import {Modal, Radio, Button, Icon} from 'antd';
import classNames from 'classnames';
// 图片懒加载
import LazyImgComponent from '@components/LazyImgComponent';
import UploadCoverImg from '@components/UploadCoverImg';

import styles from './index.module.less';

function ButonCoverImg(props, ref) {
  const uploadCoverModal = useRef(null);
  const [visible, setVisible] = useState(false);// modal状态
  const [coverType, setCoverType] = useState(props.type || 3); //1：单图。3：三图
  const {
    title, 
    fileList, 
    disabled, 
    onChangeDel=()=>{}, 
    ...rest
  } = props;

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
    // onOk: () =>{this.handleOk},
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
    maxLength: 3,
    upload: {
      fileList,
      acceptType: ["jpg","png","jpeg","gif"],
      maxFileSize: 5,
      successUpload: () => {console.log('success')}
    },
    imagesData: {
      dataSource: [],
      doubleClickImage: (item) => {
        console.log(item)
      },
      pagination: {
        defaultCurrent: 1,
        total: 500,
        onChange: (value)=>{console.log(value)}
      },
    }
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
              fileList.length > 0 && fileList.map((item, index) =>{
                return <li className={styles.item} key = {index}>
                  <LazyImgComponent 
                    hover = {true}
                    src = {item.image}
                    onDelete = {()=> onChangeDel(index, item)}
                    className = {styles['img-item']}>
                  </LazyImgComponent>
                </li>
              })
            }
          </ul>

          {/* 修改封面组件 */}
          <UploadCoverImg {...UploadCoverImgProps} ref={uploadCoverModal}>
            {
              coverType !== fileList.length && 
              <div 
                className="ant-upload ant-upload-select ant-upload-select-picture-card" 
                onClick={()=>{uploadCoverModal.current.setVisible(true)}}>
                <span tabIndex="0" className="ant-upload" role="button">
                  <div>
                    <Icon type="plus" />
                    <div className="ant-upload-text">选择图片</div>
                  </div>
                </span>
              </div>
            }
          </UploadCoverImg>
        </div>
      </Modal>
    </div>
  )
}

ButonCoverImg = forwardRef(ButonCoverImg)

export default ButonCoverImg;
