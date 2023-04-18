import React, { useEffect } from 'react';
import Image from 'next/image';
import styles from './index.module.css';

import { randomColor, linearMotion } from '@/utils';

interface PropsTs {
  className?: string;
  onClick: (e: MouseEvent) => void;
}

const Ewm: React.FC<PropsTs> = (props) => {
  const { className, ...arg } = props;

  useEffect(() => {
    linearMotion({
      speedX: 1,
      speedY: 1,
      ms: 20,
      className: '.' + styles.ewm,
    });

    // 卸载时
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styles.ewm} ${className}`} {...arg}>
      <Image
        className={styles['ewm-img']}
        width={100}
        height={100}
        alt="二维码"
        src="https://cdn.xinwangblog.cn/imgs/ewm.png"
      />
    </div>
  );
};

export default Ewm;
