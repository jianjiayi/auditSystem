/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-06-24 09:11:52
 * @LastEditTime: 2020-06-28 18:01:16
 */ 
import React, { useState } from 'react';
import { Drawer, Button, Switch, Icon } from 'antd';
import classNames from 'classnames';
import {colorConfig, changeColor} from '@utils/theme.js';
import styles from './theme.module.less'


const darkconfig = [
  {
    key: 'dark',
    value: require('../../assets/svg/dark.svg')
  },
  {
    key: 'realdark',
    value: require('../../assets/svg/realDark.svg')
  },
]

function Theme(props) {
  // 抽屉
  const [visible, setVisible] = useState(false);
  const onClose = () => {
    setVisible(false)
  };

  const { navTheme, primaryColor, onSettingChange } = props;

  const switchHeader= ()=>{

  }

  return (
    <div className={classNames(props.className, styles.container)}>
      <div className={styles.setting}>
        <span>切换主题</span> 
        <Icon type="setting" onClick = {()=> {setVisible(true)}}/>
      </div>
      <Drawer
        title="网站设置"
        placement={'right'}
        closable={false}
        onClose={onClose}
        visible={visible}
        key={'right'}
      >
        <div className={styles.block_div}>
          <h4>整体风格设置</h4>
          <div className={styles['theme-list']}>
            {
              darkconfig.map((item, index) => {
                return <i className={styles.item} style ={{'background':'url('+item.value+')'}} key={index} onClick={() => onSettingChange({'navTheme':item.key})}>
                    {navTheme === item.key && <i className={styles.active}>√</i>}
                  </i> 
              })
            }
          </div>
        </div>
        <div className={styles.block_div}>
          <h4>主题色</h4>
          <div className={styles.color_list}>
            {
              colorConfig.map((item, index) => {
                return <i className={styles.item} style ={{'background':item.color}} key={index} onClick={() => onSettingChange({'primaryColor':item.key})}>
                    {primaryColor === item.key && <i className={styles.active}>√</i>}
                  </i> 
              })
            }
          </div>
        </div>
        <div className={styles.block_div}>
          <h4>其他设置</h4>
          <ul className={styles.text_list}>
            <li className={styles.item}>
              <span>固定Header</span>
              <Switch size="small" defaultChecked onChange={(value)=>{onSettingChange({'fixedHeader': value})}} />
            </li>
          </ul>
        </div>
        
      </Drawer>
      
    </div>
  )
}

export default Theme
