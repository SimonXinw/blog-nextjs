// 定义支持的语言类型
export type LocaleType = "en" | "zh" | "us" | "cn" | "global";

export const COOKIE_LOCALE_KEY = "NEXT_LOCALE";

export const DEFAULT_LOCALE = "cn";

// i18n 配置
export const i18n = {
  defaultLocale: DEFAULT_LOCALE,
  locales: ["en", "zh", "us", "cn", "global"] as LocaleType[],

  // 初始化语言环境
  init(locale: LocaleType) {
    return getDictionary(locale);
  },
};

// countryToLocaleMapping 在 i18n 之后定义
/**
 * @country iso code translate to current project locale
 */
export const countryToLocaleMapping: Record<string, string> = {
  global: "global", // 全球
  cn: "cn", // 中国
  us: "us", // 美国
  uk: "uk", // 英国
  gb: "uk", // 英国
  de: "de", // 德国
  ca: "ca", // 加拿大
  au: "au", // 澳大利亚
};

// 过滤掉 i18n.locales 中未包含的国家
export const filteredCountryToLocaleMapping = Object.fromEntries(
  Object.entries(countryToLocaleMapping).filter(([key, value]) =>
    i18n.locales.includes(value as LocaleType)
  )
);

// 缓存已加载的字典
const cachedDictionaries: Record<LocaleType, any> = {} as Record<
  LocaleType,
  any
>;

// 记录上次加载的 locale
let lastLoadedLocale: LocaleType | null = null;

// 字典加载器
const dictionaries = {
  en: () => import("./localeJsons/en.json").then((data) => data),
  zh: () => import("./localeJsons/zh.json").then((data) => data),
  us: () => import("./localeJsons/us.json").then((data) => data),
  cn: () => import("./localeJsons/cn.json").then((data) => data),
  global: () => import("./localeJsons/global.json").then((data) => data),
};

// 获取字典，使用缓存来避免重复加载，并处理 locale 更改
export const getDictionary = async (locale: LocaleType) => {
  // 检查传入的 locale 是否与上次加载的 locale 一致
  if (locale !== lastLoadedLocale) {
    // 如果不一致，重新加载字典
    const dictionary = await dictionaries[locale]?.();

    // 更新缓存并记录当前加载的 locale
    cachedDictionaries[locale] = dictionary;
    lastLoadedLocale = locale;

    return dictionary;
  }

  // 如果 locale 一致，直接返回缓存中的字典
  return cachedDictionaries[locale];
};
