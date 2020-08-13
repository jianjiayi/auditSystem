/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-01 15:51:25
 * @LastEditTime: 2020-08-11 10:58:43
 */ 
import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import {message, Form, Icon, Input, Button, Checkbox} from 'antd';
import ReactCanvasNest from 'react-canvas-nest';

import { appConfig } from '@config/default.config.js';

import styles from './index.module.less';

const loginBg = require('@assets/login_bg.jpg');

// 粒子背景配置参数
const config = {
  count       : 100,                // count of points
  dist        : 6000,              // maximum length of line segments between two points
  pointOpacity: 10,                 // transparency of points
  lineColor   : '255, 255, 255',
  lineWidth   : 2,                 // multiple of line width
  pointColor  : '255, 255, 255',
  pointR      : 2,                 // radius of the point
  follow      : true,
  mouseDist   : 20000,
}

function Login(props) {
  const { App, dispatch, form:{getFieldDecorator} } = props;
  const {logo, homePath, title, copyRight} = appConfig;

  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        dispatch({
          type: 'App/login',
          payload: values,
          callback: (res) => {
            if(res == 1){
              message.error('用户名或密码错误');
              return;
            }
            router.push({pathname:'/'});
          }
        })
      }
    });
  };

  const register = () => {
    
  }

  return (
    <div className={styles.container} style={{backgroundImage: `url('${loginBg}')`}}>
        {/* <ReactCanvasNest className={styles.canvasNest} config = {config} style={{zIndex: 999}}/> */}
        <div className={styles.main}>
          <div className={styles.content}>
            <Form onSubmit={handleSubmit} className={styles['login-form']}>
              <div className={styles.title}>{title}</div>
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '请输入账号' }],
                })(
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="请输入账号"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入密码' }],
                })(
                  <Input.Password
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="请输入密码"
                  />,
                )}
              </Form.Item>
              <div className={styles.item}>
                  {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(<Checkbox>记住密码</Checkbox>)}
                <Link to="/">忘记密码？</Link>
              </div>
              <Button className={`${styles.login_button} ${styles.item_button}`} type="primary" htmlType="submit"> 登录</Button>
              <Button className={styles.item_button} onClick={()=>register()}> 注册</Button>
            </Form>
          </div>
          <div className={styles.footer}>
            {copyRight}
          </div>
        </div>
      </div>
  )
}

function mapStateToProps({App, user}){
  return {App, user}
}

export default Form.create({})(connect(mapStateToProps)(Login))
