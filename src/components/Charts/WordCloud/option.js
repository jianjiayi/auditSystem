/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-10 13:53:04
 * @LastEditTime: 2020-08-10 16:09:07
 */

const list = [{"name":"中国","value":"1686"},{"name":"美国","value":"1232"},{"name":"特朗普","value":"392"},{"name":"网友","value":"387"},{"name":"印度","value":"319"},{"name":"男子","value":"313"},{"name":"疫情","value":"312"},{"name":"华为","value":"305"},{"name":"女子","value":"289"},{"name":"警方","value":"278"},{"name":"世界","value":"263"},{"name":"新冠","value":"255"},{"name":"孩子","value":"237"},{"name":"台风","value":"223"},{"name":"北京","value":"216"},{"name":"曝光","value":"206"},{"name":"航母","value":"188"},{"name":"国家","value":"182"},{"name":"专家","value":"164"},{"name":"女儿","value":"158"},{"name":"空气质量","value":"153"},{"name":"全球","value":"144"},{"name":"项目","value":"138"},{"name":"病例","value":"136"},{"name":"市场","value":"134"},{"name":"导弹","value":"132"},{"name":"网警","value":"130"},{"name":"日本","value":"128"},{"name":"黎巴嫩","value":"124"},{"name":"俄罗斯","value":"118"}]
const randomNum = (...rest) =>{ 
  const [minNum, maxNum] = rest;
  switch(rest.length){ 
    case 1: 
      return parseInt(Math.random()*minNum+1,10); 
      break; 
    case 2: 
      return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
      break; 
    default: 
      return 0; 
      break; 
  } 
}
// 随机颜色
const color = [ 
  '#67FFA6',
  '#4273F9',
  '#59D0CF',
  '#00EBFF'
]

export default {
  tooltip: {
    show: false
  },
  series: [{
    type: 'wordCloud',
    gridSize: 20,
    sizeRange: [18, 50],
    // rotationRange: [-90,90],
    maskImage: '',
    textStyle: {
      normal: {
        color: function() {
          return color[randomNum(0, color.length - 1 )]
        }
      }
    },
    width: '2200px',
    height: '1000px',
    data: list
  }],
}