import type { Metadata } from "next";
import PageHeader from "src/components/PageHeader";
import { Analytics } from "@vercel/analytics/next";

import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to xinwang's blog",
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale = "zh-cn" } = params;
  return (
    <html lang={locale}>
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
      />
      <body style={{ display: "flex", flexDirection: "column" }}>
        <PageHeader />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
