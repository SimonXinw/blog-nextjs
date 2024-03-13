import React from "react";
import styles from "./index.module.css";
import Image from 'next/image';

interface PropsType {
  src?: string;
  alt?: string;
  className?: string;
}

function ImageBg(props: PropsType) {
  const {
    src = "/leimu-100kb.jpeg",
    alt = "",
    className = styles["img-bg"],
    ...args
  } = props;

  return (
    <div className={className}>
      <Image src={src} alt={alt} {...args} width={1920}
        height={1080} />
    </div>
  );
}

export default ImageBg;
