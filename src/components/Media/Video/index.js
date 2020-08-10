/*
 * @Descripttion: 
 * @version: 
 * @Author: big bug
 * @Date: 2020-07-01 10:07:19
 * @LastEditTime: 2020-08-10 09:47:33
 */ 
import React, {useState, useRef} from 'react';
import classNames from 'classnames';
import styles from './index.module.less';

function VideoPlayer(props) {
  const videoRef = useRef(null)
  const [showOverlay, setShowOverlay] = useState(true);
  const [hasControls, setHasControls] = useState(false)
  const {className, name, source, poster, duration} = props;

  const onPlay = () =>{
      const video = videoRef.current;
      video.play();
      setShowOverlay(false);
      setHasControls(true)
  }
  const onEnded = () =>{
      setShowOverlay(true);
  }

  return (
    <div className={styles["video-player"]}>
      <video
        ref={videoRef}
        controls={hasControls}
        controlsList="nodownload"
        src={source}
        poster={poster}
        // ended={()=>onEnded()}
      >
      </video>
      {
        showOverlay &&
        <div className={styles["video-overlay"]} style={{backgroundImage: `url(${poster})`}}>
          <a className={styles["btn-play"]} onClick={()=>onPlay()}></a>
          <span className={styles["duration-wrap"]}>
            <i className={styles["icon"]}></i><span className={styles["duration"]}>{duration}</span>
          </span>
        </div>
      }
      
    </div>
  )
}

export default VideoPlayer;
