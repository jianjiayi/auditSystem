/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:58:26
 * @LastEditTime: 2020-08-21 16:28:36
 */ 
import * as api from '../service/index.js';

export default {
  namespace: 'CDetails',
  
  state: {
    loading: false,
    query:  sessionStorage.getItem('$QUERY') || {}, //查询条件
    curArt: sessionStorage.getItem('$QUEUEART') || {}
  },

  effects: {
    // 初始化
    *init({payload}, {call, put}){
      yield put({type: 'save',payload: { loading: true}})
      yield put({type: 'Global/getFirstCategory'});
      yield put({type: 'save',payload: { loading: false}})
    },
    // 领取队列
    *getNewsGetTask({payload, callback}, {call, put, select}){
      const {query} = yield select(({ CDetails }) => CDetails);
      // 合并参数
      const params = {
        ...query,
        ...payload,
      };

      const {code, data} = yield call(api.getNewsGetTask, params);
      if(code == 200){
        yield put({
          type: 'save',
          payload: { 
            curArt: data
          }
        })
        sessionStorage.setItem('$QUEUEART', data);
        callback(code);
      }
    },
  },

  reducers: {
    save(state, action){
      return {...state, ...action.payload}
    }
  }
}