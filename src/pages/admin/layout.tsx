import React, { ReactNode } from "react";
import type { AppProps } from "next/app";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useRouter } from "next/router";
import { HeadNavConfig, SideMenuConfig } from "@/constants/menuConfig";
import { ClickParam } from 'antd/lib/menu'


const { Header, Content, Sider } = Layout;

const AdminLayout = ({ children }: { children: ReactNode }) => {
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
      href: "/my/account",
    },
    {
      title: "Manage",
      key: "Manage",
      href: "/my/account/manage",
    },
  ];

  return (
    <Layout style={{ height: "100%" }}>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          items={HeadNavConfig}
          defaultSelectedKeys={[router.pathname]}
          onClick={(e: ClickParam) => router.push(e.key)}
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
            onClick={(e: ClickParam) => router.push(e.key)}
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb
            style={{ margin: "16px 0" }}
            items={breadcrumbItems}
          ></Breadcrumb>
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
  );
};

export default AdminLayout;
