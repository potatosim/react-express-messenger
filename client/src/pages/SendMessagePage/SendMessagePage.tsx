import { PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification } from 'antd';
import type { RuleObject } from 'antd/es/form';
import { useState } from 'react';
import {
  isValidationError,
  postMessage,
} from '../../services/postMessage.mutation';

export interface IFormValues {
  name: string;
  phone: string;
  message: string;
}
const BY_PHONE_REGEX =
  /^(?:\+375|80)[\s-]?(?:17|25|29|33|44)[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;

const validatePhone = (_: RuleObject, value: string) => {
  if (!value) {
    return Promise.reject(new Error('Please,enter phone number'));
  }
  const v = value.replace(/\s+/g, '');
  if (BY_PHONE_REGEX.test(v)) {
    return Promise.resolve();
  }
  return Promise.reject(
    new Error('Use the Belarusian phone format — +375XXxxxxxxx or 80XXxxxxxxx.')
  );
};

const SendMessagePage = () => {
  const [form] = Form.useForm<IFormValues>();
  const [isLoading, setIsLoading] = useState(false);

  const [api, contextHolder] = notification.useNotification({
    stack: {
      threshold: 1,
    },
  });

  const sendMessage = async () => {
    try {
      await form.validateFields();

      const body = form.getFieldsValue();

      setIsLoading(true);
      postMessage({
        body,
        onSuccess: (data) => {
          form.resetFields();
          api.success({
            message: `${data.name}, Your message has been received!`,
          });
        },
        onError: (err) => {
          if (isValidationError(err)) {
            err.response?.data.errors.map((error) => {
              api.error({
                message: error.msg,
              });
            });
            return;
          }
          api.error({
            message: 'Something went wrong!',
          });
        },
        onFinish: () => setIsLoading(false),
      });
    } catch {
      api.error({
        message: 'Validation Error!',
      });
    }
  };

  return (
    <div className="relative w-full">
      <Form
        layout="vertical"
        form={form}
        name="contact"
        scrollToFirstError
        style={{ width: '60%', margin: '0 auto' }}>
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: 'Please, enter name' },
            { min: 2, message: 'Minimum 2 chars' },
          ]}>
          <Input prefix={<UserOutlined />} placeholder="Name" />
        </Form.Item>
        <Form.Item
          label="Phone "
          name="phone"
          required
          rules={[{ validator: validatePhone }]}>
          <Input prefix={<PhoneOutlined />} placeholder="+37529*******" />
        </Form.Item>
        <Form.Item
          label="Message"
          name="message"
          rules={[
            { required: true, message: 'Please, enter message' },
            { min: 2, message: 'Minimum 2 chars' },
          ]}>
          <Input.TextArea rows={4} placeholder="Type your message..." />
        </Form.Item>
        <Form.Item>
          <Button
            disabled={isLoading}
            onClick={sendMessage}
            variant="solid"
            color="volcano"
            htmlType="submit">
            Send
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
    </div>
  );
};

export const Component = SendMessagePage;
