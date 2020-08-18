/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-01 09:41:13
 * @LastEditTime: 2020-08-17 17:10:32
 */ 

import { connect } from 'dva';
import Redirect from 'umi/redirect';
import BaseLayout from './BaseLayout';
import LoginLayout from './LoginLayout';

function BasicLayout(props) {
  // console.log(props)
  const {User} = props;

  // 登录页面
  if(props.location.pathname === '/login'){
    return <LoginLayout {...props}></LoginLayout>
  }

  return (
    User.isLogin ? <BaseLayout {...props}></BaseLayout> : <Redirect to="/login" />
  );
}

function mapStateToProps({User}){
  return {User}
}

export default connect(mapStateToProps)(BasicLayout);
