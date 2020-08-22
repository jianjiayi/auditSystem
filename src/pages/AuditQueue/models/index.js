/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:58:26
 * @LastEditTime: 2020-08-21 15:58:45
 */ 
import * as api from '../service/index.js';

export default {
  namespace: 'Queue',
  
  state: {
    loading: false,
    // 查询条件
    query: {},
    // 文章列表
    dataSource: [],
  },

  effects: {
    // 初始化
    *init({payload}, {call, put}){
      yield put({type: 'getQueueListCount',payload});
    },
    *getQueueListCount({payload}, {call, put, select}){
      yield put({type: 'save',payload: { query: {}, loading: true}})
      
      const {code, data} = yield call(api.getQueueListCount, payload);
      
      if(code == 200 && data){
         yield put({
          type: 'save',
          payload: {
            loading: false,
            dataSource: data || [],
          }
        })
      }
    },
  },

  reducers: {
    save(state, action){
      return {...state, ...action.payload}
    }
  }
}