import { isValidObjectId } from 'mongoose';

import Api400 from '../errors/Api400.js';

export default function checkValidId(req, res, next) {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) throw new Api400('Invalid ID.');

    next();
  } catch (error) {
    next(error);
  }
}
