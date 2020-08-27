/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:58:26
 * @LastEditTime: 2020-08-25 19:56:25
 */ 
import * as api from '../service/index.js';

export default {
  namespace: 'CDetails',
  
  state: {
    loading: false,
    actionLoading: false, //操作页面loading
    isEdit: false, // 判断左侧正文是否处于编辑状态
    query:  sessionStorage.getItem('$QUERY') != '' ? JSON.parse(sessionStorage.getItem('$QUERY')) || {} : {}, //查询条件
    queueContentId:'', //当前审核文章的id
    curArt: {}, //当前文章内容
    category: [], //三级分类
  },

  effects: {
    // 初始化
    *init({payload}, {call, put}){
      yield put({type: 'save',payload: { loading: true}})
      yield put({type: 'Global/getFirstCategory'});
      yield put({type: 'getNewsGetTask', payload});
    },

    // 保存当前文章
    *getNewsSaveContent({ payload, callback }, { call, put, select}){
      const {query} = yield select(({ CDetails }) => CDetails);
      // 合并参数
      const params = {
        info:query,
        ...payload,
      };
      const {code ,data} = yield call(api.getNewsSaveContent, params);
      if(code == 200){
        yield put({type: 'getNewsGetTask', payload: {...query}});
      }
    },

    // 保存标签
    *getSaveTags({ payload, callback }, { call, put, select}){
      const {query} = yield select(({ CDetails }) => CDetails);
      // 合并参数
      const params = {
        info:query,
        ...payload,
      };
      const {code ,data} = yield call(api.getSaveTags, params);
      if(code == 200){
       callback()
      }
    },


    // 领取队列
    *getNewsGetTask({payload, callback}, {call, put, select}){
      const {query} = yield select(({ CDetails }) => CDetails);
      // 合并参数
      const params = {
        ...query,
        ...payload,
      };

      const {code, data} = yield call(api.getNewsGetTask, params);
      
      if(code == 200){
        if(data){
          yield put({
            type: 'save',
            payload: { 
              loading: false,
              isEdit: false,
              curArt: data.content,
              queueContentId: data.id,
              category: data.content.categoryIds
            }
          })
          callback(data);
        }else{
          callback(null)
        }
      }
    },

    // 跳过当前待审文章
    *getNewsSkip({ payload, callback }, { call, put, select }){
      yield put({type: 'save',payload: { actionLoading: true}})
      
      const {query} = yield select(({ CDetails }) => CDetails);
      // 合并参数
      const params = {
         info:query,
        ...payload,
      };
      const {code ,data} = yield call(api.getNewsSkip, params);
      if(code == 200){

         yield put({
          type: 'save',
          payload: { 
            loading: false,
            actionLoading: false,
            isEdit: false,
            curArt: data.content,
            queueContentId: data.id,
            category: data.content.categoryIds
          }
        })

        callback(code);
      }
    },


    // 退出当前领取队列
    *getNewsExit({ payload, callback }, { call, put, select}){
      yield put({type: 'save',payload: { actionLoading: true}})
      const {query} = yield select(({ CDetails }) => CDetails);
      // 合并参数
      const params = {
        ...query,
        ...payload,
      };
      const {code ,data} = yield call(api.getNewsExit, params);
      if(code == 200){

        yield put({type: 'save', payload:{
          query: {},
          curArt: {},
          actionLoading: false,
        }});
        sessionStorage.setItem('$QUERY', JSON.stringify({}));
        callback(code);
      }
    },
  },

  reducers: {
    save(state, action){
      return {...state, ...action.payload}
    }
  }
}