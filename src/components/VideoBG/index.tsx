import React from 'react';
import styles from './index.module.css';

interface PropsTs {
  className?: string;
  src: string;
}

const VideoBG: React.FC<PropsTs> = (props) => {
  const { className, src, ...arg } = props;

  return (
    <div className={`${styles['video-wrap']} ${className}`} {...arg}>
      <video
        className={`${styles['bg-video-1']} ${styles['bg-video']} `}
        loop
        muted
        preload="auto"
        autoPlay
      >
        <source src={src} />
        <source
          src={src}
          type="video/mp4"
        />
        您的浏览器不支持 HTML5 video 标签。
      </video>

      <video
        className={` ${styles['bg-video-2']} ${styles['bg-video']}  `}
        loop
        muted
        preload="auto"
        autoPlay
      >
        <source src={src} />
        <source
          src={src}
          type="video/mp4"
        />
        您的浏览器不支持 HTML5 video 标签。
      </video>
    </div>
  );
};

export default VideoBG;
