/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-08-11 14:09:05
 * @LastEditTime: 2020-08-11 15:44:19
 */
// 将多维数组转化成一维数组

let newArr = []
const renderMenuItem = (sliderMenus) => {
  sliderMenus.map(route => {
    if(!route.routes){
      newArr.push(route)
    }else{
      const {routes, ...rest} = route;
      newArr.push(rest);

      renderMenuItem(routes);
    }
  })
};
renderMenuItem(sliderMenus)
console.log('newArr',newArr)