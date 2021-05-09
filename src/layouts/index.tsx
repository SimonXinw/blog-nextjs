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
import Footer from './component/Footer';
import './index.css';

const mainStyle: any = {
  flex: 1,
  overflowY: 'auto',
};
const pageStyle: any = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
};

const BasicLayout: React.FC = props => {
  return (
    <div className="page" style={pageStyle}>
      <Header />
      <div className="main" style={mainStyle}>
        {props.children}
      </div>

      <Footer />
    </div>
  );
};

export default BasicLayout;
