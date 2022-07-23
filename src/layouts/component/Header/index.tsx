import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  UserOutlined,
  QuestionCircleOutlined,
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import styles from './index.css';
const { SubMenu, Item } = Menu;

const Header: React.FC = props => {
  const [currentIcon, setCurrentIcon] = useState('mail');
  const handleClick = e => {
    console.log('click ', e);
    setCurrentIcon(e.key);
  };
  return (
    <div className={styles.header}>
      <div className={styles['header-left']}>
        <div className={styles['header-left-text']}>
          <a className={styles.logo} href="http://49.234.210.170/">
            XINWANGBLOG
          </a>
        </div>
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
