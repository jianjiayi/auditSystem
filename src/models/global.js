/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-22 17:29:00
 * @LastEditTime: 2020-07-23 17:03:22
 */ 
 
import * as api from '../service/index.js';

export default {
  namespace: 'App',
  
  state: {
    isLogin: true,
  },

  effects: {
    *login({ payload, callback }, { call, put }){
      yield put({
        type: 'save',
        payload: {
          isLogin: true
        }
      })
      // 回调函数
      callback()
      // const { code, data } = yield call(api.getPermission, {});
      // if(code == 0){
        
      // }
    }
  },

  reducers: {
    save(state, action){
      return {...state, ...action.payload}
    }
  }
}