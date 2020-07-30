/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-01 09:41:13
 * @LastEditTime: 2020-07-30 17:13:30
 */ 

import { connect } from 'dva';
import Redirect from 'umi/redirect';
import BaseLayout from './BaseLayout';
import LoginLayout from './LoginLayout';

function BasicLayout(props) {
  // console.log(props)
  const {App} = props;

  // 登录页面
  if(props.location.pathname === '/login'){
    return <LoginLayout {...props}></LoginLayout>
  }

  return (
    App.token ? <BaseLayout {...props}></BaseLayout> : <Redirect to="/login" />
  );
}

function mapStateToProps({App}){
  return {App}
}

export default connect(mapStateToProps)(BasicLayout);
