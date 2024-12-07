"use client";
import React, { useState } from "react";
import { GlobalOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";

// 国家语言映射
const countries = [
  { name: "美国", code: "en" },
  { name: "中国", code: "zh" },
];

export default () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("zh"); // 默认选中国

  // 设置 cookie 和更改 URL
  const setLocaleAndRedirect = (locale: string) => {
    // 设置 cookie
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${
      60 * 60 * 24 * 30
    }`; // 设置 30天有效期

    // 更新 URL，刷新页面以使语言生效
    const newUrl = `/${locale}${window.location.pathname.substring(3)}`; // 假设路径前缀是语言代码

    window.location.href = newUrl; // 更改页面语言并刷新
  };

  // 国家选择菜单
  const countryMenu = (
    <Menu
      items={countries.map((item) => ({
        key: item.code,
        label: (
          <div
            onClick={() => {
              setSelectedCountry(item.code);
              setLocaleAndRedirect(item.code); // 设置语言并更新 URL
            }}
          >
            {item.name} ({item.code})
          </div>
        ),
      }))}
    />
  );

  return (
    <Dropdown menu={countryMenu} trigger={["click"]}>
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
  );
};
