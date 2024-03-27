import React from "react";
import type { MenuProps } from "antd";

import { UserOutlined } from "@ant-design/icons";

export const HeadNavConfig: MenuProps["items"] = [
  {
    key: "/c",
    label: `Home`,
  },
];

export const SideMenuConfig: MenuProps["items"] = [
  {
    key: `/admin/my/account/manage`,
    icon: React.createElement(UserOutlined),
    label: `Account`,
    children: [
      {
        key: 'manage',
        label: `Manage`,
      },
      {
        key: 'test',
        label: `Test`,
      },
    ],
  },
];

const MenuConfig = {
  HeadNavConfig,
  SideMenuConfig,
};

export default MenuConfig;
