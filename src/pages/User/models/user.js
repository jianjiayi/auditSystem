/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:58:26
 * @LastEditTime: 2020-07-21 09:11:28
 */ 
import * as api from '../service/index.js';
import {setStorage, getStorage} from '@utils/localStorage';

export default {
  namespace: 'user',
  
  state: {
    isLogin: false,
  },

  effects: {
    *login({ payload }, { call, put }){
      setStorage('isLogin', true);
      const { code, data } = yield call(api.login, {});
      if(code == 0){
        setStorage('isLogin', true);
        console.log('222222')
        yield put({
          type: 'save',
          payload: {
            isLogin: true
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