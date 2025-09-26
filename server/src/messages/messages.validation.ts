import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

const BY_PHONE_REGEX =
  /^(?:\+375|80)[\s-]?(?:17|25|29|33|44)[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;
export const createMessageValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2 })
    .withMessage('Name must be at least 2 symbols'),
  body('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone is required')
    .matches(BY_PHONE_REGEX)
    .withMessage('Incorrect phone format'),
  body('message')
    .trim()
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage('Message must be at least 2 symbols')
    .isLength({ max: 100 })
    .withMessage('Message is too long, 100 symbols maximum'),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];
