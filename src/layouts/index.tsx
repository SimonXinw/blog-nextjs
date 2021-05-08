/*
 * @Author: your name
 * @Date: 2021-04-29 14:34:24
 * @LastEditTime: 2021-05-08 17:57:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-umi\src\layouts\index.tsx
 */
import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import Header from './component/Header';
import './index.css';

const BasicLayout: React.FC = props => {
  return (
    <div className="page">
      <Header />
      {props.children}
    </div>
  );
};

export default BasicLayout;
