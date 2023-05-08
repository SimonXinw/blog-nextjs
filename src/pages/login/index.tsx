import React, { useState } from 'react';
import { PageHeader } from '@/components';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Radio, Checkbox } from 'antd';
import styles from './index.module.css';

const Login: React.FC = () => {
  const [form] = Form.useForm();

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  };

  const itemLayout = {
    wrapperCol: { span: 0, offset: 5 },
  };

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div className={styles['login-page']}>
      <PageHeader></PageHeader>
      <div className={styles['form-wrap']}>
        <Form
          {...layout}
          form={form}
          onValuesChange={() => {}}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ width: 460 }}
          validateMessages={validateMessages}
        >
          <Form.Item {...itemLayout}>
            <Radio.Group>
              <Radio.Button value="account">账号</Radio.Button>
              <Radio.Button value="iphoneNumber">手机号</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item label="密码" name="password">
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
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: '100%' }}
            >
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
