/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-06 09:48:30
 * @LastEditTime: 2020-08-26 19:07:02
 */ 
import React, {useState, useImperativeHandle, forwardRef, useRef} from 'react';
import {Modal, Button} from 'antd';
import classNames from 'classnames';
// 图片懒加载
import LazyImgComponent from '@components/LazyImgComponent';
import ButtonImgModal from '@components/ButtonImgModal';
import ButtonMobilePreview from '@components/ButtonMobilePreview';
import ButonCoverImgModal from '@components/ButonCoverImgModal';

import styles from './index.module.less';

function SectionCover(props, ref) {
  const coverModal = useRef(null);
  const [coverImg, setCoverImg] = useState('');
  
  const {
    className, 
    curArt,
    dispatch,
  } = props;
  // 向父组件暴露的方法
  useImperativeHandle(ref, () => {
    return coverImg
  })

  const imgSrc = 'https://test-crawler.oss-cn-beijing.aliyuncs.com/image/202008/25/b2f9f9437d028502/8d06df607838f37e3e7f2d0ed7ac44f0.png'
  // 三图
  const coverImgProps = {
    title: '三图',
    okText: "修改封图",
    disabled: false,
    dataList: [
      {
        image: imgSrc
      }
    ],
    handleOk: () =>{
      // 打开修改封面图
      coverModal.current.setVisible(true)
    },
  }

  // 修改封面图
  const ChangeImgModalProps = {
    title: '修改封面图',
    fileList: [imgSrc, imgSrc, imgSrc],
    dispatch,
    setCoverImages: (data)=>{
      console.log(data)
      setCoverImg(data)
    }
  }

  // 正文全图
  const contentImgsProps = {
    title: '正文全图',
    footer: null,
     dataList: [
      {
        image: imgSrc
      },
      {
        image: imgSrc
      },
      {
        image: imgSrc
      }
    ],
  }

  // 预览效果
  const MobilePreviewProps = {
    title: '预览效果',
    footer: null,
    width: 420,
    curArt,//当前文章
  }

  return (
    <div className={classNames(className,styles['section1'])}>
      <div className={styles['cover-img']}>
        <img  src = {imgSrc}></img>
      </div>
      <div className={styles['button-box']}>
        <ButtonImgModal {...coverImgProps}></ButtonImgModal>
        <ButonCoverImgModal {...ChangeImgModalProps} ref={coverModal}></ButonCoverImgModal>
        <ButtonImgModal {...contentImgsProps}></ButtonImgModal>
        <ButtonMobilePreview {...MobilePreviewProps}></ButtonMobilePreview>
      </div>
    </div>
  )
}

SectionCover = forwardRef(SectionCover)

export default SectionCover;
