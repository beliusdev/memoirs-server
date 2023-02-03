import express from 'express';

import auth from '../middleware/auth.js';

import {
  changePassword,
  deleteUser,
  editUser,
  getUser,
  login,
  register,
} from '../controllers/user.js';
import username from '../schemas/username.js';
import password from '../schemas/password.js';
import checkValidationErrors from '../middleware/checkValidationErrors.js';

const userRouter = express.Router();

userRouter.post(
  '/register',
  [username, password()],
  checkValidationErrors,
  register
);
userRouter.post('/login', login);

userRouter.get('/', auth, getUser);

userRouter.patch('/edit', auth, [username], checkValidationErrors, editUser);
userRouter.patch(
  '/password',
  auth,
  [password(true)],
  checkValidationErrors,
  changePassword
);

userRouter.delete('/', auth, deleteUser);

export default userRouter;
