"use client";
import React from "react";
import Iframe from "src/components/Iframe";
import styles from "./Home.module.css";

export default function Home() {
  // =============== dom ==================
  return (
    <div className={styles.pageContainer}>
      <Iframe src="https://simonxinw.github.io/web-html-css-js-demos/"></Iframe>
    </div>
  );
}
