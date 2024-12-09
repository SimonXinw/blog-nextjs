import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n, LocaleType, COOKIE_LOCALE_KEY } from "./i18n";
import { getDbGeoIpLocale } from "lib/geoip";

/**
 * 从请求中获取最合适的语言环境。
 */
function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(); // 获取所有语言设置
  for (const lang of languages) {
    const parts = lang.split("-"); // 按 "-" 分割语言区域
    if (parts.length === 2) {
      return parts[1].toLowerCase(); // 返回国家部分并转换为大写
    }
  }

  return i18n.defaultLocale; // 如果没有匹配到，返回默认值
}

/**
 * 设置响应的语言环境 cookie
 */
function setLocaleCookie(response: NextResponse, locale: string) {
  response.cookies.set(COOKIE_LOCALE_KEY, locale);

  return response;
}

/**
 * 路径重定向或重写
 */
function handleLocalePathRedirect(
  request: NextRequest,
  locale: string,
  pathname: string
) {
  if (locale === i18n.defaultLocale) {
    return NextResponse.rewrite(
      new URL(`/${i18n.defaultLocale}${pathname}`, request.url)
    );
  }

  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

/**
 * 中间件函数，用于处理请求的路径。
 */
export async function middleware(request: NextRequest & { ip: string }) {
  const pathname = request.nextUrl.pathname;
  const localeRegex = /^\/([a-zA-Z]{2})(\/.*)?$/;
  const localeMatched = pathname.match(localeRegex);
  const matchedLocale = localeMatched?.[1] || "";

  const urlObj = request.nextUrl;

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")?.[0]?.trim() ||
    request?.ip ||
    "127.0.0.1";

  // 主域名
  if (pathname === "/") {
    /**
     *@parseIp
     */
    const region: string =
      (await getDbGeoIpLocale(ip, `http://${urlObj.host}`)) ||
      i18n.defaultLocale;

    if (region !== i18n.defaultLocale) {
      const newUrl = new URL(`/${region}`, request.url);

      const response = NextResponse.redirect(newUrl);

      return setLocaleCookie(response, region);
    }

    const response = NextResponse.next();

    return setLocaleCookie(response, i18n.defaultLocale);
  }

  // 默认locale
  if (pathname.startsWith(`/${i18n.defaultLocale}`)) {
    const newPath = pathname.replace(`/${i18n.defaultLocale}`, "");

    const response = NextResponse.redirect(new URL(newPath, request.url));

    return setLocaleCookie(response, i18n.defaultLocale);
  }

  // url 包含 locale 且 有效 locale
  if (i18n.locales.includes(matchedLocale as LocaleType)) {
    const response = NextResponse.next();

    return setLocaleCookie(response, matchedLocale);
  }

  // 不包含 locale，处理 /product 这种根目录格式的重定向， 根据请求头 lang 帮助重定向一下
  const langLocale = getLocale(request) || i18n.defaultLocale;

  const response = handleLocalePathRedirect(request, langLocale, pathname);

  setLocaleCookie(response, langLocale);

  return response;
}

/**
 * 中间件的配置对象。
 */
export const config = {
  matcher: [
    "/((?!api|public|_next/static|_next/image|favicon.ico|images|admin|login|register|fonts).*)",
  ],
};
