"use client";
import React, { useState, useEffect } from "react";
import { randomColor } from "@/utils";
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
