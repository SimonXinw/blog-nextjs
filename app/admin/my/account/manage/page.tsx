"use client";
import React, { useEffect, useState } from "react";
import { Button, Dropdown, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRequest } from "ahooks";
import * as services from "@/services";
import userData from "@/constants/api/user.json";

// 定义getColumns函数的参数类型
interface GetColumnsParamsType {
  remove: (id: number) => void; // 假设remove函数接收id为参数，并且没有返回值
}

// 定义列配置的类型
interface ColumnType {
  title: string;
  key: string;
  dataIndex?: string;
  render?: (
    value: any,
    record: { id: number }
  ) => React.ReactNode | string | undefined | null;
}

const getColumns = ({ remove }: GetColumnsParamsType): ColumnType[] => {
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
            <button key="editable" onClick={() => {}}>
              编辑
            </button>
            <button
              key="delete"
              onClick={() => {
                remove(record?.id);
              }}
            >
              删除
            </button>
          </Space>
        );
      },
    },
  ];
};

const ListPage = () => {
  const users = userData.data;

  const [tableDataSource, setTableDataSource]: any = useState(users); // 初始化为 users 数据

  const {
    loading: removeLoading,
    data,
    run: remove,
  } = useRequest(services.remove, {
    manual: true,
  });

  useEffect(() => {
    if (!data) return;

    setTableDataSource((prev: any) =>
      prev.filter((item: { id: number }) => item.id !== Number(data.data))
    );
  }, [data]);

  const handleRemove = (id: number) => {
    remove(id); // 调用 remove API，传入 id
  };

  return (
    <Table
      loading={removeLoading}
      dataSource={tableDataSource}
      columns={getColumns({ remove: handleRemove })}
    />
  );
};

export default ListPage;
