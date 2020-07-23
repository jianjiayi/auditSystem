/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-10 14:39:10
 * @LastEditTime: 2020-06-11 16:57:28
 */ 
function seriesCreator(series) {
  if(series.length =0 ){
    return [{
      type: 'bar',
    }]
  }
  
  return series.map(e => ({
    type: 'bar',
    ...e,
  }));
}

export default function(option, data) {
  // console.log(data)
  const { tooltip, xAxis, yAxis, yCategory, series = [], ...rest } = data;

  return {
    ...option,
    xAxis,
    tooltip: {
      ...option.tooltip,
      ...tooltip,
    },
    yAxis: {
      ...option.yAxis,
      ...yAxis,
      data: yCategory || [],
    },
    series,
    ...rest,
  };
}
