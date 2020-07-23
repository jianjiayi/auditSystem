/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-20 16:56:06
 * @LastEditTime: 2020-07-20 16:57:13
 */ 
import React, {Component} from 'react';
import { Modal, } from 'antd';

const wrapAuth = ((ComposedComponent, path) => class WrapComponent extends Component{
    constructor(props){
        super(props);
    }

    tipError = () => {
        Modal.confirm({
            centered:true,
            content: '请先登录',
            okText: '确认',
            cancelText: '取消',
        });
    }

    render() {
        let {isAuth, onClick, ...rest} = this.props;
        const comProps = {
            onClick: isAuth ? onClick : ()=>this.tipError(),
            ...rest
        }
        return <ComposedComponent {...comProps}></ComposedComponent>
    }
})

export default wrapAuth