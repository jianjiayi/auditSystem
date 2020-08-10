/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-08-10 14:49:47
 * @LastEditTime: 2020-08-10 15:39:26
 */
export default function(option, data) {

  return {
    tooltip: {
      ...option.tooltip,
      // ...tooltip,
    },
    animationDelayUpdate: function (idx) {
      return idx * 5;
    },
    ...option,
    ...data,
  };
}