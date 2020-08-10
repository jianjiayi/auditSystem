/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-08-10 14:54:23
 * @LastEditTime: 2020-08-10 15:39:34
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