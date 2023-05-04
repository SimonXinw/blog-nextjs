import React from 'react';
import { BarChartOutlined, UserOutlined, BugOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import styles from './index.module.css';
import Link from 'next/link';

const PageHeader: React.FC = () => {
  return (
    <nav className={styles['header']}>
      <Space size={[24, 0]} wrap align="center">
        <Link href="/admin/craw">
          <BugOutlined style={{ fontSize: '24px' }} />
        </Link>
        <Link href="/admin">
          <UserOutlined style={{ fontSize: '24px' }} />
        </Link>
      </Space>
    </nav>
  );
};

export default PageHeader;
