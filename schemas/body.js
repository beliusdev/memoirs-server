import { body } from 'express-validator';

export default body('body')
  .trim()
  .isLength({ min: 6 })
  .withMessage('Body must be at least 6 characters.');
