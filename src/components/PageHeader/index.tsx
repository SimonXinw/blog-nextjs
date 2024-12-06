"use client";
import React from "react";
import { BarChartOutlined, UserOutlined, BugOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { Logo } from "@/components";
import styles from "./index.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PageHeader: React.FC = () => {
  const router = useRouter();

  return (
    <nav className={styles["header"]}>
      <Space size={[24, 0]} wrap align="center">
        <Logo
          onClick={() => {
            router.push("/");
          }}
        />
      </Space>
      <Space size={[24, 0]} wrap align="center">
        <Link href="/admin/craw">
          <BugOutlined style={{ fontSize: "24px" }} />
        </Link>
        <Link href="/login">
          <UserOutlined style={{ fontSize: "24px", marginRight: 8 }} />
          登陆
        </Link>
      </Space>
    </nav>
  );
};

export default PageHeader;
