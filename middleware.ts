import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

export const i18n = {
  defaultLocale: "en",
  locales: ["en", "zh"],
};

/**
 * 从请求中获取最合适的语言环境。
 *
 * 使用 Negotiator 库和 FormatJS 的国际化语言匹配库来确定请求中最合适的语言环境。
 * 这考虑了客户端请求头中的 Accept-Language 值，并将其与配置中支持的语言环境进行匹配。
 *
 * @param request Next.js 的请求对象，包含请求头等信息。
 * @returns 返回匹配的语言环境字符串，如果没有匹配则返回 undefined。
 */
function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headersz
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

/**
 * 中间件函数，用于处理请求的路径以确保包含正确的语言环境。
 *
 * 如果请求的路径没有包含语言环境，则尝试从请求头中获取语言环境，并重定向到带有正确语言环境的路径。
 * 这确保了所有请求都以明确的语言环境进行处理，提高了国际化处理的一致性。
 *
 * @param request Next.js 的请求对象，包含请求的 URL 和头信息。
 * @returns 如果需要重定向，则返回重定向的响应；否则不返回任何内容，让请求继续处理。
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
  // // If you have one
  // if (
  //   [
  //     '/manifest.json',
  //     '/favicon.ico',
  //     // Your other files in `public`
  //   ].includes(pathname)
  // )
  //   return

  // Check if there is any supported locale in the pathname
  // 检查路径名是否缺少语言环境
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    // 如果请求的路径没有语言环境，重定向到带有正确语言环境的路径
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    );
  }
}

/**
 * 中间件的配置对象。
 *
 * 这定义了中间件应该匹配的路径模式。通过这种方式，可以排除不需要进行语言环境处理的特定路径，
 * 如 API 路径、静态文件路径等。
 */
export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: [
    "/((?!api|public|_next/static|_next/image|favicon.ico|images|fonts).*)",
  ],
};
