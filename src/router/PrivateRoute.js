/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-09 10:44:16
 * @LastEditTime: 2020-06-30 17:47:44
 */ 
import {setStorage, getStorage} from '@utils/localStorage';
const { Route, Redirect } = require('dva').router;

const AuthRouter = (props) => {
  const { route } = props;
  const { component:Component } = route;

  // 获取存在本地的登录状态以及权限
  const isLogin = getStorage('isLogin');

  return (
    <Route render={ props => {
      // console.log('private',props);
      return isLogin ? <Component { ...props } /> : <Redirect to="/login" />
    }} />
  )
}

export default AuthRouter;