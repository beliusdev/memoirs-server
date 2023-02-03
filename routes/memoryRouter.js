import express from 'express';

import {
  createMemory,
  deleteMemory,
  editMemory,
  getUserMemories,
  searchMemories,
} from '../controllers/memory.js';
import checkMemoryAccess from '../middleware/checkMemoryAccess.js';
import checkValidId from '../middleware/checkValidId.js';

import body from '../schemas/body.js';
import title from '../schemas/title.js';
import checkValidationErrors from '../middleware/checkValidationErrors.js';

const memoryRouter = express.Router();

memoryRouter.post('/', [title, body], checkValidationErrors, createMemory);

memoryRouter.get('/', getUserMemories);
memoryRouter.get('/search', searchMemories);

memoryRouter.patch(
  '/:id',
  checkValidId,
  checkMemoryAccess,
  [title, body],
  checkValidationErrors,
  editMemory
);

memoryRouter.delete('/:id', checkValidId, checkMemoryAccess, deleteMemory);

export default memoryRouter;
