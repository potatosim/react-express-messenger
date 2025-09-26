import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const BY_PHONE_REGEX =
  /^(?:\+375|80)[\s-]?(?:17|25|29|33|44)[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
export const createMessageValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Имя обязательно')
    .isLength({ min: 2 })
    .withMessage('Имя должно быть минимум 2 символа'),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Телефон обязателен')
    .matches(BY_PHONE_REGEX)
    .withMessage('Некорректный телефон'),
  body('message')
    .trim()
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage('Cообщение должно быть минимум 2 символа')
    .isLength({ max: 100 })
    .withMessage('Сообщение не должно превышать 100 символов'),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];
