import React from "react";
import styles from "./index.module.css";

interface PropsTs {
  className?: string;
}

const Record: React.FC<PropsTs> = (props) => {
  const { className, ...arg } = props;

  return (
    <div className={`${styles["govNum"]} ${className}`} {...arg}>
      <a href="http://beian.miit.gov.cn">赣ICP备20003496号</a>
    </div>
  );
};

export default Record;
