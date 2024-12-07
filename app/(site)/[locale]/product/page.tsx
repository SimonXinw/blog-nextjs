import React from "react";
import { i18n, LocaleType } from "i18n/index";
import { cookies } from "next/headers"; // 用于在服务端访问 cookie
import { NextRequest } from "next/server"; // 获取路由信息

export default async function Page({
  params,
}: {
  params: { locale: LocaleType };
}) {
  // 这里的 params.locale 会直接从动态路由参数获取到
  const { locale } = params;

  // 获取对应语言字典
  const langDict: Record<string, string> = await i18n.init(locale);

  return <>{langDict.product}</>;
}
