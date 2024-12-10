"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Space,
  Table,
  Row,
  Col,
  Modal,
  Form,
  message,
} from "antd";
import { useRequest } from "ahooks";
import * as services from "@/services";
import { getColumns } from "./column";

const ListPage = () => {
  const [tableDataSource, setTableDataSource]: any = useState([]); // 初始化为 users 数据
  const [filterUsername, setFilterUsername] = useState<string>(""); // 筛选字段
  const [filteredData, setFilteredData] = useState([]); // 筛选后的数据

  // 编辑弹窗状态
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null); // 当前正在编辑的记录

  const [messageApi, contextHolder] = message.useMessage();

  const {
    loading: removeLoading,
    data: removeRes,
    run: remove,
  } = useRequest(services.remove, {
    manual: true,
  });

  const {
    loading,
    data,
    run: triggerTable,
  } = useRequest(services.getList, {
    manual: false,
  });

  const { loading: updateLoading, run: updateUser } = useRequest(
    async (updatedRecord) => {
      // 调用更新接口
      const response = await fetch("/user/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(updatedRecord),
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.data || "更新失败");
      return result.data;
    },
    { manual: true }
  );

  useEffect(() => {
    if (!removeRes) return;

    triggerTable();
  }, [removeRes]);

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
    triggerTable();
  };

  const handleReset = () => {
    setFilterUsername("");
    setFilteredData(tableDataSource);
  };

  // 编辑逻辑
  const handleEdit = (record: any) => {
    setEditingRecord(record); // 设置当前编辑记录
    setIsModalOpen(true); // 打开弹窗
  };

  const onFinish = async (values: any) => {
    try {
      const updatedRecord = { ...editingRecord, ...values }; // 合并原有记录和新值
      await updateUser(updatedRecord); // 调用更新 API

      // 更新表格数据
      setTableDataSource((prev: any) =>
        prev.map((item: any) =>
          item.id === updatedRecord.id ? updatedRecord : item
        )
      );

      messageApi.success("更新成功");
      setIsModalOpen(false); // 关闭弹窗
    } catch (error: any) {
      messageApi.error(error.message || "更新失败");
    }
  };

  return (
    <div>
      {contextHolder}
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
        loading={loading}
        dataSource={data}
        columns={getColumns({ remove: handleRemove, edit: handleEdit })}
        rowKey="id" // 防止表格警告
      />

      {/* 编辑弹窗 */}
      <Modal
        title="编辑用户"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={editingRecord}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            label="账号"
            rules={[{ required: true, message: "请输入账号" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={updateLoading}>
                保存
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>取消</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ListPage;
