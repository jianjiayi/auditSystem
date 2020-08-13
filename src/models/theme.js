/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-22 17:29:00
 * @LastEditTime: 2020-08-11 10:17:12
 */ 
import { themeConfig }  from '../config/default.config';
import { changeColor } from '@utils/theme.js';

const updateColorWeak = colorWeak => {
  const root = document.getElementById('root');
  if (root) {
    root.className = colorWeak ? 'colorWeak' : '';
  }
};

const themeData = JSON.parse(localStorage.getItem('smart-theme'));

export default {
  namespace: 'theme',
  
  state:  themeData || themeConfig,

  subscriptions: {
    setup ({dispatch, history}) {
      // 初始化
      dispatch({type: 'effect:changeColor'});
    }
  },

  effects: {
    *'changeSetting'({ payload }, {call, put, select}){
      console.log(payload)
      const theme = yield select(({theme}) => {return theme});
      const { colorWeak } = payload;
      updateColorWeak(!!colorWeak);
      localStorage.setItem('smart-theme', JSON.stringify({ ...theme, ...payload }));
      yield put({
        type: 'reducer:update',
        payload: { ...theme, ...payload }
      })
      yield put({
        type: 'changeColor',
      })
    },
    *'changeColor'({payload}, {call, put, select}){
      const theme = yield select(({theme}) => {return theme});
      // 设置网站风格和主题颜色
      yield call(changeColor, {dark: theme.navTheme, color: theme.primaryColor})
    }
  },

  reducers: {
    'reducer:update'(state, {payload}){
      return {...state, ...payload}
    }
  }
}