import React, { useState } from "react";
import { PageHeader } from "@/components";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Radio, Checkbox, message } from "antd";
import Router from "next/router";
import { ImageBg } from "@/components";
import * as Service from "@/services";
import styles from "./index.module.css";

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loginType, setLoginType] = useState("account");
  const [submitLoading, setSubmitLoading] = useState(false);

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
  const itemLayout = {
    wrapperCol: { span: 0, offset: 5 },
  };

  /**
   * @提交
   */
  const onSubmit = async (values: any) => {
    setSubmitLoading(true);

    try {
      const params = {
        ...values,
      };

      const res: any = await Service.creatUser(params);

      console.log("res >>>>>>>>>", res);

      if (res?.success) {
        Router.push("/admin");

        messageApi.open({
          type: "success",
          content: "登陆成功!",
        });
        setSubmitLoading(false);
      }
    } catch (e) {
      setSubmitLoading(false);
      console.warn(e);
    }
  };

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
      <PageHeader></PageHeader>
      <div className={styles["form-wrap"]}>
        <Form
          {...layout}
          initialValues={{ loginType: "account", remember: true }}
          style={{ width: 460 }}
          form={form}
          name="normal_login"
          className="login-form"
          onValuesChange={onFormValuesChange}
          validateMessages={validateMessages}
          onFinish={onSubmit}
        >
          <Form.Item {...itemLayout} name="loginType">
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
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item {...itemLayout}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item {...itemLayout}>
            <Button
              loading={submitLoading}
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
            >
              Log in
            </Button>
            Or
            <a style={{ marginLeft: 4, color: "#1677ff" }} href="">
              register now!
            </a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
