import React, { useState, useEffect } from 'react';
import { FireFilled } from '@ant-design/icons';
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
    name: 'node开启Http',
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
    icon: (
      <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18">
        <defs>
          <linearGradient
            id="id-2014200654-a"
            x1="63.313%"
            x2="46.604%"
            y1="-13.472%"
            y2="117.368%"
          >
            <stop offset="2.35%" stop-color="#EC471E"></stop>
            <stop offset="100%" stop-color="#FF6DC4"></stop>
          </linearGradient>
        </defs>
        <path
          fill="url(#id-2014200654-a)"
          d="M14.553 20.78c.862-.651 1.39-1.792 1.583-3.421.298-2.511-.656-4.904-2.863-7.179.209 2.291.209 3.73 0 4.314-.41 1.143-1.123 1.983-1.91 2.03-1.35.079-2.305-.512-2.863-1.774-.676 1.25-.782 2.556-.318 3.915.31.906.94 1.684 1.89 2.333C7.144 20.131 5 17.336 5 14.022c0-2.144.898-4.072 2.325-5.4.062 2.072.682 3.598 2.13 4.822-.67-1.112-.734-2.11-.734-3.517 0-3.253 2.067-6.007 4.913-6.927a7.35 7.35 0 0 0 2.157 4.918C17.722 9.214 19 11.463 19 14.022c0 3.073-1.844 5.7-4.447 6.758z"
          fill-rule="evenodd"
        ></path>
      </svg>
    ),
  },
  {
    url: 'http://49.234.210.170/js/双飞翼布局.html',
    name: '双飞翼布局',
  },
  {
    url: 'http://49.234.210.170/js/复利计算.html',
    name: '复利计算',
    icon: <FireFilled style={{ color: '#FF4500' }} />,
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
              {item.icon}
            </p>
          );
        })}
      </div>
      <div className={styles.ewm}>
        <img
          className={styles['ewm-img']}
          src="data:image/png;base64,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"
        />
      </div>
    </div>
  );
}
