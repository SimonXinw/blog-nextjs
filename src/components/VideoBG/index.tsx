import React from 'react';
import styles from './index.module.css';

interface PropsTs {
  className?: string;
}

const VideoBG: React.FC<PropsTs> = (props) => {
  const { className, ...arg } = props;

  

  return (
    <div className={`${styles['video-wrap']} ${className}`} {...arg}>
      <video className={styles['bg-video']} loop muted preload="auto" autoPlay>
        <source src="https://cdn.xinwangblog.cn/videos/video_bg_girl_16m.mp4" />
        <source src="https://cdn.xinwangblog.cn/videos/video_bg_girl_16m.mp4" />
      </video>
    </div>
  );
};

export default VideoBG;
