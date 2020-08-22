/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:58:26
 * @LastEditTime: 2020-08-22 10:39:05
 */ 
import * as api from '../service/index.js';

export default {
  namespace: 'Statistics',
  
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
      yield put({type: 'getStatisticQuery', payload});
    },
    // 获取分类或人员列表
    *getStatisticQuery({payload}, {call, put, select}){
      yield put({type: 'save',payload: { query: {}, loading: true}})

      const {query, pagination} = yield select(({ Statistics }) => Statistics);
      // 合并参数
      const params = {
        ...query,
        pageNum: 1,
        pageSize: pagination.pageSize,
        ...payload,
      };
      
      const {code, data} = yield call(api.getStatisticQuery, params);
      
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


    // 获取人员明细列表
    *getPersoneDetailQuery({payload}, {call, put, select}){
      yield put({type: 'reset'})

      const {query, pagination} = yield select(({ Statistics }) => Statistics);
      // 合并参数
      const params = {
        ...query,
        pageNum: 1,
        pageSize: pagination.pageSize,
        ...payload,
      };
      
      const {code, data} = yield call(api.getPersoneDetailQuery, params);
      
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