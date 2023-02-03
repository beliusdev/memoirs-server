import BaseError from './BaseError.js';
import httpStatusCodes from '../utils/httpStatusCodes.js';

export default class Api404 extends BaseError {
  constructor(
    message,
    statusCode = httpStatusCodes.NOT_FOUND,
    isOperational = true
  ) {
    super(statusCode, isOperational, message);
  }
}
