"use client";
import React, { useState } from "react";
import { useRequest } from "ahooks";
import { Button, Form, Input, Radio, message } from "antd";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ImageBg } from "@/components";
import * as services from "@/services";
import styles from "./index.module.css";

const Register: React.FC = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loginType, setLoginType] = useState("account");
  const router = useRouter();
  /**
   * @验证信息
   */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  /**
   * @Form 布局
   */
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  /**
   * @FormItem 布局
   */
  const { loading, run } = useRequest(services.register, {
    manual: true,
    onSuccess: (res: any) => {
      if (!res?.success) return;

      router.push("/admin/my/account/manage");

      messageApi.open({
        type: "success",
        content: "注册成功!",
      });
    },
  });

  /**
   * @表单字段改变
   */
  const onFormValuesChange = ({ loginType }: any) => {
    setLoginType(loginType);
  };

  return (
    <div className={styles["login-page"]}>
      <ImageBg />
      {contextHolder}
      <div className={styles["form-wrap"]}>
        <Form
          {...layout}
          initialValues={{ loginType, remember: true }}
          form={form}
          layout="vertical"
          name="normal_login"
          className="login-form"
          onValuesChange={onFormValuesChange}
          validateMessages={validateMessages}
          onFinish={run}
        >
          <Form.Item name="loginType">
            <Radio.Group>
              <Radio.Button value="account">账号</Radio.Button>
              <Radio.Button value="iphoneNumber">手机号</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button
              loading={loading}
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
            >
              Register
            </Button>
            <div>
              Or
              <Link style={{ marginLeft: 4, color: "#1677ff" }} href="/login">
                Log in now!
              </Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
