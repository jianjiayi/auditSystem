/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:58:26
 * @LastEditTime: 2020-08-14 16:30:24
 */ 
import * as api from '../service/index.js';

export default {
  namespace: 'CDetails',
  
  state: {
    loading: false,
    curArt:{}
  },

  effects: {
    // 初始化
    *init({payload}, {call, put}){
      yield put({type: 'save',payload: { loading: true}})
      yield put({type: 'Global/getFirstCategory'});
      yield put({type: 'queryArt',payload});
      yield put({type: 'save',payload: { loading: false}})
    },
    *queryArt({ payload }, { call, put }){
      // yield put({
      //   type: 'save',
      //   payload: { loading: true}
      // })
      // const { code, data } = yield call(api.queryArt, {});
      // if(code == 0){
      //   yield put({
      //     type: 'save',
      //     payload: {
      //       loading: false,
      //       curArt: data
      //     }
      //   })
      // }
    }
  },

  reducers: {
    save(state, action){
      return {...state, ...action.payload}
    }
  }
}