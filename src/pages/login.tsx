import React, { useState, useEffect } from 'react';
import styles from './index.css';
import { randomColor } from '@/utils';

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
  return <div className={styles.container}>新页面</div>;
}
