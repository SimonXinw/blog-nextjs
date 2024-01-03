import React, { useEffect, useState } from "react";
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { Button, Dropdown, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRequest } from "ahooks";
import * as services from "./services";
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

// 定义getColumns函数的参数类型
interface GetColumnsParamsType {
  remove: (id: number) => void; // 假设remove函数接收id为参数，并且没有返回值
}

// 定义列配置的类型
interface ColumnType {
  title: string;
  key: string;
  dataIndex?: string;
  render?: (value: any, record: { id: number }) => React.ReactNode[];
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
      render: (v, record) => [
        <a key="editable" onClick={() => {}}>
          编辑
        </a>,
        <a
          href="javascript:void(0)"
          key="delete"
          onClick={() => {
            remove(record?.id);
          }}
        >
          删除
        </a>,
        ,
      ],
    },
  ];
};

const ListPage = () => {
  const users = userData.data;

  const [tableDataSource, setTableDataSource]: any = useState([]);

  const {
    loading: removeLoading,
    data: removeRes,
    run: remove,
  } = useRequest(services.remove, { manual: true });

  useEffect(() => {
    setTableDataSource(users);
  }, [removeRes]);

  return (
    <Table
      loading={removeLoading}
      dataSource={tableDataSource}
      columns={getColumns({ remove })}
    />
  );
};

export default ListPage;
