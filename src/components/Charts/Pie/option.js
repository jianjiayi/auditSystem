/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-10 13:53:04
 * @LastEditTime: 2020-08-10 16:16:40
 */ 
import echarts from 'echarts/lib/echarts';

export default {
  title: {
    text: '666',
    left: 'center',
    top: '49%',
    textStyle: {
      fontSize: 16,
      color: '#3C4353',
      fontStyle: 'normal',
      fontWeight: '400',
      fontFamily: 'PingFangSC-Regular,PingFang SC;',
    }
  },
  color: ['#7eacea', '#e15777', '#95ea71', '#ea9b4f', '#7577df', '#be72d8', '#fff'],
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  series: [{
    name: '统计',
    type: 'pie',
    radius: [30, 110],
    center: ['50%', '50%'],
    roseType: 'radius',
    label: {
        show: true,
        formatter: '{d}%',
    },
    emphasis: {
        label: {
            show: true
        }
    },
    data: [{
        value: 25,
        name: 'rose1'
      },
      {
        value: 20,
        name: 'rose2'
      },
      {
        value: 15,
        name: 'rose3'
      },
      {
        value: 10,
        name: 'rose4'
      },
      {
        value: 8,
        name: 'rose5'
      },
      {
        value: 3,
        name: 'rose6'
      },
    ]
  }, {
    name: '占位',
    type: 'pie',
    silent: true,
    center: ['50%', '50%'],
    radius: 30,
    hoverAnimation: false,
    label: {
      show: false,
      position: 'center'
    },
    data: [
      {
        value: 1,
        name: '占位2'
      },
    ],
    itemStyle: {
      normal: {
        color: '#fff',
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowBlur: 10,
      },
    }
  },]
}


