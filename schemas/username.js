import { body } from 'express-validator';

export default body('username')
  .trim()
  .isLength({ min: 3 })
  .withMessage('Username must be at least 3 characters.');
