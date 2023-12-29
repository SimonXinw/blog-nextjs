import React from "react";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import AccountManage from "./my/account";

const { Header, Content, Sider } = Layout;

const HeadNavConfig: MenuProps["items"] = [
  {
    key: "nav1",
    label: `Home`,
  },
];

const SideMenuConfig: MenuProps["items"] = [
  {
    key: `Account`,
    icon: React.createElement(UserOutlined),
    label: `Account`,

    children: [
      {
        key: 1,
        label: `Manage`,
      },
    ],
  },
];

const App: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ height: "100%" }}>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={HeadNavConfig}
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
          />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Account</Breadcrumb.Item>
            <Breadcrumb.Item>Manage</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <AccountManage />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
