/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 14:58:26
 * @LastEditTime: 2020-07-28 09:03:28
 */ 
import * as api from '../service/index.js';

export default {
  namespace: 'CDetails',
  
  state: {
    isLogin: false,
    curArt:{
      text: '<div><p>本文转自【天山网】；</p><p>【7月21日新疆（含兵团）新冠肺炎疫情最新通报】#疫情防控动态# 新疆维吾尔自治区卫生健康委最新通报，7月21日0时至7月21日24时，新疆维吾尔自治区（含新疆生产建设兵团）报告新增新冠肺炎确诊病例9例，新增无症状感染者14例，均在乌鲁木齐市。</p><p>截至7月21日24时，新疆（含兵团）现有确诊病例64例(其中危重症1例、重症3例、1 例重症转普通型),乌鲁木齐市62例、喀什地区1例（乌鲁木齐市输入病例）、兵团1例；现有无症状感染者69例，均在乌鲁木齐市；尚有3162人正在接受医学观察。</p><p><img src="https://luckyimgs.peopletech.cn/image/202007/22/c7a5ebabe4508f7c/d9b3c1274c36922feac11a4056d636f4.jpeg" width="602" height="471"/></p></div>'
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
    }
  },

  reducers: {
    save(state, action){
      return {...state, ...action.payload}
    }
  }
}