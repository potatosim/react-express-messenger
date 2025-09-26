import type { Rule } from 'antd/es/form';

const BY_PHONE_REGEX =
  /^(?:\+375|80)[\s-]?(?:17|25|29|33|44)[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;

export const phoneValidationRule = (): Rule => ({
  validator: (_, value: string) => {
    if (!value) {
      return Promise.reject(new Error('Please,enter phone number'));
    }
    const v = value.replace(/\s+/g, '');
    if (BY_PHONE_REGEX.test(v)) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error(
        'Use the Belarusian phone format — +375XXxxxxxxx or 80XXxxxxxxx.'
      )
    );
  },
});
