import BaseError from './BaseError.js';
import httpStatusCodes from '../utils/httpStatusCodes.js';

export default class Api400 extends BaseError {
  constructor(
    message,
    statusCode = httpStatusCodes.BAD_REQUEST,
    isOperational = true
  ) {
    super(statusCode, isOperational, message);
  }
}
