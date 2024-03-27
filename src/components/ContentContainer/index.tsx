import * as React from 'react';
import styles from './index.module.css';

interface PropsType {
  children?: React.ReactNode;
  title?: React.ReactNode;
  className?: string;
  style?: any;
}

const ContentContainer = ({ children, title, style, className, ...props }: PropsType) => {
  return (
    <div className={`${styles['content-container']} ${className}`} style={style} {...props}>
      {title && <div className={styles['title']}>{title}</div>}

      {children}
    </div>
  );
};

export default ContentContainer;
