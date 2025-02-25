"use client";
import React, { ReactNode } from "react";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useRouter, usePathname } from "next/navigation";
import { HeadNavConfig, SideMenuConfig } from "@/constants/menuConfig";

const { Header, Content, Sider } = Layout;

const RootLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const breadcrumbItems = [
    {
      title: "Home",
      key: "Home",
      href: "/",
    },
    {
      title: "Account",
      key: "Account",
      href: "/admin/my/account",
    },
    {
      title: "Manage",
      key: "Manage",
      href: "/admin/my/account/manage",
    },
  ];

  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        <Layout style={{ height: "100%" }}>
          <Header className="header">
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              items={HeadNavConfig}
              defaultSelectedKeys={[pathname || ""]}
              onClick={(e) => router.push(e.key)}
            />
          </Header>
          <Layout>
            <Sider width={200} style={{ background: colorBgContainer }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                style={{ height: "100%", borderRight: 0 }}
                items={SideMenuConfig}
                onClick={(e) => router.push(e.key)}
              />
            </Sider>
            <Layout style={{ padding: "0 24px 24px" }}>
              <Breadcrumb
                style={{ margin: "16px 0" }}
                items={breadcrumbItems}
              />
              <Content
                style={{
                  padding: 24,
                  margin: 0,
                  minHeight: 280,
                  background: colorBgContainer,
                }}
              >
                {children}
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </body>
    </html>
  );
};

export default RootLayout;
