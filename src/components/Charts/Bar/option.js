/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-10 13:53:04
 * @LastEditTime: 2020-08-10 15:29:36
 */ 
import echarts from 'echarts/lib/echarts';

export default {
  legend: {
    textStyle:{
      color:'#9B9B9B'
    },
    right:37,
    top: 22,
  },
  grid: {
    left: '25',
    right: '25',
    bottom: '24',
    top: '25',
    containLabel: true
  },
  tooltip: {},
  xAxis: {
    type: 'category',
    axisLine:{
      show: false,
      lineStyle:{
        color:'rgba(210,211,214,0.3)'
      }
    },
    splitLine: {
      show: true,
      lineStyle:{
        type:'dashed',
        color:'rgba(210,211,214,0.3)',
      }
    },
    axisLabel:{
      color:'rgba(255,255,255,0.9)',
    },
    data: ['first', 'two', 'three', 'four', 'five']
  },
  yAxis: {
    inverse: false,
    axisLine:{
      show: false,
      lineStyle:{
        color:'rgba(255,255,255,0.4)'
      }
    },
    axisTick:{
      show:false
    },
    splitLine:{
      show:true,
      lineStyle:{
        type:'dashed',
        color:'rgba(210,211,214,0.3)',
      }
    },
  },
  series: [
    {
      type: 'bar',
      barWidth:20,
      label: {
        show: true,
        position: 'top',
        textStyle:{
          color:'#ffffff'
        }
      },
      itemStyle:{
        normal:{
          color:  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: 'rgba(89,208,207,1)'
          },{
            offset: 1,
            color: 'rgba(0,28,189,0)'
          }])
        }
      },
      data: [60, 132, 89, 134, 60],
      animationDelay: function (idx) {
        return idx * 900;
      }
    }
  ]
}


