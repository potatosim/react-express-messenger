import { PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import type { RuleObject } from 'antd/es/form';

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
  const [form] = Form.useForm();

  return (
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
        <Button variant="solid" color="volcano" htmlType="submit">
          Отправить
        </Button>
      </Form.Item>
    </Form>
  );
};

export const Component = SendMessagePage;
