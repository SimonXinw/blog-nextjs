import React from "react";
import Image from "next/image";
import styles from "./index.module.css";

interface PropsType {
  className?: string;
  onClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

function Logo(props: PropsType) {
  const { className, ...arg } = props;
  return (
    <Image
      className={`${styles[className || "logo-img"]} cursor-pointer`}
      width={32}
      height={32}
      alt="logo"
      src="/logo/logo.png"
      {...arg}
    />
  );
}

export default Logo;
