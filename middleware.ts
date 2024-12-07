import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n, LocaleType, COOKIE_LOCALE_KEY } from "./i18n";

/**
 * 从请求中获取最合适的语言环境。
 */
function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: string[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  return matchLocale(languages, locales, i18n.defaultLocale);
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
    return NextResponse.rewrite(new URL(`/zh${pathname}`, request.url));
  }

  return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

/**
 * 中间件函数，用于处理请求的路径。
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const localeRegex = /^\/([a-zA-Z]{2})(\/.*)?$/;
  const localeMatched = pathname.match(localeRegex);
  const matchedLocale = localeMatched?.[1] || "";

  // 主域名
  if (pathname === "/") {
    const response = NextResponse.next();

    return setLocaleCookie(response, i18n.defaultLocale);
  }

  // 默认locale
  if (pathname.startsWith(`/${i18n.defaultLocale}`)) {
    const newPath = pathname.replace(`/${i18n.defaultLocale}`, "");

    const response = NextResponse.redirect(new URL(newPath, request.url));

    return setLocaleCookie(response, i18n.defaultLocale);
  }

  // url 包含有效的 locale
  if (i18n.locales.includes(matchedLocale as LocaleType)) {
    const response = NextResponse.next();

    return setLocaleCookie(response, matchedLocale);
  } else {
    // 这里是用来判断  /product 这种根目录格式的重定向的， 没有 有效 locale，判断请求头是否有 有效  locale，
    const langLocale = getLocale(request) || i18n.defaultLocale;

    const response = handleLocalePathRedirect(request, langLocale, pathname);

    setLocaleCookie(response, langLocale);

    return response;
  }
}

/**
 * 中间件的配置对象。
 */
export const config = {
  matcher: [
    "/((?!api|public|_next/static|_next/image|favicon.ico|images|admin|login|register|fonts).*)",
  ],
};
