/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-24 10:51:22
 * @LastEditTime: 2020-07-24 14:12:11
 */ 
 
// 数组去重
export const listRemoveRepeat = (x) =>{
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
}

// 数组差集
export const listDifference = (x, y) =>{
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
  return listRemoveRepeat(clone);
}

// 数组并集
export const listConcat = (x, y) =>{
  return listRemoveRepeat(x.concat(y));
}

// 数组交集
export const listIntersection = (x, y) =>{
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
  return listRemoveRepeat(result);
}