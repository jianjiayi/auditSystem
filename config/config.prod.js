/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-01 14:03:39
 * @LastEditTime: 2020-07-21 09:30:14
 */ 
let type = process.argv.slice(3)[0];

let BUILD_TYPE = '';
switch (type) {
    case 'test':
      BUILD_TYPE = 'test1';
      break;
    case 'test1':
      BUILD_TYPE = 'test1';
      break;
    case 'test2':
      BUILD_TYPE = 'test2';
      break;
    // 生产
    case 'prod':
      BUILD_TYPE = 'prod';
      break;
}

export default {
  define:{
    "process.env.BUILD_TYPE": BUILD_TYPE,
  }
}