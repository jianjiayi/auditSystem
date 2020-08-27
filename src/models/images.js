/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:58:26
 * @LastEditTime: 2020-08-25 17:47:03
 */ 
import * as api from '../service/index.js';

export default {
  namespace: 'Images',
  
  state: {
    loading: false,
    visiable: false,
    // 图片库列表
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

  effects: {
    // 获取当前图片库接口
    *getAuditImages({payload}, {call, put, select}){
      yield put({type: 'save',payload: { loading: true}});
      
      const {pagination} = yield select(({ Images }) => Images);
      // 合并参数
      const params = {
        pageNo: 1,
        pageSize: pagination.pageSize,
        ...payload,
      };
      
      const {code, data} = yield call(api.getAuditImages, params);
      
      if(code == 200 && data){
         yield put({
          type: 'save',
          payload: {
            loading: false,
            dataSource: data.list || [],
            pagination: {
              ...pagination,
              total: data.count,
              current: data.pageNo,
              pageSize: params.pageSize
            }
          }
        })
      }
    },
  },

  reducers: {
    reset(state){
      return {
        loading: false,
        // 查询条件
        query: {},
        // 文章列表
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
      }
    },
    save(state, action){
      return {...state, ...action.payload}
    }
  }
}