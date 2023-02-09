import { body } from 'express-validator';
import User from '../models/user.js';

export const passwordValidation = body(
  'password',
  'Пароль должен быть более 2-х символов'
)
  .trim()
  .isLength({
    min: 3,
  });

export const emailValidation = body('email', 'Некорректный email')
  .isEmail()
  .normalizeEmail();

export default [
  body('email', 'Некорректный email')
    .isEmail()
    .normalizeEmail()
    .custom(async (value) => {
      if (await User.exists({ email: value })) {
        return Promise.reject(`Пользователь ${value} уже существует`);
      }

      return true;
    }),
  body('name', 'Имя должно быть более 2-х символов')
    .trim()
    .isLength({ min: 3 }),
  passwordValidation,
];
