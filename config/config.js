/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-01 09:41:13
 * @LastEditTime: 2020-07-22 09:48:58
 */ 

// ref: https://umijs.org/config/
import { resolve } from 'path';
import { routesConfig } from '../src/router/index';
import { themeConfig } from './theme.config';
import proxy from './proxy';
// console.log(routesConfig)

export default {
  treeShaking: true, // 去除那些引用的但却没有使用的代码
  targets: {
    ie: 11,
  },
  routes: routesConfig,
  theme: {
    'primary-color': '#1890ff'
  },
  define: {
    // 开发环境下的地址配置
    'process.env.BUILD_TYPE': 'dev'
  },
  publicPath: './',
  hash: true, // 打包文件增加hash
  //html静态资源文件路径
  history: 'hash',
  outputPath: './dist',
  // 代理配置
  proxy: proxy,
  alias: {
    "@": resolve(__dirname, "../src/"),
    // 全局配置文件
    "@config": resolve(__dirname, "../src/config"),
    // 全局工具
    '@utils': resolve(__dirname, "../src/utils"),
    // 全局静态文件
    '@assets': resolve(__dirname, "../src/assets"),
    // 组件库
    '@components': resolve(__dirname, "../src/components"),
    // 全局models
    '@models': resolve(__dirname, "../src/models"),
    // request请求
    "@http": resolve(__dirname, '../src/utils/request.js')
  },
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dva: {
        immer: true
      },
      dynamicImport: false,
      title: '审核系统',
      dll: false,
      
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
    ['umi-plugin-antd-theme', themeConfig]
  ],
}
