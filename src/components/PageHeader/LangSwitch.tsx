"use client";
import React, { useState, useEffect } from "react";
import { GlobalOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import Cookies from "js-cookie"; // 引入 js-cookie 库

// 国家语言映射
const countries = [
  { name: "美国", code: "en" },
  { name: "中国", code: "zh" },
];

const LanguageSwitcher: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("zh");

  useEffect(() => {
    // 从 Cookie 中获取当前语言，或者使用默认语言 "zh"
    const locale = Cookies.get("NEXT_LOCALE") || "zh"; // 使用 js-cookie 获取 Cookie
    setSelectedCountry(locale);
  }, []);

  const setLocaleAndRedirect = (locale: string) => {
    // 使用 js-cookie 设置 Cookie
    Cookies.set("NEXT_LOCALE", locale, { expires: 30, path: "/" });

    // 获取当前路径
    const currentPath = window.location.pathname;

    // 判断路径是否有语言前缀（动态获取前缀）
    const regex = /^\/([a-zA-Z]{2})(\/.*)?$/; // 前缀为 2 字母的语言代码

    const match = currentPath.match(regex);

    // 如果路径有语言前缀，替换它，否则添加新的语言前缀
    let newUrl;
    
    if (match) {
      // 如果有语言前缀，替换它
      newUrl = currentPath.replace(/^\/[a-zA-Z]{2}/, `/${locale}`);
    } else {
      // 如果没有语言前缀，添加新的语言前缀
      newUrl = `/${locale}${currentPath}`;
    }

    // 重定向到新的 URL
    window.location.href = newUrl;
  };

  // 构建菜单项
  const items: MenuProps["items"] = countries.map((country) => ({
    key: country.code,
    label: (
      <a
        onClick={(e) => {
          e.preventDefault(); // 防止页面跳转

          setSelectedCountry(country.code);

          setLocaleAndRedirect(country.code);
        }}
      >
        {country.name} ({country.code})
      </a>
    ),
  }));

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <GlobalOutlined style={{ fontSize: "24px" }} />
          {countries.find((c) => c.code === selectedCountry)?.name}
        </Space>
      </a>
    </Dropdown>
  );
};

export default LanguageSwitcher;
