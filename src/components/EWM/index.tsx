"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import styles from "./index.module.css";

import { linearMotion } from "@/utils";
import { AnyRecord } from "dns";

interface PropsTs {
  className?: string;
  onClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

const Ewm: React.FC<PropsTs> = (props) => {
  const { className, onClick, ...arg } = props;

  useEffect(() => {
    linearMotion({
      speedX: 1,
      speedY: 1,
      ms: 20,
      className: "." + styles.ewm,
    });

    // 卸载时
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`${styles.ewm} ${className}`} {...arg} onClick={onClick}>
      <Image
        className={styles["ewm-img"]}
        width={100}
        height={100}
        alt="二维码"
        src="/images/ewm.webp"
      />
    </div>
  );
};

export default Ewm;
