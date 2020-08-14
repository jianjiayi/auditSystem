/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:58:26
 * @LastEditTime: 2020-08-14 16:23:05
 */ 
import * as api from '../service/index.js';
import {setStorage, getStorage} from '@utils/localStorage';

export default {
  namespace: 'App',
  
  state: {
    isLogin: sessionStorage.getItem('$isLogin') || '',//验证用户登录
    business: sessionStorage.getItem('$business') != '' ? JSON.parse(sessionStorage.getItem('$business')) || [] : [],//保存用户业务线
    user : sessionStorage.getItem('$user') != '' ? JSON.parse(sessionStorage.getItem('$user')) || {} : {},//保存用户登录后基本信息
  },

  effects: {
    
  },

  reducers: {
    save(state, action){
      return {...state, ...action.payload}
    }
  }
}