/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:58:26
 * @LastEditTime: 2020-08-14 16:18:26
 */ 
import * as api from '../service/index.js';
import {setStorage, getStorage} from '@utils/localStorage';

export default {
  namespace: 'User',
  
  state: {
    isLogin: sessionStorage.getItem('$isLogin') || '',//验证用户登录
    business: sessionStorage.getItem('$business') != '' ? JSON.parse(sessionStorage.getItem('$business')) || [] : [],//保存用户业务线
    user : sessionStorage.getItem('$user') != '' ? JSON.parse(sessionStorage.getItem('$user')) || {} : {},//保存用户登录后基本信息
  },

  effects: {
    // 用户登录
    *login({ payload, callback }, { call, put }){
      // const {code ,data} = yield call(api.login, payload);

      // if(code == 200){
      //   sessionStorage.setItem('$isLogin', true);
      //   sessionStorage.setItem('$AUTHORIZATION', data);
      //   yield put({type: 'save', payload:{isLogin: true}});

      //   yield put({type: 'getBusiness'});
      //   yield put({type: 'getRoleAndPermission'});
      // }  
      sessionStorage.setItem('$isLogin', true);
      yield put({type: 'save', payload:{isLogin: true}});
      
      // 回调函数
      callback()
    },
    // 获取用户业务线
    *getBusiness({ payload, callback }, { call, put }){
      const {code ,data} = yield call(api.getBusiness, {});
      if(code == 200){
        sessionStorage.setItem('$business', JSON.stringify(data));
        yield put({type: 'save', payload:{business: data}});
      }
    },
    // 获取用户角色和权限
    *getRoleAndPermission({ payload, callback }, { call, put }){
      const {code ,data} = yield call(api.getRoleAndPermission, {});
      if(code == 200){
        sessionStorage.setItem('$user', JSON.stringify(data));
        yield put({type: 'save', payload:{user: data}});
      }
    },
    // 退出登录
    *logout({ payload, callback }, { call, put }){
      sessionStorage.setItem('$business', JSON.stringify({}));
      sessionStorage.setItem('$user', JSON.stringify({}));
      sessionStorage.setItem('$isLogin', '');

      yield put({type: 'save', payload:{ isLogin: false, user: {}, business: []}});
      
      callback()
    }
  },

  reducers: {
    save(state, action){
      return {...state, ...action.payload}
    }
  }
}