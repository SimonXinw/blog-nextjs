"use client";
import React, { useEffect, useState } from "react";
import { Button, Input, Space, Table, Row, Col } from "antd";
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
  const [filterUsername, setFilterUsername] = useState<string>(""); // 筛选字段
  const [filteredData, setFilteredData] = useState(users); // 筛选后的数据

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

  useEffect(() => {
    if (!filterUsername) {
      setFilteredData(tableDataSource);
    } else {
      const filtered = tableDataSource.filter((item: any) =>
        item.username.toLowerCase().includes(filterUsername.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [filterUsername, tableDataSource]);

  const handleRemove = (id: number) => {
    remove(id); // 调用 remove API，传入 id
  };

  const handleSearch = () => {
    const filtered = tableDataSource.filter((item: any) =>
      item.username.toLowerCase().includes(filterUsername.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleReset = () => {
    setFilterUsername("");
    setFilteredData(tableDataSource);
  };

  return (
    <div>
      {/* 筛选区域 */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Input
            placeholder="请输入用户名进行筛选"
            value={filterUsername}
            onChange={(e) => setFilterUsername(e.target.value)}
          />
        </Col>
        <Col>
          <Button type="primary" onClick={handleSearch}>
            查询
          </Button>
        </Col>
        <Col>
          <Button onClick={handleReset}>重置</Button>
        </Col>
      </Row>

      {/* 表格展示 */}
      <Table
        loading={removeLoading}
        dataSource={filteredData}
        columns={getColumns({ remove: handleRemove })}
        rowKey="id" // 防止表格警告
      />
    </div>
  );
};

export default ListPage;
