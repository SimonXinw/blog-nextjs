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
  Tag,
  Select,
  DatePicker,
} from "antd";
import { useRequest } from "ahooks";
import {
  addTodo,
  getTodosByUser,
  updateTodo,
  deleteTodoPermanently,
  softDeleteTodo,
} from "@/services/todolist";
import dayjs from "dayjs";

const { Option } = Select;

const TodoListPage = () => {
  const [tableDataSource, setTableDataSource] = useState<any[]>([]);
  const [filterKeyword, setFilterKeyword] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<any>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const { loading, run: fetchTodos } = useRequest(() => getTodosByUser(1), {
    manual: true,
    onSuccess: (data) => {
      setTableDataSource(data || []);
      setFilteredData(data || []);
    },
    onError: () => messageApi.error("加载待办事项失败"),
  });

  const { loading: addingTodo, run: addTodoRequest } = useRequest(addTodo, {
    manual: true,
    onSuccess: () => {
      messageApi.success("待办事项添加成功");
      fetchTodos();
      setIsModalOpen(false);
    },
    onError: (error) => messageApi.error(error.message || "添加失败"),
  });

  const { loading: updatingTodo, run: updateTodoRequest } = useRequest(
    updateTodo,
    {
      manual: true,
      onSuccess: () => {
        messageApi.success("待办事项更新成功");
        fetchTodos();
        setIsModalOpen(false);
      },
      onError: (error) => messageApi.error(error.message || "更新失败"),
    }
  );

  const { run: deleteTodoRequest } = useRequest(deleteTodoPermanently, {
    manual: true,
    onSuccess: () => {
      messageApi.success("待办事项删除成功");
      fetchTodos();
    },
    onError: () => messageApi.error("删除失败"),
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    if (!filterKeyword) {
      setFilteredData(tableDataSource);
    } else {
      const filtered = tableDataSource.filter((item) =>
        item.title.toLowerCase().includes(filterKeyword.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [filterKeyword, tableDataSource]);

  const handleRemove = (id: number) => {
    deleteTodoRequest(id);
  };

  const handleSearch = () => {
    // Triggered when the search button is clicked
  };

  const handleReset = () => {
    setFilterKeyword("");
    setFilteredData(tableDataSource);
  };

  const handleEdit = (record: any) => {
    setEditingRecord(record);
    setIsModalOpen(true);
  };

  const onFinish = (values: any) => {
    if (editingRecord) {
      updateTodoRequest(editingRecord.id, values);
    } else {
      addTodoRequest({
        user_id: 1,
        title: values.title,
        description: values.description,
        priority: values.priority,
        due_date: values.due_date,
        tags: [],
      });
    }
  };

  const columns = [
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <b>{text}</b>,
    },
    {
      title: "优先级",
      dataIndex: "priority",
      key: "priority",
      render: (priority: string) => {
        const color =
          priority === "high"
            ? "red"
            : priority === "medium"
            ? "orange"
            : "green";
        return <Tag color={color}>{priority}</Tag>;
      },
    },
    {
      title: "截止日期",
      dataIndex: "due_date",
      key: "due_date",
      render: (date: string) =>
        date ? dayjs(date).format("YYYY-MM-DD") : "无",
    },
    {
      title: "操作",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Button type="link" danger onClick={() => handleRemove(record.id)}>
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {contextHolder}
      {/* 筛选区域 */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={8}>
          <Input
            placeholder="请输入标题关键字"
            value={filterKeyword}
            onChange={(e) => setFilterKeyword(e.target.value)}
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
        dataSource={filteredData}
        columns={columns}
        rowKey="id"
      />

      {/* 弹窗 */}
      <Modal
        title={editingRecord ? "编辑待办事项" : "新增待办事项"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          initialValues={editingRecord || { priority: "low" }}
          onFinish={onFinish}
        >
          <Form.Item
            name="title"
            label="标题"
            rules={[{ required: true, message: "请输入标题" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="描述">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item
            name="priority"
            label="优先级"
            rules={[{ required: true, message: "请选择优先级" }]}
          >
            <Select>
              <Option value="low">低</Option>
              <Option value="medium">中</Option>
              <Option value="high">高</Option>
            </Select>
          </Form.Item>
          <Form.Item name="due_date" label="截止日期">
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                loading={addingTodo || updatingTodo}
              >
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

export default TodoListPage;
