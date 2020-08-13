/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:58:26
 * @LastEditTime: 2020-08-12 10:05:37
 */ 
import * as api from '../service/index.js';

export default {
  namespace: 'CDetails',
  
  state: {
    loading: false,
    curArt:{}
  },

  effects: {
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