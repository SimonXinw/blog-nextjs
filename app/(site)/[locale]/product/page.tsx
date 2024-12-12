import React from "react";
import { i18n, LocaleType } from "i18n/index";
import supabase from "lib/supabase";

const getData = async () => {
  const { data, error } = await supabase.from("user").select("*");
  if (error) {
    return { success: false, error: error.message };
  }

  return data;
};

export default async function Page({
  params,
}: {
  params: Promise<{ locale: LocaleType }>;
}) {
  const { locale } = await params;

  const data = await getData();

  // 获取对应语言字典
  const langDict: Record<string, string> = await i18n.init(locale);

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      {langDict.product}
    </div>
  );
}
