/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:58:26
 * @LastEditTime: 2020-08-22 15:29:38
 */ 
import * as api from '../service/index.js';

export default {
  namespace: 'Search',
  
  state: {
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
  },

  effects: {
    // 初始化
    *init({payload}, {call, put}){
      yield put({type: 'reset'})
      yield put({type: 'Global/getFirstCategory'});
      yield put({type: 'getNewsList', payload});
    },
    // 获取审核列表
    *getNewsList({payload}, {call, put, select}){
      yield put({type: 'save',payload: { query: {}, loading: true}})

      const {query, pagination} = yield select(({ Search }) => Search);
      // 合并参数
      const params = {
        ...query,
        pageNum: 1,
        pageSize: pagination.pageSize,
        ...payload,
      };
      
      const {code, data} = yield call(api.getNewsList, params);
      
      if(code == 200 && data){
         yield put({
          type: 'save',
          payload: {
            loading: false,
            query: params,
            dataSource: data.data || [],
            pagination: {
              ...pagination,
              total: data.totalSize,
              current: data.pageNum,
              pageSize: params.pageSize
            }
          }
        })
      }
    },
    // 查询操作记录
    
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