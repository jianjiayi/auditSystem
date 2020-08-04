/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:58:26
 * @LastEditTime: 2020-08-03 14:58:31
 */ 
import * as api from '../service/index.js';
import {setStorage, getStorage} from '@utils/localStorage';

export default {
  namespace: 'App',
  
  state: {
    token: sessionStorage.getItem('$token') || '',//验证用户登录
    user : sessionStorage.getItem('$user') != '' ? JSON.parse(sessionStorage.getItem('$user')) || {} : {},//保存用户登录后基本信息
    roles: sessionStorage.getItem('$roles') != '' ? JSON.parse(sessionStorage.getItem('$roles')) || {} : {},//用户权限
  },

  effects: {
    *login({ payload, callback }, { call, put }){
      let result = {};
      if (payload.username == 'admin' && payload.password == 'admin') {
        result = {
          code: 0,
          data: {
            token: "admin",
            user: {
              name: "admin",
              avatar: "https://mirror-gold-cdn.xitu.io/16b20352d200ee99993?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"
            },
            msg: '登陆成功'
          }
        }
      }else{
        result = {
          code: 1,
          data: {
            msg: '用户名或密码错误'
          }
        }
      }
      
      const { code, data } = result;

      const payloadObj = {};
      if(code == 0){
        payloadObj.user = data.user;
        payloadObj.token = data.token;

        sessionStorage.setItem('$user', JSON.stringify(data.user));
        sessionStorage.setItem('$token', data.token);
      }  
      yield put({type: 'save', payload:{...payloadObj}});
      // 回调函数
      callback(code)
    },
    *logout({ payload, callback }, { call, put }){
      sessionStorage.setItem('$user', JSON.stringify({}));
      sessionStorage.setItem('$token', '');

      yield put({type: 'save', payload:{user: {}, token: ''}});
      
      callback()
    }
  },

  reducers: {
    save(state, action){
      return {...state, ...action.payload}
    }
  }
}