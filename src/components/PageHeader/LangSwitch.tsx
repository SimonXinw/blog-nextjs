"use client";
import React, { useState, useEffect } from "react";
import { GlobalOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";

// 国家语言映射
const countries = [
  { name: "美国", code: "en" },
  { name: "中国", code: "zh" },
];

export default function LanguageSwitcher() {
  const [selectedCountry, setSelectedCountry] = useState<string>("zh");

  useEffect(() => {
    const locale =
      document.cookie
        .split("; ")
        .find((row) => row.startsWith("NEXT_LOCALE="))
        ?.split("=")[1] || "zh";
    setSelectedCountry(locale);
  }, []);

  const setLocaleAndRedirect = (locale: string) => {
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=${
      60 * 60 * 24 * 30
    }`;
    setTimeout(() => {
      const newUrl = `/${locale}${window.location.pathname.substring(3)}`;
      window.location.href = newUrl;
    }, 0);
  };

  const countryMenu = (
    <Menu
      items={countries.map((item) => ({
        key: item.code,
        label: (
          <div
            onClick={() => {
              setSelectedCountry(item.code);
              setLocaleAndRedirect(item.code);
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
}
