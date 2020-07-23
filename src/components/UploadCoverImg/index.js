/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-06 09:17:06
 * @LastEditTime: 2020-07-09 15:25:54
 */ 
import React, {useState, useImperativeHandle, forwardRef} from 'react';
import {Modal, Tabs, Upload,Pagination, message, Button, Icon} from 'antd';
import { UPLOAD_FILE_URL } from '@config/constants.js';
import LazyImgComponent from '@components/LazyImgComponent';
import styles from './index.module.less';

const { Dragger } = Upload;
const { TabPane } = Tabs;

function UploadCoverImg(props, ref) {
  const [fileList, setFileList] = useState(props.upload.fileList || []);
  const [visible, setVisible] = useState(false);// modal状态

  // 向父组件暴露的方法
  useImperativeHandle(ref, () => {
    return {
      setVisible, //设置modal状态
    }
  })
  
  const {
    maxLength, 
    upload:{ acceptType, maxFileSize, successUpload}, 
    imagesData:{dataSource, doubleClickImage, pagination}, 
    ...rest
  } = props;
  
  const modalProps = {
    width: 900,
    visible,
    centered: true,
    okText: "确认",
    cancelText: "取消",
    // onOk: () =>{this.handleOk},
    onCancel: () =>{setVisible(false)},
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
    showUploadList: false,
    action: UPLOAD_FILE_URL,
    beforeUpload,
    onChange: (info) => {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        // message.success(`${info.file.name} file uploaded successfully.`);
        successUpload(info.fileList)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  }

  const paginationProps = {
    size: "small", 
    showSizeChanger: true,
    defaultCurrent: 2,
    total: 500,
    ...pagination,
  }


  return (
    <div>
      {props.children}
      <Modal {...modalProps}>
        <Tabs type="card">
        
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
            <ul className={styles['img-container']}>
              {
                dataSource.length > 0 && dataSource.map((item, index) =>{
                  return <li className={styles.item} key = {index} onDoubleClick={()=>doubleClickImage(item)}>
                    <LazyImgComponent 
                      src = {item.image}
                      className = {styles['img-item']}>
                    </LazyImgComponent>
                  </li>
                })
              }
            </ul>
            <Pagination {...paginationProps}/>
          </TabPane>
        </Tabs>
      </Modal>
    </div>
  )
}

UploadCoverImg = forwardRef(UploadCoverImg);

export default UploadCoverImg;
