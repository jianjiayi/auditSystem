/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-24 10:51:22
 * @LastEditTime: 2020-08-20 18:58:14
 */ 


/**
 * @name: 数组扩展
 */
export const ExArray = {
  // 数组扁平化
  flatten(sliderMenus) {
    let newArr = []
    let i = 0;
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
  },
  // 数组多维化
  
  // 数组去重
  listRemoveRepeat(x) {
    let result = [];
    for (let i = 0; i < x.length; i++) {
      let flag = true;
      let temp = x[i];
      for (let j = 0; j < result.length; j++) {
        // 普通数组 (temp === result[j])
        if (temp.id === result[j].id) {
          flag = false;
          break;
        }
      }
      if (flag) {
        result.push(temp);
      }
    }
    return result;
  },
  // 数组差集
  listDifference(x, y) {
    let clone = x.slice(0);
    for (let i = 0; i < y.length; i++) {
      let temp = y[i];
      for (let j = 0; j < clone.length; j++) {
        // 普通数组 (temp === clone[j])
        if (temp.id === clone[j].id) {
          clone.splice(j, 1);
        }
      }
    }
    return this.listRemoveRepeat(clone);
  },
  // 数组并集
  listConcat(x, y){
    return this.listRemoveRepeat(x.concat(y));
  },
  // 数组交集
  listIntersection(x, y) {
    let result = [];
    for (let i = 0; i < y.length; i++) {
      let temp = y[i];
      for (let j = 0; j < x.length; j++) {
        // 普通数组 (temp === clone[j])
        if (temp.id === x[j].id) {
          result.push(temp);
          break;
        }
      }
    }
    return this.listRemoveRepeat(result);
  },
}


/**
 * 时间处理
 */
export const ExTime = {
  // 获取当前时间 2020-07-30 15:42:31
  curentTime() { 
    var date = new Date();
    var year = date.getFullYear(),
      month = ("0" + (date.getMonth() + 1)).slice(-2),
      sdate = ("0" + date.getDate()).slice(-2),
      hour = ("0" + date.getHours()).slice(-2),
      minute = ("0" + date.getMinutes()).slice(-2),
      second = ("0" + date.getSeconds()).slice(-2);
    // 拼接
    var result = year + "-"+ month +"-"+ sdate +" "+ hour +":"+ minute +":" + second;
    // 返回
    return result;
  }
}

/**
* 对参数处理
*/ 
export const ExParams = {
  // 针对get处理的参数，将json转化成"?params=value&params1=value1"
  getParams (obj) {
    let result = '';
    let item;
    for (item in obj) {
      if (obj[item] && String(obj[item])) {
        result += `&${item}=${obj[item]}`;
      }
    }
    if (result) {
      result = '?' + result.slice(1);
    }
    return result;
  }
}

/**
* 获取对象第一个属性值
*/ 
export const ExObject = {
  //获取随机第一个
  getFirstValue (data){
    return Object.keys(data)[0]
  },
  // 去掉对象中value==空的元素
  getValidParams (params){
    for(let key in params){
      if(!params[key]){
        console.log(key)
        delete params[key]
      } 
    }

    return params;
  }
}

