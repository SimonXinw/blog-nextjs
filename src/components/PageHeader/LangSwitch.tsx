"use client";
import React, { useState, useEffect } from "react";
import { GlobalOutlined } from "@ant-design/icons";
import { Modal, Button, List } from "antd";
import Cookies from "js-cookie"; // 引入 js-cookie 库

// 国家和语言的映射
const countriesWithLanguages = [
  {
    name: "美国",
    code: "us",
    languages: [{ name: "英语", code: "en" }],
  },
  {
    name: "中国",
    code: "cn",
    languages: [
      { name: "中文", code: "zh" },
      { name: "英语", code: "en" },
    ],
  },
  // 可以继续添加其他国家和语言
];

const LanguageSwitcher: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("zh");
  const [visible, setVisible] = useState(false); // 控制 Modal 显示

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

  // 显示国家语言选择弹窗
  const showLanguageModal = () => {
    setVisible(true);
  };

  // 关闭弹窗
  const closeLanguageModal = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="text"
        icon={<GlobalOutlined />}
        onClick={showLanguageModal}
        className="flex justify-center items-center text-base pl-0 pr-0 pt-0 pb-0 h-fit"
      >
        <span className="mr-1">
          {
            countriesWithLanguages.find((c) =>
              c.languages.some((lang) => lang.code === selectedCountry)
            )?.name
          }
        </span>
        <span>
          {
            countriesWithLanguages.find((c) =>
              c.languages.some((lang) => lang.code === selectedCountry)
            )?.code
          }
        </span>
      </Button>

      <Modal
        title="选择语言"
        visible={visible}
        onCancel={closeLanguageModal}
        footer={null}
        width={400}
      >
        <List
          dataSource={countriesWithLanguages}
          renderItem={(country) => (
            <List.Item key={country.code}>
              <h3>{country.name}</h3>
              <div>
                {country.languages.map((language) => (
                  <a
                    key={language.code}
                    style={{
                      marginRight: "8px",
                      color:
                        selectedCountry === language.code
                          ? "#1677FF"
                          : "initial",
                      cursor:
                        selectedCountry === language.code
                          ? "not-allowed"
                          : "pointer",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      if (selectedCountry === language.code) return;

                      setSelectedCountry(language.code);
                      setLocaleAndRedirect(language.code);
                      closeLanguageModal();
                    }}
                  >
                    {language.name}
                  </a>
                ))}
              </div>
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default LanguageSwitcher;
