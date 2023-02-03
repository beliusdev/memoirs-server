import Memory from '../models/Memory.js';

import Api404 from '../errors/Api404.js';
import Api401 from '../errors/Api401.js';

export default async function checkMemoryAccess(req, res, next) {
  try {
    const user = req.user;
    const { id } = req.params;
    const memory = await Memory.findById(id);

    if (!memory) throw new Api404('Memory not found.');

    if (memory.userId.toString() !== user._id.toString())
      throw new Api401('Access denied.');

    next();
  } catch (error) {
    next(error);
  }
}
