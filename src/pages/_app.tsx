import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

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
