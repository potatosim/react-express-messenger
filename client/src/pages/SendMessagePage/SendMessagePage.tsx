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
    return Promise.reject(new Error('Пожалуйста, укажите телефон'));
  }
  const v = value.replace(/\s+/g, '');
  if (BY_PHONE_REGEX.test(v)) {
    return Promise.resolve();
  }
  return Promise.reject(
    new Error(
      'Телефон должен быть в белорусском формате: +375XXxxxxxxx или 80XXxxxxxxx'
    )
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
            message: `${data.name}, Ваше сообщение получено!`,
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
            message: 'Что-то пошло не так!',
          });
        },
        onFinish: () => setIsLoading(false),
      });
    } catch {
      api.error({
        message: 'Ошибка валидации',
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
          label="Имя"
          name="name"
          rules={[
            { required: true, message: 'Пожалуйста, введите имя' },
            { min: 2, message: 'Минимум 2 символа' },
          ]}>
          <Input prefix={<UserOutlined />} placeholder="Имя" />
        </Form.Item>
        <Form.Item
          label="Телефон"
          name="phone"
          rules={[{ validator: validatePhone }]}>
          <Input prefix={<PhoneOutlined />} placeholder="+37529*******" />
        </Form.Item>
        <Form.Item
          label="Сообщение"
          name="message"
          rules={[
            { required: true, message: 'Пожалуйста, введите сообщение' },
            { min: 2, message: 'Минимум 2 символа' },
          ]}>
          <Input.TextArea rows={4} placeholder="Ваше сообщение" />
        </Form.Item>
        <Form.Item>
          <Button
            disabled={isLoading}
            onClick={sendMessage}
            variant="solid"
            color="volcano"
            htmlType="submit">
            Отправить
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
    </div>
  );
};

export const Component = SendMessagePage;
