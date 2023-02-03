import express from 'express';

import auth from '../middleware/auth.js';
import userRouter from './userRouter.js';
import memoryRouter from './memoryRouter.js';

const router = express.Router();

router.get('/', (req, res) => res.send('Page not found.'));
router.use('/user', userRouter);
router.use('/memory', auth, memoryRouter);

export default router;
