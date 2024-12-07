// 定义支持的语言类型
export type LocaleType = "en" | "zh" | "us";

export const COOKIE_LOCALE_KEY = "NEXT_LOCALE";

// i18n 配置
export const i18n = {
  defaultLocale: "zh" as LocaleType,
  locales: ["en", "zh", "us"] as LocaleType[],

  // 初始化语言环境
  init(locale: LocaleType) {
    return getDictionary(locale);
  },
};

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
