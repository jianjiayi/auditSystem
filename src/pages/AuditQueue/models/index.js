/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:58:26
 * @LastEditTime: 2020-07-16 16:55:12
 */ 
import * as api from '../service/index.js';

export default {
  namespace: 'Queue',
  
  state: {
    isLogin: false,
    // 表单信息
    table: {
      // 数据源
      dataSource: [
        {
          id:'1',
          title: '精品内容',
          total: 25634,
        },
        {
          id: '2',
          title: '高危队列',
          total: 25634,
        },
        {
          id: '3',
          title: '定制审核',
          total: 25634,
        },
        {
          id: '4',
          title: '去砸不净',
          total: 25634,
        },
      ],
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
    }
  },

  reducers: {
    save(state, action){
      return {...state, ...action.payload}
    }
  }
}