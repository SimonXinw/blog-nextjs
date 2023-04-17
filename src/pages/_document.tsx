import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="zh-cmn-Hans">
      <Head>
        <link
          rel="icon"
          type="image/x-icon"
          href="https://www.bilibili.com/favicon.ico?v=1"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
