/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:58:26
 * @LastEditTime: 2020-08-19 17:29:07
 */ 
import * as api from '../service/index.js';

export default {
  namespace: 'QDetails',
  
  state: {
    loading: false,
    configRule: [], // 配置规则
    mediaInfo: [], //媒体类型
    mediaInfoList: {},
    sourceList: [], //内容来源、抓取来源
    category: '', //三级分类
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
    // 当前队列信息
    art: {},
  },

  subscriptions: {
    setup ({dispatch, history}) {
      // 初始化
      // console.log('2222',dispatch, history)
      // dispatch({type: 'getFirstCategory'});
    }
  },

  effects: {
    // 初始化
    *init({payload, callback}, {call, put, select}){
      yield put({type: 'save',payload: {art: {}, loading: true}})
      yield put({type: 'getMediaInfo', payload: {type: 'rmw_media_type'}});
      yield put({type: 'Global/getFirstCategory'});
      yield put({type: 'getRuleInfo'});
      yield put({type: 'getContentSource'});
      yield put({type: 'save',payload: { loading: false}})
      
      if(payload.action == 'create') return;

      // 编辑、复用
      yield put({type: 'getQueue',payload});
    },
    *getQueue({payload}, {call, put, select}){
      const {code, data} = yield call(api.getQueue, payload);
      
      if(code == 200 && data){
         yield put({
          type: 'save',
          payload: {
            loading: false,
            art: data.data[0] || {},
            category: data.data[0].category
          },
        })
      }
    },
    // 保存接口
    *saveQueue({payload, callback}, {call, put}){
      // yield put({type: 'save',payload: { loading: true}})
      const {code, data} = yield call(api.saveQueue, payload);
      callback(code);
    },
    // 获取规则列表接口
    *getRuleInfo({payload}, {call, put}){
      const {code, data} = yield call(api.getRuleInfo, payload);
      if(code == 200){
        yield put({
          type: 'save',
          payload: {
            configRule: data
          }
        })
      }
    },
    // 内容来源、抓取来源接口
    *getContentSource({payload}, {call, put}){
      const {code, data} = yield call(api.getContentSource, payload);
      if(code == 200){
        yield put({
          type: 'save',
          payload: {
            sourceList: data
          }
        })
      }
    },
    // 获取屏蔽词接口
    *getDenyWords({payload}, {call, put, select}){
      const {query, pagination} = yield select(({ QDetails }) => QDetails);
      // 合并参数
      const params = {
        ...query,
        // pageNo: 1,
        // pageSize: pagination.pageSize,
        ...payload,
      };
      
      const {code, data} = yield call(api.getDenyWords, params);
      
      if(code == 200 && data){
         yield put({
          type: 'save',
          payload: {
            query: params,
            dataSource: data || [],
            pagination: {
              ...pagination,
              // total: data.totalCount,
              // current: data.pageNo,
              pageSize: 10
            }
          }
        })
      }
    },
    // 获取媒体类型和分类接口
    *getMediaInfo({payload}, {call, put}){
      const {code, data} = yield call(api.getMediaInfo, payload);
      if(code == 200){
        let mediaInfoList = {}
        for(let i in data){
          let {code:c, data:d} = yield call(api.getMediaInfo, {type: data[i].code});
          if(c==200){
            let map = {};
            d.map(item => {
              map[item.code] = item.name;
            })
            mediaInfoList[data[i].code] = map
          }
        }
        yield put({
          type: 'save',
          payload: {
            mediaInfo: data,
            mediaInfoList: mediaInfoList,
          }
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