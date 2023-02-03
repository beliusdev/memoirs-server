import { body } from 'express-validator';

export default body('title')
  .trim()
  .isLength({ min: 3 })
  .withMessage('Title must be at least 3 characters.');
