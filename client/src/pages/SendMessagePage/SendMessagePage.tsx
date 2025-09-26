import { PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, notification } from 'antd';
import { useState } from 'react';

import { createMessage, type IMessageDto } from './config';
import { notifyRequestErrors } from '@/utils/requestHelpers';
import { phoneValidationRule } from '@/utils/validationHelpers';

const SendMessagePage = () => {
  const [form] = Form.useForm<IMessageDto>();
  const [isLoading, setIsLoading] = useState(false);

  const [api, contextHolder] = notification.useNotification({
    stack: {
      threshold: 1,
    },
  });

  const sendMessage = async (formData: IMessageDto) => {
    try {
      setIsLoading(true);

      const { data } = await createMessage(formData);

      api.success({
        message: `${data.name}, Your message has been received!`,
      });

      form.resetFields();
    } catch (err) {
      notifyRequestErrors(err, api);
    } finally {
      setIsLoading(false);
    }
  };

  const handleValidationFailed = () => {
    api.error({
      message: 'Validation Error!',
    });
  };

  return (
    <div className="relative w-full">
      <Form
        layout="vertical"
        form={form}
        name="contact"
        scrollToFirstError
        style={{ width: '60%', margin: '0 auto' }}
        onFinish={sendMessage}
        onFinishFailed={handleValidationFailed}>
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
          rules={[phoneValidationRule()]}>
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
