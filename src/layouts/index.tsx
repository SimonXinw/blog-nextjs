/*
 * @Author: your name
 * @Date: 2021-04-29 14:34:24
 * @LastEditTime: 2021-04-30 19:10:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-umi\src\layouts\index.tsx
 */
import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import Header from './component/Header';
import styles from './index.css';

const BasicLayout: React.FC = props => {
  console.log(props);
  return (
    <div className={styles.layouts}>
      <Header />
      {props.children}
    </div>
  );
};

export default BasicLayout;
