/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:58:26
 * @LastEditTime: 2020-08-22 15:04:51
 */ 
import * as api from '../service/index.js';
import  { statisticCount } from '@config/constants';

export default {
  namespace: 'DataView',
  
  state: {
    loading: false,
    // 查询条件
    query: {},
    // 文章列表
    dataSource: [],
  },

  effects: {
    *init({ payload }, { call, put }){
      yield put({type: 'save',payload: {loading: true}})
      yield put({type: 'getStatisticCount', payload});
    },
    *getStatisticCount({payload}, {call, put, select}){
      const {code, data} = yield call(api.getStatisticCount, payload);
      
      if(code == 200 && data){
        let arr = []
        for(let key in data){
          arr.push({
            name: statisticCount[key],
            value: data[key].toString(),
          })
        }
        yield put({
          type: 'save',
          payload: {
            loading: false,
            dataSource: arr,
          },
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