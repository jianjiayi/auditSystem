/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-23 09:33:03
 * @LastEditTime: 2020-07-21 10:55:18
 */ 
const darkThemePublicStyles = {
  '@table-selected-row-bg': '#30303d !important',
  '@menu-dark-bg': '#3e3e3e',
  '@layout-sider-background': '#3e3e3e !important',
  '@menu-dark-submenu-bg': '#3e3e3e'
};

export const themeConfig = {
  theme: [
    { key: 'dust', fileName: 'dust.css', modifyVars: { '@primary-color': '#F5222D' } },
    { key: 'volcano', fileName: 'volcano.css', modifyVars: { '@primary-color': '#FA541C' } },
    { key: 'sunset', fileName: 'sunset.css', modifyVars: { '@primary-color': '#FAAD14' } },
    { key: 'cyan', fileName: 'cyan.css', modifyVars: { '@primary-color': '#13C2C2' } },
    { key: 'green', fileName: 'green.css', modifyVars: { '@primary-color': '#52C41A' } },
    { key: 'geekblue', fileName: 'geekblue.css', modifyVars: { '@primary-color': '#2F54EB' } },
    { key: 'purple', fileName: 'purple.css', modifyVars: { '@primary-color': '#722ED1' } },
    { key: 'dark', fileName: 'dark.css', theme: 'dark', modifyVars: darkThemePublicStyles },
    { key: 'dust', theme: 'dark', fileName: 'dark-dust.css', modifyVars: { '@primary-color': '#F5222D', ...darkThemePublicStyles } },
    { key: 'volcano', theme: 'dark', fileName: 'dark-volcano.css', modifyVars: { '@primary-color': '#FA541C', ...darkThemePublicStyles } },
    { key: 'sunset', theme: 'dark', fileName: 'dark-sunset.css', modifyVars: { '@primary-color': '#FAAD14', ...darkThemePublicStyles } },
    { key: 'cyan', theme: 'dark', fileName: 'dark-cyan.css', modifyVars: { '@primary-color': '#13C2C2', ...darkThemePublicStyles } },
    { key: 'green', theme: 'dark', fileName: 'dark-green.css', modifyVars: { '@primary-color': '#52C41A', ...darkThemePublicStyles } },
    { key: 'geekblue', theme: 'dark', fileName: 'dark-geekblue.css', modifyVars: { '@primary-color': '#2F54EB', ...darkThemePublicStyles } },
    { key: 'purple', theme: 'dark', fileName: 'dark-purple.css', modifyVars: { '@primary-color': '#722ED1', ...darkThemePublicStyles } }
  ],
  // min: false, // 是否压缩css
  // isModule: true, // css module
  // ignoreAntd: false, // 忽略 antd 的依赖
  // ignoreProLayout: false, // 忽略 pro-layout
  // cache: false // 不使用缓存
};