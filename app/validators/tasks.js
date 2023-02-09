import { body } from 'express-validator';

export default [
  body('name')
    .isLength({ min: 3 })
    .withMessage('Название должно быть минимум из 3 символов')
    .isString()
    .withMessage('Название должно быть строкой'),
  body('description')
    .isLength({ min: 10 })
    .withMessage('Название должно быть минимум из 10 символов')
    .isString()
    .withMessage('Описание должно быть строкой'),
  body('count')
    .isLength({ min: 1 })
    .withMessage('Количество должно быть минимум 1')
    .isNumeric()
    .withMessage('Количество должно быть числом'),
  body('complexity')
    .isIn(['easy', 'medium', 'high'])
    .withMessage('Сложность должна быть "easy", "medium" или "high"'),
  body('completed', 'Статус "Выполнено" должно быть true или undefined')
    .isBoolean()
    .optional({ nullable: true }),
];
