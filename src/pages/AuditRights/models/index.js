/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:58:26
 * @LastEditTime: 2020-08-26 17:15:15
 */ 
import * as api from '../service/index.js';
import _ from 'lodash';

export default {
  namespace: 'Rights',
  
  state: {
    loading: false,
    permissionIds: [], // 当前角色拥有的权限
    roleList: {}, //所有角色
    permissionDataList: [],// 审核系统所有权限
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
      yield put({type: 'reset'});
      yield put({type: 'getUserOrRoleQuery', payload});
    },

    // 创建用户获或角色
    *addUserOrRole({payload, callback}, {call, put}){
      const {code, data} = yield call(api.addUserOrRole, payload);
      callback(code);
    },

    // 更新用户或角色状态
    *updateUserOrRoleStatus({payload, callback}, {call, put}){
      const {code, data} = yield call(api.updateUserOrRoleStatus, payload);
      
      callback(code);
    },

    // 更新用户或角色信息
    *updateUserOrRoleInfo({payload, callback}, {call, put}){
      let params = {
        type : payload.type == 2 ? 'enable' : 'disable',
        username: payload.username
      }
      const {code, data} = yield call(api.updateUserOrRoleInfo, params);
      
      callback(code);
    },

    // 根据id获取角色详情
    *getRuleDetailsById({payload, callback}, {call, put}){
      const {code, data} = yield call(api.getRuleDetailsById, payload);
      if(code == 200){
        // console.log(data)
        let arr = [];
        !_.isEmpty(data.permissions) && data.permissions.map((item)=>{
          arr.push(item.permissionId.toString())
        })
        yield put({
          type: 'save',
          payload: {
            permissionIds: arr
          }
        })
        callback(arr)
      }
    },

    // 根据业务线查询角色列表
    *getRuleListByBusiness({payload, callback}, {call, put}){
      const {code, data} = yield call(api.getRuleListByBusiness, payload);
      if(code == 200){
        // console.log(data)
        let obj = {};
        !_.isEmpty(data) && data.map((item)=>{
          obj[item.id] = item.roleName
        })
        yield put({
          type: 'save',
          payload: {
            roleList: obj
          }
        })
        callback(obj)
      }
    },

    // 获取用户或角色列表
    *getUserOrRoleQuery({payload}, {call, put, select}){
      yield put({type: 'save',payload: { query: {}, loading: true}})

      const {query, pagination} = yield select(({ Rights }) => Rights);
      // 合并参数
      const params = {
        ...query,
        pageNum: 1,
        pageSize: pagination.pageSize,
        ...payload,
      };
      
      const {code, data} = yield call(api.getUserOrRoleQuery, params);
      
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


    // 获取系统所有的用户权限
    *getPermissionList({payload}, {call, put}){
      const {code, data} = yield call(api.getPermissionList, payload);
      
      if(code == 200 && data){
        yield put({
          type: 'save',
          payload: {
            permissionDataList: data
          }
        })
      }
    },
  },

  reducers: {
    reset(state){
    return {
        loading: false,
        permissionIds: [], // 当前角色拥有的权限
        roleList: {}, //所有角色
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