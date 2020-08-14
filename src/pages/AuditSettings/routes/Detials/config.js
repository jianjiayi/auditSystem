/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-14 09:06:08
 * @LastEditTime: 2020-08-14 16:47:12
 */
// 规则配置
// const configRule = [
//   {
//     key: 0,
//     label: '无',
//     name: 'rparams0'
//   },
//   {
//     key: 1,
//     label: '违禁词',
//     name: 'rparams1'
//   },
//   {
//     key: 2,
//     label: '敏感词',
//     name: 'rparams2'
//   },
//   {
//     key: 3,
//     label: '热词',
//     name: 'rparams3'
//   },
//   {
//     key: 4,
//     label: '人物词',
//     name: 'rparams4'
//   },
//   {
//     key: 5,
//     label: '内容分值',
//     name: 'rparams5'
//   },
//   {
//     key: 6,
//     label: '媒体权重',
//     name: 'rparams6'
//   },
//   {
//     key: 7,
//     label: '媒体类型',
//     name: 'rparams7'
//   },
//   // {
//   //   key: 8,
//   //   label: '媒体分类',
//   //   name: 'rparams8'
//   // },
//   {
//     key: 9,
//     label: '媒体属性',
//     name: 'rparams9'
//   },
//   {
//     key: 10,
//     label: '媒体数据',
//     name: 'rparams10'
//   },
//   {
//     key: 11,
//     label: '涉黄',
//     name: 'rparams11'
//   },
//   {
//     key: 12,
//     label: '政暴恐',
//     name: 'rparams12'
//   },
//   {
//     key: 13,
//     label: '二维码',
//     name: 'rparams13'
//   },
//   {
//     key: 14,
//     label: '广告',
//     name: 'rparams14'
//   },
//   {
//     key: 15,
//     label: '特定词',
//     name: 'rparams15'
//   },
//   {
//     key: 16,
//     label: '时效性',
//     name: 'rparams16'
//   },
//   {
//     key: 17,
//     label: '审核机制',
//     name: 'rparams17'
//   },
//   {
//     key: 18,
//     label: '抓取来源',
//     name: 'rparams18'
//   },
//   {
//     key: 19,
//     label: '内容来源',
//     name: 'rparams19'
//   },
// ]

/**格式化敏感词规则*/ 
export const getDenyWordsKey = (name) =>{
  const words = [
    {
      key: 'sensitive',
      value: '敏感词'
    },
    {
      key: 'forbidden',
      value: '违禁词'
    },
    {
      key: 'hot',
      value: '热词'
    },
    {
      key: 'personage ',
      value: '人物词'
    },
  ];
  return words.find(item => {
    return item.value == name;
  })
}

/**是否展示包含选项*/
export const isShowInclude = (key) => {
  const arr = ['1','2','3','4','7','8','9','10','15','16','17','18','19'];
  if(arr.includes(key)){
    return true;
  }else{
    return false;
  }
}

/**格式化配置规则*/ 
export const getRulesItem = (key, configRule) => {
  let obj = {}
  if(key == 0) return obj;
  configRule.map(item => {
    if(key == item.id){
      return obj = item
    }
  })
  return obj;
} 

/** 输出配置规则下来选择项*/
export const getRules = (configRule) => {
  let obj = {}
  configRule.map(item => {
    if(item.id != 8){
      let key = item.id,
        value = item.name;
      obj[key] = value;
    }
  })
  return obj;
} 