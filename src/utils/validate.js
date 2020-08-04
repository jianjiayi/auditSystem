/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-29 13:38:01
 * @LastEditTime: 2020-07-31 14:21:44
 */ 
// 标题文字长度校验
const calcStrLength = (value) => {
  return Math.ceil(calcByteLength(value) / 2);
}
const calcByteLength = (s) => {
  return s.replace(/[^\x00-\xff]/g, 'aa').length;
}
export const validateTextLength  = (rule, value, callback) => {
  if (calcStrLength(value) > 8) {
    callback('最多可输入8个字'); // 校验未通过
  }
  callback(); // 校验通过
}