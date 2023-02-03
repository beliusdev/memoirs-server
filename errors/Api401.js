import BaseError from './BaseError.js';
import httpStatusCodes from '../utils/httpStatusCodes.js';

export default class Api401 extends BaseError {
  constructor(
    message,
    statusCode = httpStatusCodes.UNAUTHORIZED,
    isOperational = true
  ) {
    super(statusCode, isOperational, message);
  }
}
