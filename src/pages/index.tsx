import React, { useState, useEffect } from 'react';
import styles from './index.css';
import { randomColor } from '@/utils';

const BlogUrlList = [
  {
    url: 'http://49.234.210.170/js/缓冲运动.html',
    name: '缓冲运动',
  },
  {
    url: 'http://49.234.210.170/js/缓冲运动碰壁.html',
    name: '缓冲运动碰壁',
  },
  {
    url: 'http://49.234.210.170/js/回到首页，触底.html',
    name: '回到首页，触底',
  },
  {
    url: 'http://49.234.210.170/js/轮播图.html',
    name: '轮播图',
  },
  {
    url: 'http://49.234.210.170/js/碰撞.html',
    name: '碰撞',
  },
  {
    url: 'http://49.234.210.170/js/拖动元素四边距.html',
    name: '拖动元素四边距',
  },
  {
    url: 'https://blog.csdn.net/qq_42877027/article/details/104959320',
    name: 'ajax',
  },
  {
    url: 'http://49.234.210.170/js/cookies.html',
    name: 'cookies',
  },
  {
    url: 'http://49.234.210.170/js/jsonp.html',
    name: 'jsonp',
  },
  {
    url: 'http://49.234.210.170/js/Magnifier/放大镜.html',
    name: '放大镜',
  },
  {
    url: 'https://blog.csdn.net/qq_42877027/article/details/104959936',
    name: '放大镜',
  },
  {
    url: 'http://49.234.210.170/js/购物车/todopst/todo.html',
    name: 'todopst',
  },
  {
    url: 'http://49.234.210.170/js/懒加载瀑布流/图片懒加载.html',
    name: '图片懒加载',
  },
  {
    url: 'http://49.234.210.170/js/日历.html',
    name: '日历',
  },
  {
    url: 'http://49.234.210.170/js/评分效果.html',
    name: '评分效果',
  },
  {
    url: 'http://49.234.210.170/js/懒加载瀑布流/瀑布流.html',
    name: '瀑布流',
  },
  {
    url: 'http://49.234.210.170/js/mobileApi.html',
    name: 'mobileApi',
  },
  {
    url: 'http://49.234.210.170/js/排序算法.html',
    name: '排序算法',
  },
  {
    url: 'http://49.234.210.170/js/双飞翼布局.html',
    name: '双飞翼布局',
  },
  {
    url: 'http://49.234.210.170/js/复利计算.html',
    name: '复利计算',
  },

  {
    url: 'http://49.234.210.170/js/滚动.html',
    name: '滚动',
  },

  {
    url: 'http://49.234.210.170/js/video.html',
    name: 'video',
  },

  {
    url: 'http://49.234.210.170/js/横屏video.html',
    name: '横屏video',
  },
];

export default function() {
  const [autorColor, setAutorColor] = useState('red');
  const autorColorStyle = {
    color: autorColor,
  };
  useEffect(() => {
    setInterval(() => {
      setAutorColor(randomColor());
    }, 500);
  }, []);
  // =============== dom ==================
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>藏轮阁</h1>
        <div className={styles.author} style={autorColorStyle}>
          辛望 (Simon)
        </div>
        {BlogUrlList.map((item, index) => {
          return (
            <p className={styles.row}>
              <a target="_blank" href={item.url} rel="noreferrer">
                {item.name}
              </a>
            </p>
          );
        })}
      </div>
      <div className={styles.ewm}>
        <img className={styles['ewm-img']} src="http://www.xinwangblog.cn/img/logo.png" />
      </div>
      <p className={styles['page-bottom']}>
        <a href="http://beian.miit.gov.cn">赣ICP备20003496号</a>
      </p>
    </div>
  );
}
