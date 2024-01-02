import React from "react";
import type { MenuProps } from "antd";

import { UserOutlined } from "@ant-design/icons";

export const HeadNavConfig: MenuProps["items"] = [
  {
    key: "nav1",
    label: `Home`,
  },
];

export const SideMenuConfig: MenuProps["items"] = [
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
