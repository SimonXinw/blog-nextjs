import React from "react";
import { i18n, LocaleType } from "i18n/index";

export default async function Page({
  params,
}: {
  params: { locale: LocaleType };
}) {

  // 获取对应语言字典
  const langDict: Record<string, string> = await i18n.init(params?.locale);

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      {langDict.product}
    </div>
  );
}
