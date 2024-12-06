import type { Metadata } from "next";
import Head from "next/head";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to xinwang's blog",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
      </Head>
      <body>{children}</body>
    </html>
  );
}
