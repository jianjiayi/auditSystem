/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:58:26
 * @LastEditTime: 2020-08-12 09:58:33
 */ 
import * as api from '../service/index.js';

export default {
  namespace: 'QDetails',
  
  state: {
    isLogin: false,
    // 当前队列信息
    art: {},
    // 词库信息
    table: {
      // 数据源
      dataSource: [],
      // 分页信息
      pagination: {
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: total => `共 ${total} 条`,
          pageSize: 10,
          current: 1,
          total: null
      },
    },
  },

  subscriptions: {
    setup ({dispatch, history}) {
      // 初始化
      // console.log('2222',dispatch, history)
      // dispatch({type: 'effect:init'});
    }
  },

  effects: {
    *login({ payload }, { call, put }){
      const { code, data } = yield call(api.login, {});
      if(code == 0){
        yield put({
          type: 'save',
          payload: {
            isLogin: true
          }
        })
      }
    },
    // 初始化
    *init({payload}, {call, put}){
      if(payload.action == 'create') return;
      let art = {
        isInclude: 1,
        params1: "all",
        params2: "video",
        params3: "111",
        params4: undefined,
        params5: "1",
        params6: "1",
        params7: "1",
        rparams1_0: undefined,
        rparams1_1: undefined,
        rparams2_0: undefined,
        rparams3_0: undefined,
        rparams4_0: undefined,
        rparams5_0: undefined,
        rparams6_0: undefined,
        rparams7_0: undefined,
      }
      yield put({
        type: 'save',
        payload: {
          art
        }
      })
    },
    // 获取词库
    *getTextBase({payload}, {call, put, select}){
      let arr = []
      for(let i = 0; i<=20; i++){
        arr.push({
          id: i,
          name: payload.label+i
        })
      }
      let table  = yield select(({ QDetails }) => { return { table: QDetails.table } });
      table.dataSource = arr;
      yield put({
        type: 'save',
        payload: {
          table
        }
      })
    }
  },

  reducers: {
    save(state, action){
      return {...state, ...action.payload}
    }
  }
}