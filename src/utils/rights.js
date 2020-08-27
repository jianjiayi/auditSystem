/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-08-17 13:33:42
 * @LastEditTime: 2020-08-27 09:18:12
 */
import _ from 'lodash';

// 获取用户权限树数据
export function getTreeData(dataPermissions){
  // 深拷贝权限
  let permissions = _.cloneDeep(dataPermissions);
  // 获取顶层路由
  let treeData = permissions.filter((item)=> item.parentId == 0) || [];
  
  // 生成权限树
  const getPermissionsTree = (routes, data)=>{
    if(routes.length == 0) return [];
    routes.map((item, index) => {
      item['title'] = item.permissionName;
      item['value'] = item.permissionId;
      item['key'] = item.permissionId;
      // item['checked'] = 'true';

      let children = data.filter((v)=> v.parentId == item.permissionId)
      if(children.length > 0){
        item.children = children;
        getPermissionsTree(children, data)
      }
    })
  }

  getPermissionsTree(treeData, permissions);

  return treeData;
}

// 本地路由一维话
export const getLocalRoutesFlatten = (sliderMenus) => {
  let newArr = []
  let i = 1;
  const renderMenuItem = (sliderMenus,parentId) => {
    sliderMenus.map(route => {
      route['id'] = i++;
      route['parentId'] = parentId;
      if(!route.routes){
        newArr.push(route)
      }else{
        const {routes, ...rest} = route;
        newArr.push(rest);

        renderMenuItem(routes, i-1);
      }
    })
  };
  renderMenuItem(sliderMenus,0)
  return newArr;
}

// 获取系统路由菜单
export const getSliderMenusList = (dataPermissions, sliderMenus) =>{
  // 深拷贝权限
  let permissions = _.cloneDeep(dataPermissions) || [];
  // 获取所有路由
  const getRouteRights = (data)=>{
    return data.filter((item)=> item.type == 0);
  }
  // 临时存放符合的路由
  let routes = []
  // 对比路由
  getLocalRoutesFlatten(sliderMenus).map((item,index) => {
    getRouteRights(permissions).map((value, idx) => {
      if(item.path === value.permissionUrl){
        routes.push(item);
        return;
      }
    })
  })

  // console.log(routes)
  // console.log(getRouteRights(permissions))
  // console.log(getLocalRoutesFlatten(sliderMenus))

  // 生成能用的路由
  let treeData = routes.filter((item)=> item.parentId == 0) || [];
  
  // 生成权限树
  const getPermissionsTree = (routes, data)=>{
    if(routes.length == 0) return [];
    routes.map((item, index) => {
      let routesArr = data.filter((v)=> v.parentId == item.id)
      if(routesArr.length > 0){
        item.routes = routesArr;
        getPermissionsTree(routesArr, data);
      }
    })
  }
  getPermissionsTree(treeData, routes);
  // console.log(treeData)

  return treeData;
}


// 获取当前路由下的所有按钮权限
export const getNowRoutePermission = (pathname, dataPermissions) => {
  if(pathname == '/setting'){
    pathname = pathname+'/'
  }
  if(pathname == '/statistics/personnel'){
    pathname = pathname+'/'
  }

  if(pathname == '/queue/cdetails' || pathname == '/search/cdetails'){
    pathname = '/:type/cdetails';
  }

  // console.log(dataPermissions)
  let nowRoute = dataPermissions.find((item) => item.permissionUrl == pathname);
  // 获取所有按钮
  const btnPermission = dataPermissions.filter((item)=> item.parentId == nowRoute.permissionId && item.type == 1);
  // console.log(btnPermission);
  return btnPermission;
}