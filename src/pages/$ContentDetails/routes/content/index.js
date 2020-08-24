/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-06 09:48:30
 * @LastEditTime: 2020-08-24 16:43:40
 */ 
import React, {useState, useEffect, useRef} from 'react';
import { connect } from 'dva';
import classNames from 'classnames';
import {Form, Input, DatePicker, Button, Row, Col,} from 'antd';
import moment from 'moment';
import _ from 'lodash';

import {AudioPlayer, VideoPlayer } from '@components/Media';
import Ueditor from '@components/Editor';

import { ExTime } from '@utils/utils.js';

import styles from './index.module.less';

import wrapAuth from '@components/WrapAuth';
const AuthButton = wrapAuth(Button);

const dateFormat = 'YYYY-MM-DD HH:mm:ss';

const formItemLayout = {
  labelAlign: 'left',
  labelCol: { span: 3 },
  wrapperCol: { span: 20 },
};

function Content(props) {
  // 临时保存编辑器修改后的文章详情
  const [editorText, setEditorText] = useState('');


  const {
    className, 
    CDetails, 
    form: {
      getFieldDecorator, 
      validateFields,
      resetFields
    }, 
    dispatch
  } = props;

  const { curArt, isEdit, queueContentId } = CDetails;

  useEffect(()=>{
    setEditorText(curArt.content)
  },[curArt.content])

  

  const changeIsEdit = (status) => {
    if(!status){
      resetFields(['title', 'date', 'source']);
    }
    dispatch({type: 'CDetails/save',payload: { isEdit: status}})
  }

  // 保存函数
  const handelSaveArt = e => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        values.content  = editorText;
        if(!_.isEmpty(values.datetime)){
          let time = values.datetime.format(dateFormat);
          values.createtime = new Date(time.replace(/-/g, '/')).getTime()
        }
        delete values.datetime;

        const { id, ...rest} = values;

        dispatch({
          type: 'CDetails/getNewsSaveContent',
          payload: {
            data: {
              content: rest,
              id: queueContentId
            },
          }
        })
        changeIsEdit(false);
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
          <Form.Item label="&nbsp;&nbsp;&nbsp;ID">
            {getFieldDecorator('id', {
              initialValue: curArt.id,
            })(
              <span>{curArt.id}</span>
            )}
          </Form.Item>
          <Form.Item label="来源">
            {getFieldDecorator('origin', {
              initialValue: curArt.origin,
                rules: [{ required: true, message: `请输入来源` }],
            })(
              isEdit? <Input placeholder="请输入来源"/> :
              <span className={styles.title}>{curArt.origin}</span>
            )}
          </Form.Item>
          <Form.Item label="时间">
            {getFieldDecorator('datetime', {
              initialValue: moment(curArt.createtime),
              rules: [{ required: true, message: `请选择时间` }],
            })(
              isEdit? <DatePicker showTime format={dateFormat}/> :
              <span className={styles.title}>{ExTime.formatDate(curArt.createtime)}</span>
            )}
          </Form.Item>
        </div>
        <div className={styles['button-box']}>
          {!isEdit && <AuthButton perms={'news:edit'} type="primary" size="small" onClick={()=>{changeIsEdit(true)}}>修改</AuthButton>}
          {isEdit && 
            <div className={styles['button-group']}>
              <Button type="primary" size="small" type="primary" htmlType="submit">确定</Button>
              <Button size="small" onClick={()=>{changeIsEdit(false)}}>取消</Button>
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
  const textHtml = {__html:getContentHtml(curArt.content,list)};
  const UeditorProps = {
    initialContent: curArt.content || '',
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

        {curArt.newsType == 'AUDIO' && <AudioPlayer {...audioProps}></AudioPlayer>}

        {curArt.newsType == 'VIDEO' && 
          <div>
            <h2 className={styles.title}>视频详情 : </h2>
            <VideoPlayer {...videoProps}></VideoPlayer>
          </div>
        }

        {
          (curArt.newsType == 'NEWS' || curArt.newsType == 'IMAGE') && 
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
