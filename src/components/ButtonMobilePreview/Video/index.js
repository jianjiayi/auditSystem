/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-02 10:00:50
 * @LastEditTime: 2020-08-24 15:35:27
 */ 
import React from 'react';
import { VideoPlayer } from '@components/Media';

import { ExTime } from '@utils/utils.js';

import styles from './index.module.less';

function Video(props) {
  const { curArt = {} } = props;
  const videoProps = {
    source: 'http://luckyvideo.peopletech.cn/production/mp4/20200603/lucky_cms05b31d0f-82c1-4273-a4c5-02f01e2fad9b.mp4',
    poster: 'http://luckyimgs.peopletech.cn/image/20200603/ZXB-ORIGIN-4364976/lucky_cms57e028c6-8302-42e5-9c86-53786b27703d.jpg',
    duration: '02:15',
  }
  
  const textHtml = {__html:curArt.text};
  return (
    <div className="">
      <VideoPlayer {...videoProps}></VideoPlayer>
      <div className={styles.normal}>
        <p className={styles.title}>{curArt.title}</p>
        <p className={styles.source}>
            {curArt.createtime && <span>{ExTime.formatDate(curArt.createtime)}</span>}
            {
              curArt.origin.length > 5 && <br/>
            }
            <span> 来源：{curArt.origin}</span>
        </p>
        <div className={styles['content-detail']} dangerouslySetInnerHTML={textHtml}></div>
      </div>
    </div>
    
  )
}

export default Video;
