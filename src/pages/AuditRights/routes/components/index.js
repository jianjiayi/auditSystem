/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-08-27 10:19:06
 * @LastEditTime: 2020-08-27 19:06:32
 */
import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { message, Button, Checkbox, Tree, TreeSelect, Tag } from 'antd';
import _ from 'lodash';

import { getTreeData }  from '@utils/rights.js';

import styles from './index.module.less';

function TreeCom(props, ref) {
  // 存放勾选的节点id
  const [userdata, setUserData]= useState([]);

  const {
    onCheckTreeFun= ()=>{},
    permissionDataList, 
    userPermission =[],
  } = props;

  let ownList = []

  useEffect(() => {
    // console.log(userPermission)
    if(!_.isEmpty(userPermission)){
      // console.log('222')
      setUserData(userPermission);
      ownList = _.cloneDeep(userPermission);
      filterNoCheckedParentNode(userPermission,permissionDataList)
    }
  }, [userPermission])

  const onCheck = (checkedKeys,e) => {
    // console.log('checkedKeys', checkedKeys, "e",e,);
    //注意：halfCheckedKeys 是没有全部勾选状态下的父节点
    let concatTreeData =  checkedKeys.concat(e.halfCheckedKeys);
    onCheckTreeFun(concatTreeData)
    setUserData(checkedKeys)
  }
  
  // 克隆userData
  // let ownList = _.cloneDeep(userdata);
  
  
  // 对比判断是否权限节点
  const compareList = (data, List)=>{
    if(_.isEmpty(data) || _.isEmpty(List)) return;
    data.map((item, index) => {
      if(item.children){
        // 获取元对象
        const parObj = List.find(obj => obj.permissionId == item.permissionId);
        // console.log(item.children.sort(), parObj.children.sort())
        // console.log('isEqual',!_.isEqual(item.children.sort(), parObj.children.sort()))
        // 比较children是否相同
        if(!_.isEqual(item.children.sort(), parObj.children.sort())){
          // 删除父元素
          deletePar(item.permissionId);
        };
        compareList(item.children, parObj.children)
      }
    })
  }
  // 删除父元素
  const deletePar = (id) => {
    // console.log(id)
    
    var index = ownList.indexOf(id.toString());
    // console.log(index)
    if (index > -1) {
      ownList.splice(index, 1);
    }
    // console.log('ownList',ownList)
    setUserData([...ownList]);
  }


  // 过滤掉没有子节点没有被权限的父节点
  const filterNoCheckedParentNode = (userList=[], dataList=[]) =>{
    let list = _.cloneDeep(userList);
    // 拷贝一个用户路由
    let copyList = []
    list.map(item=>{
      let itemNode = dataList.filter(v=>v.permissionId == item)
      if(!_.isEmpty(itemNode)){
        copyList.push(itemNode[0])
      }
    })
    compareList(getTreeData(copyList || []), getTreeData(permissionDataList || []))
  }

  return (
    <div className={styles.treeBox}>
      <Tree 
        checkable
        autoExpandParent={true}
        defaultExpandAll={true}
        showCheckedStrategy={TreeSelect.SHOW_ALL}
        placeholder="选择权限"
        onCheck={onCheck}
        treeData={getTreeData(permissionDataList || [])}
        multiple={true}
        checkedKeys={userdata}
      />
    </div>
  )
}

TreeCom = forwardRef(TreeCom);

export default TreeCom;
