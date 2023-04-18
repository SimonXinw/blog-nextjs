import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { FireFilled } from "@ant-design/icons";
import styles from "@/styles/Home.module.css";
import { randomColor, linearMotion } from "@/utils";
import RecordNumber from "@/components/RecordNumber";
import VideoBG from "@/components/VideoBG";
import EWM from "@/components/EWM";

const BlogUrlList = [
  {
    url: "http://49.234.210.170/js/缓冲运动.html",
    name: "缓冲运动",
  },
  {
    url: "http://49.234.210.170/js/缓冲运动碰壁.html",
    name: "缓冲运动碰壁",
  },
  {
    url: "http://49.234.210.170/js/回到首页，触底.html",
    name: "回到首页，触底",
  },
  {
    url: "http://49.234.210.170/js/轮播图.html",
    name: "轮播图",
  },
  {
    url: "http://49.234.210.170/js/碰撞.html",
    name: "碰撞",
  },
  {
    url: "http://49.234.210.170/js/拖动元素四边距.html",
    name: "拖动元素四边距",
  },
  {
    url: "https://blog.csdn.net/qq_42877027/article/details/104959320",
    name: "ajax",
  },
  {
    url: "http://49.234.210.170/js/cookies.html",
    name: "cookies",
  },
  {
    url: "http://49.234.210.170/js/jsonp.html",
    name: "jsonp",
  },
  {
    url: "http://49.234.210.170/js/Magnifier/放大镜.html",
    name: "放大镜",
  },
  {
    url: "https://blog.csdn.net/qq_42877027/article/details/104959936",
    name: "node开启Http",
  },
  {
    url: "http://49.234.210.170/js/购物车/todopst/todo.html",
    name: "todopst",
  },
  {
    url: "http://49.234.210.170/js/懒加载瀑布流/图片懒加载.html",
    name: "图片懒加载",
  },
  {
    url: "http://49.234.210.170/js/日历.html",
    name: "日历",
  },
  {
    url: "http://49.234.210.170/js/评分效果.html",
    name: "评分效果",
  },
  {
    url: "http://49.234.210.170/js/懒加载瀑布流/瀑布流.html",
    name: "瀑布流",
  },
  {
    url: "http://49.234.210.170/js/mobileApi.html",
    name: "mobileApi",
  },
  {
    url: "http://49.234.210.170/js/排序算法.html",
    name: "排序算法",
    icon: <FireFilled style={{ color: "#FF4500" }} />,
  },
  {
    url: "http://49.234.210.170/js/双飞翼布局.html",
    name: "双飞翼布局",
  },
  {
    url: "http://49.234.210.170/js/复利计算.html",
    name: "复利计算",
    icon: <FireFilled style={{ color: "#FF4500" }} />,
  },

  {
    url: "http://49.234.210.170/js/滚动.html",
    name: "滚动",
  },

  {
    url: "http://49.234.210.170/js/video.html",
    name: "video",
  },

  {
    url: "http://49.234.210.170/js/横屏video.html",
    name: "横屏video",
  },
];

export default function Home() {
  let num = 1;

  const [autorColor, setAutorColor] = useState("red");
  const [pageStyle, setPageStyle] = useState({
    opacity: 0,
  });

  const autorColorStyle = {
    color: autorColor,
  };

  useEffect(() => {
    const colorTimer: any = setInterval(() => {
      setAutorColor(randomColor());
    }, 800);

    // 页面自动展示计时器
    const pageTimer: any = setTimeout(() => {
      onPageClick();
    }, 0);

    // 卸载时
    return () => {
      clearInterval(colorTimer);
      clearTimeout(pageTimer);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPageClick = () => {
    setPageStyle({
      opacity: pageStyle.opacity === 1 ? 0 : 1,
    });
  };

  // =============== dom ==================
  return (
    <>
      {/* 会隐藏的配置 */}
      <Head>
        <title>辛望的博客</title>
        <meta
          name="description"
          content="一个用 Next.js 编写的用来学习 JavaScript 的博客网站。"
        />
      </Head>
      {/* Page Start */}
      <div
        className={`${styles["container"]} ${styles["theme-gray"]}`}
        onClick={onPageClick}
      >
        <div className={styles["page"]} style={pageStyle}>
          <div className={styles.header}></div>
          <div className={styles.content}>
            <h1 className={styles.title}>藏轮阁</h1>
            <div className={styles.author} style={autorColorStyle}>
              辛望 (Simon)
            </div>
            <div className={styles["demo-list"]}>
              {BlogUrlList.map((item, index) => {
                return (
                  <p className={styles.link} key={index}>
                    <a target="_blank" href={item.url} rel="noreferrer">
                      {item.name}
                    </a>
                    {item.icon}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
        {/* 视频 */}
        <VideoBG />
        {/* 二维码 */}
        <EWM
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
        {/* 备案号 */}
        <RecordNumber />
      </div>
    </>
  );
}
