import React, { useEffect, useState } from "react";
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { TableDropdown } from "@ant-design/pro-components";
import { Button, Dropdown, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRef } from "react";
import userData from "@/constants/api/user.json";

export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};

const columns: ColumnsType<{}> = [
  {
    title: "No.",
    key: "index",
    dataIndex: "index",
  },
  {
    title: "账号",
    key: "username",
    dataIndex: "username",
  },
  {
    title: "密码",
    key: "password",
    dataIndex: "password",
  },

  {
    title: "操作",
    key: "option",
    render: (v, record) => [
      <a key="editable" onClick={() => {}}>
        编辑
      </a>,
      <a target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <TableDropdown
        key="actionGroup"
        onSelect={() => {}}
        menus={[
          { key: "copy", name: "复制" },
          { key: "delete", name: "删除" },
        ]}
      />,
    ],
  },
];

const ListPage = () => {
  const [tableDataSource, setTableDataSource]: any = useState([]);

  useEffect(() => {
    const dataSource = userData.data;

    setTableDataSource(dataSource);
  }, []);

  return <Table dataSource={tableDataSource} columns={columns} />;
};

export default ListPage;
