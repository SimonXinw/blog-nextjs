import React from 'react';
import styles from './index.css';

const xwblogUrl = 'http://49.234.210.170/';
const BlogUrls = {
  xwHuanchong: 'http://49.234.210.170/js/缓冲运动.html',
  xwPengbi: 'http://49.234.210.170/js/缓冲运动碰壁.html',
  xwHuidaoshouye: 'http://49.234.210.170/js/回到首页，触底.html',
  xwLunbo: 'http://49.234.210.170/js/轮播图.html',
  xwPengzhuang: 'http://49.234.210.170/js/碰撞.html',
  xwTuodong: 'http://49.234.210.170/js/拖动元素四边距.html',
  csdnAjax: 'https://blog.csdn.net/qq_42877027/article/details/104959320',
  cookies: 'http://49.234.210.170/js/cookies.html',
  jsonp: 'http://49.234.210.170/js/jsonp.html',
  xwFangdajing: 'http://49.234.210.170/js/Magnifier/放大镜.html',
  csdnNodehttp: 'https://blog.csdn.net/qq_42877027/article/details/104959936',
  xwTodolist: 'http://49.234.210.170/js/购物车/todopst/todo.html',
  xwLazy: 'http://49.234.210.170/js/懒加载瀑布流/图片懒加载.html',
  xwDaily: 'http://49.234.210.170/js/日历.html',
  xwPinfen: 'http://49.234.210.170/js/评分效果.html',
  xwPubu: 'http://49.234.210.170/js/懒加载瀑布流/瀑布流.html',
  xwMobileApi: 'http://49.234.210.170/js/mobileApi.html',
  xwPaixu: 'http://49.234.210.170/js/排序算法.html',
  xwBuju: 'http://49.234.210.170/js/双飞翼布局.html',
  xwFuli: 'http://49.234.210.170/js/复利计算.html',
  xwGundong: 'http://49.234.210.170/js/滚动.html',
  xwVideo: 'http://49.234.210.170/js/video.html',
};

export default function() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>藏轮阁</h1>
      <div className={styles.author}>辛望</div>
      <div className={styles.content}>
        <p className={styles.row}>
          <a target="_blank" href={BlogUrls.xwHuanchong} rel="noreferrer">
            缓冲运动
          </a>
        </p>
        <p className={styles.row}>
          <a target="_blank" href={BlogUrls.xwPengbi} rel="noreferrer">
            缓冲运动碰壁
          </a>
        </p>
        <p className={styles.row}>
          <a target="_blank" href={BlogUrls.xwHuidaoshouye} rel="noreferrer">
            回到首页，触底
          </a>
        </p>
        <p className={styles.row}>
          <a target="_blank" href={BlogUrls.xwLunbo} rel="noreferrer">
            轮播图
          </a>
        </p>
        <p className={styles.row}>
          <a target="_blank" href={BlogUrls.xwPengzhuang} rel="noreferrer">
            碰撞
          </a>
        </p>
        <p className={styles.row}>
          <a target="_blank" href={BlogUrls.xwTuodong} rel="noreferrer">
            拖动元素四边距
          </a>
        </p>
        <p className={styles.row}>
          <a target="_blank" href={BlogUrls.csdnAjax} rel="noreferrer">
            面向对象封装原生ajax
          </a>
        </p>
        <p className={styles.row}>
          <a target="_blank" href={BlogUrls.cookies} rel="noreferrer">
            cookies 更换主题颜色
          </a>
        </p>
        <p className={styles.row}>
          <a target="_blank" href={BlogUrls.jsonp} rel="noreferrer">
            jsonp实现百度联想搜索
          </a>
        </p>
        <p className={styles.row}>
          <a target="_blank" href={BlogUrls.xwFangdajing} rel="noreferrer">
            京东放大镜效果
          </a>
        </p>
        <p className={styles.row}>
          <a target="_blank" href={BlogUrls.csdnNodehttp} rel="noreferrer">
            node.js开启http服务
          </a>
        </p>
        <p className={styles.row}>
          <a target="_blank" href={BlogUrls.xwTodolist} rel="noreferrer">
            todopst
          </a>
        </p>
        <p className={styles.row}>
          <a target="_blank" href={BlogUrls.xwLazy} rel="noreferrer">
            懒加载
          </a>
        </p>
        <p className={styles.row}>
          <a target="_blank" href={BlogUrls.xwDaily} rel="noreferrer">
            日历
          </a>
        </p>
        <p className={styles.row}>
          <a target="_blank" href={BlogUrls.xwPinfen} rel="noreferrer">
            评分效果
          </a>
        </p>
        <p className={styles.row}>
          <a target="_blank" href={BlogUrls.xwPubu} rel="noreferrer">
            瀑布流
          </a>
        </p>
        <p className={styles.row}>
          <a target="_blank" href={BlogUrls.xwMobileApi} rel="noreferrer">
            mobileApi
          </a>
        </p>
        <p className={styles.row}>
          <a target="_blank" href={BlogUrls.xwPaixu} rel="noreferrer">
            排序算法
          </a>
        </p>
        <p className={styles.row}>
          <a target="_blank" href={BlogUrls.xwBuju} rel="noreferrer">
            双飞翼布局
          </a>
        </p>
        <p className={styles.row}>
          <a target="_blank" href={BlogUrls.xwFuli} rel="noreferrer">
            复利计算
          </a>
        </p>
        <p className={styles.row}>
          <a target="_blank" href={BlogUrls.xwGundong} rel="noreferrer">
            滚动
          </a>
        </p>
        <p className={styles.row}>
          <a target="_blank" href={BlogUrls.xwVideo} rel="noreferrer">
            video
          </a>
        </p>
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
