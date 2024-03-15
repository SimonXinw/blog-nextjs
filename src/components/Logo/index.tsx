import React from 'react';
import Image from 'next/image';
import styles from './index.module.css';

interface PropsType {
  className?: string;
}

function Logo(props: PropsType) {
  const { className, ...arg } = props
  return (
    <Image
      className={`${styles[className || 'logo-img']}`}
      width={32}
      height={32}
      alt="logo"
      src="/logo/logo.png"
      {...arg}
    />
  );
}

export default Logo;
