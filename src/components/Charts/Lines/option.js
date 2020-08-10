/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-10 13:53:04
 * @LastEditTime: 2020-08-10 16:08:57
 */

const chartList = [{"key":"15:08","value":"19"},{"key":"15:09","value":"23"},{"key":"15:10","value":"21"},{"key":"15:11","value":"25"},{"key":"15:12","value":"24"},{"key":"15:13","value":"39"},{"key":"15:14","value":"27"},{"key":"15:15","value":"23"},{"key":"15:16","value":"22"},{"key":"15:17","value":"22"},{"key":"15:18","value":"27"},{"key":"15:19","value":"26"},{"key":"15:20","value":"36"},{"key":"15:21","value":"43"},{"key":"15:22","value":"43"},{"key":"15:23","value":"27"},{"key":"15:24","value":"15"},{"key":"15:25","value":"16"},{"key":"15:26","value":"35"},{"key":"15:27","value":"32"},{"key":"15:28","value":"26"},{"key":"15:29","value":"9"},{"key":"15:30","value":"17"},{"key":"15:31","value":"32"},{"key":"15:32","value":"19"},{"key":"15:33","value":"22"},{"key":"15:34","value":"20"},{"key":"15:35","value":"19"},{"key":"15:36","value":"24"},{"key":"15:37","value":"32"},{"key":"15:38","value":"26"},{"key":"15:39","value":"30"},{"key":"15:40","value":"18"},{"key":"15:41","value":"30"},{"key":"15:42","value":"24"},{"key":"15:43","value":"33"},{"key":"15:44","value":"33"},{"key":"15:45","value":"28"},{"key":"15:46","value":"29"},{"key":"15:47","value":"15"},{"key":"15:48","value":"32"},{"key":"15:49","value":"12"},{"key":"15:50","value":"27"},{"key":"15:51","value":"25"},{"key":"15:52","value":"29"},{"key":"15:53","value":"17"},{"key":"15:54","value":"54"},{"key":"15:55","value":"36"},{"key":"15:56","value":"27"},{"key":"15:57","value":"23"},{"key":"15:58","value":"34"},{"key":"15:59","value":"30"},{"key":"16:00","value":"36"},{"key":"16:01","value":"27"},{"key":"16:02","value":"34"},{"key":"16:03","value":"38"},{"key":"16:04","value":"22"},{"key":"16:05","value":"17"},{"key":"16:06","value":"28"},{"key":"16:07","value":"20"}]

export default {
    title: {
    },
    tooltip: {
      formatter: function (params) {
        return '入库新闻量'+'<br/>'+params.marker+ params.data
      }
    },
    grid: {
      left: '25',
      right: '25',
      bottom: '24',
      top: '15',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      position: 'bottom',
      data: chartList.map(item=>(item.key)),
      axisLabel: {
        color: '#999',
        textStyle: {
          fontSize: 12
        },
      },
      splitLine: {
        show: false,
        lineStyle:{
          type:'dashed'
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(210,211,214,0.3)',
          type:'dashed'
        }
      }
    },
    yAxis: {
      type: 'value',
      inverse: false,
      axisLabel: {
        color: '#999',
        textStyle: {
          fontSize: 12
        },
      },
      splitLine: {
        show: true,
        lineStyle:{
          type:'dashed'
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
    },
    series: [{
      name: '入库新闻量',
      type: 'line',
      smooth: true,
      symbol: "none",
      data: chartList.map(item=>(item.value)),
      animationDelayUpdate: function (idx) {
        return idx * 100;
      },
      lineStyle:{
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'rgba(103,255,166,1)' // 0% 处的颜色
          }, {
            offset: 1,
            color: 'rgba(52,191,255,1)' // 100% 处的颜色
          }],
          globalCoord: false // 缺省为 false
        }
      }
    }],
  }