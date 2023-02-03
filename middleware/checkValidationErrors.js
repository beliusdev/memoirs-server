import { validationResult } from 'express-validator';

import Api400 from '../errors/Api400.js';

export default function checkValidationErrors(req, res, next) {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    errors = errors.errors && errors.errors.map((err) => err.msg);
    const error = new Api400(errors);
    error.message = error.message.split(',');
    throw error;
  }

  next();
}
