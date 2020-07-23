/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-23 15:15:13
 * @LastEditTime: 2020-06-29 14:23:41
 */ 

export const colorConfig = [
  {
    key: 'dust',
    color: '#F5222D',
  },
  {
    key: 'volcano',
    color: '#FA541C',
  },
  {
    key: 'sunset',
    color: '#FAAD14',
  },
  {
    key: 'cyan',
    color: '#13C2C2',
  },
  {
    key: 'green',
    color: '#52C41A',
  },
  {
    key: 'geekblue',
    color: '#2F54EB',
  },
  {
    key: 'purple',
    color: '#722ED1',
  },
]


const hide = ()=> {
  return null;
};

export const changeColor = (params) => {
  const {dark, color} = params;
  console.log(dark, color)
  var publicPath = './theme';
  var href = dark === 'realdark' ? "".concat(publicPath, "/dark") : "".concat(publicPath, "/"); // 如果是 dark，并且是 color=daybreak，无需进行拼接

  var colorFileName = dark === 'realdark' && color ? "-".concat(encodeURIComponent(color)) : encodeURIComponent(color || '');

  if (color === 'daybreak' && dark) {
    colorFileName = '';
  }

  console.log(colorFileName)
  
  var dom = document.getElementById('theme-style'); // 如果这两个都是空

  if (!href && !colorFileName) {
    if (dom) {
      dom.remove();
      localStorage.removeItem('site-theme');
    }

    return;
  }

  // console.log('2222')

  var url = "".concat(href).concat(colorFileName || '', ".css");

  console.log(url)

  if (dom) {
    dom.onload = function () {
      window.setTimeout(function () {
        hide();
      });
    };

    dom.href = url;
    
  } else {
    var style = document.createElement('link');
    style.type = 'text/css';
    style.rel = 'stylesheet';
    style.id = 'theme-style';
    style.href = url;
    console.log('style.href = url;',style.href)
    // style.onload = function () {
    //   window.setTimeout(function () {
    //     hide();
    //   });
    // };
    console.log(';;;',url)
    console.log('...',style)
    if (document.body.append) {
      document.body.append(style);
    } else {
      document.body.appendChild(style);
    }
  }
  
}