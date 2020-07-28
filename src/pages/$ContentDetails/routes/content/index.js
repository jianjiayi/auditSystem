/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-06 09:48:30
 * @LastEditTime: 2020-07-28 09:21:04
 */ 
import React, {useState} from 'react';
import { connect } from 'dva';
import classNames from 'classnames';
import {Form, Input, DatePicker, Button, Row, Col,} from 'antd';
import {Audio, Video } from '@components/Media';
import Ueditor from '@components/Editor';
import styles from './index.module.less';

const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 14
  }
};
const layout1 = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 16
  }
};
const formItemLayout = {
  labelAlign: 'left',
  labelCol: { span: 2 },
  wrapperCol: { span: 12 },
};

function Content(props) {
  const [isEdit, setIsEdit] = useState(false);
  const {className, CDetails, form: {getFieldDecorator}} = props;
  console.log(props)
  const { curArt } = CDetails

  const onChange = (val)=>{
    if(!val){
      setIsEdit(!val)
    }else{
      // 确定修改
    }
  }

  // 表头
  const getHaderTpl = () => {
    return (
      <div className={styles.header}>
        <div className={styles['form-box']}>
          <Form.Item label="标题">
            {getFieldDecorator('title', {
                initialValue: curArt.title
            })(
                isEdit? <Input placeholder="请输入标题"/> :
                <h2 className={styles.title}>测试文章测试文章</h2>
            )}
          </Form.Item>
          <Form.Item label="ID">
            {getFieldDecorator('id', {
                initialValue: curArt.id
            })(
                <span>123456789</span>
            )}
          </Form.Item>
          <Row>
            <Col span={6}>
              <Form.Item label="来源" {...layout}>
                {getFieldDecorator('source', {
                    initialValue: curArt.source
                })(
                    isEdit? <Input placeholder="请输入来源"/> :
                    <span className={styles.title}>人民网</span>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="时间" {...layout1}>
                {getFieldDecorator('date', {
                    initialValue: curArt.date
                })(
                    isEdit? <DatePicker showTime format={dateFormat}/> :
                    <span className={styles.title}>2020-07-06  14:01:53</span>
                )}
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div className={styles['button-box']}>
          <Button type="primary" size="small" onClick={()=>onChange(isEdit)}>{!isEdit ? '修改' : '确定'}</Button>
          {isEdit && <Button size="small" onClick={()=>{setIsEdit(!isEdit)}}>取消</Button>}
        </div>
      </div>
    )
  }

  // 正文
  const textHtml = {__html:curArt.text};
  const audioProps = {};
  const videoProps = {};
  const getContentTpl = () => {
    return (
      <div className={styles['content-text']}>

        {/* {curArt.type !== 'audio' && <Audio {...audioProps}></Audio>}

        {curArt.type !== 'video' && <Video {...videoProps}></Video>} */}

        {
          curArt.type !== '' && 
          <div className="">
            <div style={{'display': isEdit ? 'block' : 'none'}}>
              <Ueditor initialContent={curArt.text}></Ueditor>
            </div>
            {
              !isEdit && <div dangerouslySetInnerHTML={textHtml}></div>
            }
          </div>
        }
      </div>
    )
  }


  return (
    <Form {...formItemLayout} className={classNames(className, styles.container)}>
      {getHaderTpl()}
      {getContentTpl()}
    </Form>
  )
}

function mapStateToProps({CDetails}){
  return {CDetails}
}

export default Form.create({})(connect(mapStateToProps)(Content))
