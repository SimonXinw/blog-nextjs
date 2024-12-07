import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n } from "./i18n";

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
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: string[] = i18n.locales;

  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

/**
 * 中间件函数，用于处理请求的路径以确保包含正确的语言环境。
 *
 * 如果请求的路径没有包含语言环境，则尝试从请求头获取语言环境，并重定向到带有正确语言环境的路径。
 * 这确保了所有请求都以明确的语言环境进行处理，提高了国际化处理的一致性。
 *
 * @param request Next.js 的请求对象，包含请求的 URL 和头信息。
 * @returns 如果需要重定向，则返回重定向的响应；否则不返回任何内容，让请求继续处理。
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 检查路径名是否以默认语言的前缀开始 (例如 '/zh/')
  const isDefaultLocalePath =
    pathname.startsWith(`/${i18n.defaultLocale}/`) || pathname === "/";

  // 如果是默认语言路径，重写路径为无语言前缀的路径
  if (isDefaultLocalePath) {
    // 去除语言前缀 '/zh'
    const newPath = pathname.replace(`/${i18n.defaultLocale}`, "");

    // 使用 rewrite 将请求内部重写为没有语言前缀的路径，但返回该路径的内容
    const response = NextResponse.rewrite(new URL(newPath, request.url));

    // 设置 cookie 为默认语言（'zh'）
    response.cookies.set("NEXT_LOCALE", i18n.defaultLocale);

    return response;
  }

  // 检查路径名是否缺少语言环境
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // 如果路径名缺少语言环境，尝试从请求头获取语言环境
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // 如果是默认语言（例如 'zh'），则保持路径并返回带语言前缀的内容
    if (locale === i18n.defaultLocale) {
      // 保留原路径但带上默认语言前缀
      const response = NextResponse.rewrite(
        new URL(`/zh${pathname}`, request.url)
      );

      // 设置 cookie 为默认语言（'zh'）
      response.cookies.set("NEXT_LOCALE", i18n.defaultLocale);

      return response;
    }

    // 否则，重定向到带有语言前缀的路径
    const response = NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
        request.url
      )
    );

    // 设置 cookie 为匹配到的语言
    response.cookies.set("NEXT_LOCALE", locale);

    return response;
  }

  // 如果路径名已经包含语言环境，继续正常处理
  const locale = getLocale(request) || i18n.defaultLocale;
  const response = NextResponse.next();

  // 设置 cookie 为匹配到的语言或默认语言
  response.cookies.set("NEXT_LOCALE", locale);

  return response;
}

/**
 * 中间件的配置对象。
 *
 * 这定义了中间件应该匹配的路径模式。通过这种方式，可以排除不需要进行语言环境处理的特定路径，
 * 如 API 路径、静态文件路径等。
 */
export const config = {
  matcher: [
    "/((?!api|public|_next/static|_next/image|favicon.ico|images|fonts).*)",
  ],
};
