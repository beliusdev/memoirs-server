import jwt from 'jsonwebtoken';

import User from '../models/User.js';
import Api401 from '../errors/Api401.js';
import Api404 from '../errors/Api404.js';

export default async function auth(req, res, next) {
  try {
    let token =
      req.headers.authorization &&
      req.headers.authorization.split('Bearer ')[1];

    if (!token) throw new Api401('Not authorized.');

    let { id } = jwt.decode(token);
    let user = await User.findById(id);
    if (!user) throw new Api404('User not found.');

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
