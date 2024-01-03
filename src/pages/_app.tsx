import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import AdminLayout from "./admin/layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // 检查当前路由是否以/admin开头
  const isAdminRoute: boolean = router.pathname.startsWith("/admin");

  /**
   * @如果是以/admin开头的路由，则使用AdminLayout布局
   */
  if (isAdminRoute) {
    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
        </Head>

        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      </>
    );
  }

  // 否则，不使用任何特殊布局，直接返回页面组件

  // 否则，不使用任何特殊布局，直接返回页面组件
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
      </Head>

      <Component {...pageProps} />
    </>
  );
}
