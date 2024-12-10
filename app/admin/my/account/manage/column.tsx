"use client";
import React from "react";
import { Button, Space } from "antd";

// 定义getColumns函数的参数类型
interface GetColumnsParamsType {
  remove: (id: number) => void;
  edit: (record: any) => void;
}

// 定义列配置的类型
interface ColumnType {
  title: string;
  key: string;
  dataIndex?: string;
  render?: (
    value: any,
    record: { id: number; [key: string]: any }
  ) => React.ReactNode | string | undefined | null;
}

export const getColumns = ({
  remove,
  edit,
}: GetColumnsParamsType): ColumnType[] => {
  return [
    {
      title: "No.",
      key: "id",
      dataIndex: "id",
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
      render: (v, record) => {
        return (
          <Space size="middle">
            <Button
              type="link"
              key="editable"
              onClick={() => edit(record)} // 打开编辑弹窗
            >
              编辑
            </Button>
            <Button
              type="link"
              danger
              key="delete"
              onClick={() => remove(record?.id)} // 删除
            >
              删除
            </Button>
          </Space>
        );
      },
    },
  ];
};
