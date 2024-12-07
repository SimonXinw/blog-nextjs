import React from "react";
import { i18n, LocaleType } from "i18n/index";
import { cookies } from "next/headers"; // 用于在服务端访问 cookie

export default async function Page() {
  // 获取请求中的 cookies
  const cookieStore = await cookies();

  const locale: LocaleType =
    (cookieStore.get("NEXT_LOCALE")?.value as LocaleType) || "zh"; // 获取 NEXT_LOCALE cookie

  // 获取对应语言字典
  const langDict: Record<string, string> = await i18n.init(locale);

  return <>{langDict.product}</>;
}
