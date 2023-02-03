import { body } from 'express-validator';

export default function password(isNew) {
  return body(isNew ? 'newPassword' : 'password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters.');
}
