"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button, Dropdown, Space, Table } from "antd";
import { TableLayout } from "@/components";
import type { ColumnsType } from "antd/es/table";
import { useRequest } from "ahooks";
import * as services from "@/services";
import userData from "@/constants/api/user.json";

// 定义getColumns函数的参数类型
interface GetColumnsParamsType {
  remove?: (id: number) => void; // 假设remove函数接收id为参数，并且没有返回值
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
            <a href="javascript:void(0)" key="editable" onClick={() => {}}>
              编辑
            </a>
            <a href="javascript:void(0)" key="delete" onClick={() => {}}>
              删除
            </a>
          </Space>
        );
      },
    },
  ];
};

const ListPage = () => {
  const countRef = useRef(0);
  const users = userData.data;

  const [tableDataSource, setTableDataSource]: any = useState([]);

  const { loading, data, run } = useRequest(services.findList, {
    manual: true,
  });

  const onTestList = async () => {
    try {
      const res = await services.findList();

      setTableDataSource(res?.data);
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    countRef.current++;
  });

  return (
    <TableLayout>
      <TableLayout.Header>
        <Button onClick={onTestList}>请求</Button>
      </TableLayout.Header>

      <TableLayout.Body>
        <Table
          loading={loading}
          dataSource={tableDataSource}
          columns={getColumns({})}
        />
      </TableLayout.Body>
    </TableLayout>
  );
};

export default ListPage;
