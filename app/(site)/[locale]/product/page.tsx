import React from "react";
import { i18n } from "i18n/index";

export default async function Page() {

  const langDict: Record<string, string> = await i18n.init("zh");
  
  return <>{langDict.product}</>;
}
