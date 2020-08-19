/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:58:26
 * @LastEditTime: 2020-08-19 20:48:28
 */ 
import * as api from '../service/index.js';
import _ from 'lodash';
import {setStorage, getStorage} from '@utils/localStorage';

export default {
  namespace: 'User',
  
  state: {
    loading: false,
    isLogin: sessionStorage.getItem('$isLogin') || '',//验证用户登录
    business: sessionStorage.getItem('$business') != '' ? JSON.parse(sessionStorage.getItem('$business')) || {} : {},//保存用户业务线
    user: {
      name: 'admin'
    },
    authority : sessionStorage.getItem('$authority') != '' ? JSON.parse(sessionStorage.getItem('$authority')) || {} : {},//保存用户登录后基本信息
  },

  effects: {
    // 用户登录
    *login({ payload, callback }, { call, put }){
      yield put({type: 'save',payload: { loading: true}})
      const {code ,data} = yield call(api.login, payload);

      if(code == 200){
        sessionStorage.setItem('$isLogin', true);
        sessionStorage.setItem('$AUTHORIZATION', data);
        yield put({type: 'save', payload:{isLogin: true}});

        yield put({type: 'getBusiness'});
        yield put({type: 'getRoleAndPermission'});
         yield put({type: 'save',payload: { loading: false}})
      }  

      // sessionStorage.setItem('$isLogin', true);
      // yield put({type: 'save', payload:{isLogin: true}});
      
      // 回调函数
      callback()
    },
    // 获取用户业务线
    *getBusiness({ payload, callback }, { call, put }){
      const {code ,data} = yield call(api.getBusiness, {});
      if(code == 200){
        let map = {}
        !_.isEmpty(data) && data.map(item=>{
          map[item.id] = item.coorpName
        })
        
        yield put({type: 'save', payload:{business: map}});
        sessionStorage.setItem('$business', JSON.stringify(map));
      }
    },
    // 获取用户角色和权限
    *getRoleAndPermission({ payload, callback }, { call, put }){
      const {code ,data} = yield call(api.getRoleAndPermission, {});
      if(code == 200){

        yield put({type: 'save', payload:{authority: data}});
        sessionStorage.setItem('$authority', JSON.stringify(data));
      }
    },
    // 退出登录
    *logout({ payload, callback }, { call, put }){

      yield put({type: 'save', payload:{ isLogin: false, user: {}, business: []}});
      sessionStorage.setItem('$business', JSON.stringify({}));
      sessionStorage.setItem('$authority', JSON.stringify({}));
      sessionStorage.setItem('$isLogin', '');
      callback()
    }
  },

  reducers: {
    save(state, action){
      return {...state, ...action.payload}
    }
  }
}