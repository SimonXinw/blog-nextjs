/*
 * @Author: your name
 * @Date: 2021-04-29 14:34:24
 * @LastEditTime: 2021-04-30 17:58:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \react-umi\src\pages\index.tsx
 */
import React from 'react';
import styles from './index.css';

export default function() {
  return (
    <div className={styles.normal}>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>
          To get started, edit <code>src/pages/index.js</code> and save to reload.
        </li>
        <li>
          <a href="www.baidu.com" target="_blank">
            Getting Started
          </a>
        </li>
      </ul>
    </div>
  );
}
