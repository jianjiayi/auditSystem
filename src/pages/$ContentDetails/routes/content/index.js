/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-06 09:48:30
 * @LastEditTime: 2020-08-10 09:44:08
 */ 
import React, {useState, useEffect, useRef} from 'react';
import { connect } from 'dva';
import classNames from 'classnames';
import {Form, Input, DatePicker, Button, Row, Col,} from 'antd';
import moment from 'moment';
import _ from 'lodash';

import {AudioPlayer, VideoPlayer } from '@components/Media';
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
  const {className, CDetails, form: {getFieldDecorator, validateFields}, dispatch} = props;
  console.log(props)
  const { curArt } = CDetails;
  
  // 临时保存编辑器修改后的文章详情
  const [editorText, setEditorText] = useState(curArt.text || '');


  // 保存函数
  const handelSaveArt = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        values.text  = editorText;
        dispatch({
          type: '',
          payload: {
            
          }
        })
      }
    });
  }

  // 表头
  const getHaderTpl = () => {
    return (
      <div className={styles.header}>
        <div className={styles['form-box']}>
          <Form.Item label="标题">
            {getFieldDecorator('title', {
              initialValue: curArt.title,
              rules: [{ required: true, message: `请输入标题` }],
            })(
              isEdit? <Input placeholder="请输入标题"/> :
              <h2 className={styles.title}>{curArt.title}</h2>
            )}
          </Form.Item>
          <Form.Item label="ID">
            {getFieldDecorator('id', {
              initialValue: curArt.cardId,
              rules: [{ required: true}],
            })(
              <span>{curArt.cardId}</span>
            )}
          </Form.Item>
          <Row>
            <Col span={6}>
              <Form.Item label="来源" {...layout}>
                {getFieldDecorator('source', {
                  initialValue: curArt.source,
                   rules: [{ required: true, message: `请输入来源` }],
                })(
                  isEdit? <Input placeholder="请输入来源"/> :
                  <span className={styles.title}>{curArt.source}</span>
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="时间" {...layout1}>
                {getFieldDecorator('date', {
                  initialValue: moment(curArt.pubTime),
                  rules: [{ required: true, message: `请选择时间` }],
                })(
                  isEdit? <DatePicker showTime format={dateFormat}/> :
                  <span className={styles.title}>{curArt.pubTime}</span>
                )}
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div className={styles['button-box']}>
          {!isEdit && <Button type="primary" size="small" onClick={()=>{setIsEdit(!isEdit)}}>修改</Button>}
          {isEdit && 
            <div className={styles['button-group']}>
              <Button type="primary" size="small" type="primary" htmlType="submit">确定</Button>
              <Button size="small" onClick={()=>{setIsEdit(!isEdit)}}>取消</Button>
            </div>
          }
        </div>
      </div>
    )
  }

  /**
   * @name: 高亮单词
   * @test: test font
   * @msg: 
   * @param {string, object} 
   * @return {string} 
   */
  const getContentHtml = (textHtml, List) =>{
    // let textHtml = _.cloneDeep(html);
    if(!textHtml) return;

    List.forEach((item, index) => {
      if (item.value.length > 0) {
        let data = item.value.split(',');
        // 模糊匹配修改样式
        data.map((v, i) => {
          let reg = "/" + v + "/g";
          textHtml = textHtml.replace(
            eval(reg),
            '<span style="background:' +
              item.color +
              ';color:#ffffff;padding:0 5px;margin:0 2px;">' +
              v +
              "</span>"
          );
        });
      }
    });
    return textHtml;
  }

  const list = [
    {
      name: 'hot',
      color: '#000000',
      value: '据路透,微软,TikTok,美国'
    }
  ]

  // 正文
  const textHtml = {__html:getContentHtml(curArt.text,list)};
  const UeditorProps = {
    initialContent: curArt.text || '',
    onContentChange: (values) => {
      // console.log(values)
      setEditorText(values);
    }
  }
  // 音频
  const audioProps = {};
  // 视频
  const videoProps = {
    source: 'http://luckyvideo.peopletech.cn/production/mp4/20200603/lucky_cms05b31d0f-82c1-4273-a4c5-02f01e2fad9b.mp4',
    poster: 'http://luckyimgs.peopletech.cn/image/20200603/ZXB-ORIGIN-4364976/lucky_cms57e028c6-8302-42e5-9c86-53786b27703d.jpg',
    duration: '02:15',
  };
  
  
  const getContentTpl = () => {
    return (
      <div className={styles['content-container']}>

        {curArt.type == '4' && <AudioPlayer {...audioProps}></AudioPlayer>}

        {curArt.type == '3' && 
          <div>
            <h2 className={styles.title}>视频详情 : </h2>
            <VideoPlayer {...videoProps}></VideoPlayer>
          </div>
        }

        {
          curArt.type == '2' && 
          <div className="">
            <h2 className={styles.title}>文章详情 : </h2>
            {isEdit && <div><Ueditor {...UeditorProps}></Ueditor></div>}
            {!isEdit && 
              <div className={styles['content-box']}>
                <div className={styles['content-text']} dangerouslySetInnerHTML={textHtml}></div>
              </div>
            }
          </div>
        }
      </div>
    )
  }


  return (
    <Form {...formItemLayout}  onSubmit={handelSaveArt} className={classNames(className, styles.container)}>
      {getHaderTpl()}
      {getContentTpl()}
    </Form>
  )
}

function mapStateToProps({CDetails}){
  return {CDetails}
}

export default Form.create({})(connect(mapStateToProps)(Content))
