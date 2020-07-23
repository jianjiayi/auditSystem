/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-22 09:42:14
 * @LastEditTime: 2020-07-22 11:01:31
 */ 
import React from 'react';
import LazyImgComponent from '@components/LazyImgComponent';
import styles from './index.module.less';

const imgSrc = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594206524731&di=6def06b6063c7e2b4e081d43418dea0a&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F64%2F76%2F20300001349415131407760417677.jpg'

function UserCenter() {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <span className={styles.lebal}>用户昵称</span>
          <div className={styles.centent}>哈哈哈哈</div>
        </li>
        <li className={styles.item}>
          <span className={styles.lebal}>用户头像</span>
          <div className={styles.centent}>
            <div className={styles.head}>
              <LazyImgComponent 
                hover = {false}
                src = {imgSrc}
                className = {styles['head-img']}>
              </LazyImgComponent>
            </div>
          </div>
        </li>
        <li className={styles.item}>
          <span className={styles.lebal}>用户角色</span>
          <div className={styles.centent}>管理员</div>
        </li>
        <li className={styles.item}>
          <span className={styles.lebal}>所属业务线</span>
          <div className={styles.centent}>聚合分发</div>
        </li>
        <li className={styles.item}>
          <span className={styles.lebal}>用户权限</span>
          <div className={styles.centent}>
            <ul className="">
              <li className=""></li>
            </ul>
          </div>
        </li>
        <li className={styles.item}>
          <span className={styles.lebal}>操作记录</span>
          <div className={styles.centent}>哈哈哈哈</div>
        </li>
      </ul>
    </div>
  )
}

export default UserCenter;
