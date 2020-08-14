/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:58:26
 * @LastEditTime: 2020-08-14 16:08:43
 */ 
import * as api from '../service/index.js';
import {setStorage, getStorage} from '@utils/localStorage';

export default {
  namespace: 'Global',
  
  state: {
    business: sessionStorage.getItem('$business') != '' ? JSON.parse(sessionStorage.getItem('$business')) || [] : [],//保存用户业务线
    firstCategory: [],  // 一级分类
    secondCategory: [], // 二级分类
    thirdCategory: [],  // 三级分类
  },

  effects: {
    // 获取用户业务线
    *getBusiness({ payload, callback }, { call, put }){
      const {code ,data} = yield call(api.getBusiness, {});
      if(code == 200){
        sessionStorage.setItem('$business', JSON.stringify(data));
        yield put({type: 'save', payload:{business: data}});
      }
    },
    // 获取一级分类
    *getFirstCategory({payload}, {call, put}){
      const {code, data} = yield call(api.getFirstCategory, payload);
      if(code == 200){
        yield put({
          type: 'save',
          payload: {
            firstCategory: data
          }
        })
      }
    },
    // 获取二级分类
    *getSecondCategory({payload}, {call, put}){
      const {code, data} = yield call(api.getSecondCategory, payload);
      if(code == 200){
        yield put({
          type: 'save',
          payload: {
            secondCategory: data
          }
        })
      }
    },
    // 获取三级分类
    *getThirdCategory({payload}, {call, put}){
      const {code, data} = yield call(api.getThirdCategory, payload);
      if(code == 200){
        yield put({
          type: 'save',
          payload: {
            thirdCategory: data
          }
        })
      }
    }
  },

  reducers: {
    save(state, action){
      return {...state, ...action.payload}
    }
  }
}