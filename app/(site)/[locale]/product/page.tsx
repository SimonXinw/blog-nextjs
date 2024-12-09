import React from "react";
import { i18n, LocaleType } from "i18n/index";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: LocaleType }>;
}) {
  const { locale } = await params;

  // 获取对应语言字典
  const langDict: Record<string, string> = await i18n.init(locale);

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      {langDict.product}
    </div>
  );
}
