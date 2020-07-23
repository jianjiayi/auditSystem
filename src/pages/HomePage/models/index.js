/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:58:26
 * @LastEditTime: 2020-07-03 17:24:37
 */ 
import * as api from '../service/index.js';

export default {
  namespace: 'DataView',
  
  state: {
    isLogin: false,
    datasource:[
      {
        text: '昨日审核图文',
        value: '63004'
      },
      {
        text: '昨日审核图文',
        value: '564963'
      },
      {
        text: '昨日审核图文',
        value: '63004'
      },
      {
        text: '昨日审核图文',
        value: '564963'
      },
      {
        text: '昨日审核图文',
        value: '63004'
      },
      {
        text: '昨日审核图文',
        value: '564963'
      },
      {
        text: '昨日审核图文',
        value: '63004'
      },
      {
        text: '昨日审核图文',
        value: '564963'
      },
      {
        text: '昨日审核图文',
        value: '63004'
      },
      {
        text: '昨日审核图文',
        value: '564963'
      },
      {
        text: '昨日审核图文',
        value: '63004'
      },
      {
        text: '昨日审核图文',
        value: '564963'
      },
    ]
  },

  effects: {
    *'init'({ payload }, { call, put }){
      const { code, data } = yield call(api.login, {});
      if(code == 0){
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