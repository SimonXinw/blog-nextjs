import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import styles from './index.css';

const Header: React.FC = props => {
  console.log(props);
  return (
    <div className={styles.header}>
      <div className={styles['header-left']}>
        <span className={styles['header-left-text']}>
          <a className={styles.logo} href="http://www.xinwangblog.cn/">
            XINWANGBLOG
          </a>{' '}
        </span>
        <span className={styles['header-left-text']}></span>
      </div>
      <div className="header-right">
        <span className={styles['header-right-text']}>{<UserOutlined />}</span>
        <span className={styles['header-right-text']}>{<QuestionCircleOutlined />}</span>
      </div>
    </div>
  );
};

export default Header;
