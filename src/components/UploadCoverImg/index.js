/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-06 09:17:06
 * @LastEditTime: 2020-08-26 19:04:22
 */ 
import React, {useState, useEffect} from 'react';
import {Modal, Tabs, Upload,Pagination, Radio, Checkbox, message, Button, Icon} from 'antd';

import { connect } from 'dva';

import { UPLOAD_FILE_URL } from '@config/constants.js';
import PageLoading from '@components/PageLoading';
import LazyImgComponent from '@components/LazyImgComponent';

import styles from './index.module.less';

const { Dragger } = Upload;
const { TabPane } = Tabs;

function UploadCoverImg(props, ref) {
  const [tabsKey, setTabsKey] = useState('1');
  const [fileList, setFileList] = useState([]);
  const [imageList, setImageList] = useState([]);
  const {
    dispatch, 
    maxLength, 
    Images:{
      visible,
      loading,
      dataSource,
      pagination,
    },
    upload:{ acceptType, maxFileSize, successUpload}, 
    getImages, 
    ...rest
  } = props;

  useEffect(()=>{
    if(visible){
      dispatch({
        type: 'Images/getAuditImages',
        payload: {}
      })
    }
  },[dispatch, visible])
  
  const modalProps = {
    width: 900,
    visible,
    centered: true,
    okText: "确认",
    cancelText: "取消",
    destroyOnClose: true,
    onOk: () =>{
      if(tabsKey == '1'){ //本地上传
        if(fileList.length == 0){
          return message.error(`请上传图片`);
        }
        getImages(fileList);
      }else{  //媒体库选择
        if(imageList.length == 0){
          return message.error(`请上传图片`);
        }
        getImages(imageList)
      }
      
      dispatch({
        type: 'Images/reset',
        payload:{}
      })
    },
    onCancel: () =>{
      dispatch({
        type: 'Images/reset',
        payload:{}
      })
    },
    ...rest,
  }

  // 上传文件校验
  const beforeUpload = (file) => {
    if(!acceptType) return true;
      let reg = new RegExp("\.(" + acceptType.join("|") + ")$", "i");
      if (reg.test(file.type)) {
        console.log(file.size / 1024 / 1024)
        if(!maxFileSize) return true;

        if (file.size / 1024 / 1024 <= maxFileSize) {
          return true;
        } else {
          message.error(`上传文件大小不能超过${maxFileSize}M`);
          return false;
        }
      } else {
        message.error(`文件类型只支持${acceptType.join(',')}类型`);
        return false;
      }
  }

  const uploadProps = {
    name: 'file',
    multiple: true,
    showUploadList: true,
    action: UPLOAD_FILE_URL,
    beforeUpload,
    onRemove: file => {
      console.log(file)
      setFileList([]);
    },
    onChange: (info) => {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        setFileList([info.file.response.data.fileUrl]);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  }

  // 分页组件
  const paginationProps = {
    size: "small", 
    ...pagination,
    onShowSizeChange: (current, pageSize)=>{
      dispatch({
        type: 'Images/getAuditImages',
        payload:{
          pageNo: current,
          pageSize: pageSize,
        }
      })
    },
    onChange: (page) => {
      dispatch({
        type: 'Images/getAuditImages',
        payload:{
          pageNo: page,
          pageSize: pagination.pageSize,
        }
      })
    },
  }

  // 选择图片
  const onChangeImage = (e) =>{
    // console.log(e.target.value)
    setImageList([e.target.value])
  }


  return (
    <div>
      {props.children}
      <Modal {...modalProps}>
        <Tabs type="card" onChange={(key)=>{setTabsKey(key)}}>
        
          <TabPane tab="本地上传" key="1">
            <Dragger {...uploadProps}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">拖拽到此处上传</p>
              <p className="ant-upload-hint">
                {`文件类型只支持${acceptType.join(',') || 'jpg'}类型, 上传文件大小不能超过${maxFileSize || 3}M`}
              </p>
            </Dragger>
          </TabPane>

          <TabPane tab="媒体库选择" key="2">
            <Radio.Group onChange={onChangeImage}>
              <ul className={styles['img-container']}>
                  {
                    dataSource.length > 0 && dataSource.map((item, index) =>{
                      return <li className={styles.item} key = {item.id}>
                        <img 
                          src = {item.image_url}
                          className = {styles['img-item']}/>
                          <Radio className={styles.selectbtn} value={item.image_url}></Radio>
                      </li>
                    })
                  }
              </ul>
            </Radio.Group>
            <div className={styles.pagination}>
              <Pagination {...paginationProps}/>
            </div>
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  )
}

// UploadCoverImg = forwardRef(UploadCoverImg);

function mapStateToProps({Images}){
  return {Images}
}

export default connect(mapStateToProps)(UploadCoverImg);
