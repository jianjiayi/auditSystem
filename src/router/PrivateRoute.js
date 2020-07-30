/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 10:44:16
 * @LastEditTime: 2020-07-30 17:16:38
 */ 
import {setStorage, getStorage} from '@utils/localStorage';
const { Route, Redirect } = require('dva').router;

const AuthRouter = (props) => {
  const { route } = props;
  const { component:Component } = route;

  // 获取存在本地的登录状态以及权限
  const token = sessionStorage.getItem('$token') || '';

  return (
    <Route render={ props => {
      // console.log('private',props);
      return token ? <Component { ...props } /> : <Redirect to="/login" />
    }} />
  )
}

export default AuthRouter;