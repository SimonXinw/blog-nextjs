import React from "react";
import styles from "./index.module.css";

interface PropsType {
  src?: string;
  alt?: string;
  className?: string;
}

function ImageBg(props: PropsType) {
  const {
    src = "https://cdn.xinwangblog.cn/imgs/forest_bg_new.jpeg",
    alt = "",
    className = styles["img-bg"],
    ...args
  } = props;

  return (
    <div className={className}>
      <img src={src} alt={alt} {...args} />
    </div>
  );
}

export default ImageBg;
