/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:58:26
 * @LastEditTime: 2020-07-13 13:54:32
 */ 
import * as api from '../service/index.js';

export default {
  namespace: 'Rights',
  
  state: {
    isLogin: false,
    // 表单信息
    table: {
      // 数据源
      dataSource: [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
        },
        {
          key: '4',
          name: 'Disabled User',
          age: 99,
          address: 'Sidney No. 1 Lake Park',
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