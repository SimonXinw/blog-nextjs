"use client";
import React, { useState } from "react";
import {
  BarChartOutlined,
  UserOutlined,
  BugOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { Space, Dropdown, Menu } from "antd";
import { Logo } from "@/components";
import styles from "./index.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

// 国家语言映射
const countries = [
  { name: "美国", code: "en" },
  { name: "中国", code: "zh" },
];

const PageHeader: React.FC = () => {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<string>("zh"); // 默认选中国

  // 国家选择菜单
  const countryMenu = (
    <Menu>
      {countries.map((item) => (
        <Menu.Item
          key={item.code}
          onClick={() => setSelectedCountry(item.code)}
        >
          {item.name} ({item.code})
        </Menu.Item>
      ))}
    </Menu>
  );

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

        {/* 国家选择图标 */}
        <Dropdown overlay={countryMenu} trigger={["click"]}>
          <div
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              marginLeft: "16px",
            }}
          >
            <GlobalOutlined style={{ fontSize: "24px", marginRight: "8px" }} />
            {countries.find((c) => c.code === selectedCountry)?.name}{" "}
            {selectedCountry}
          </div>
        </Dropdown>
      </Space>
    </nav>
  );
};

export default PageHeader;
