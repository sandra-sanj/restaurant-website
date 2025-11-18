import express from 'express';
import foodMenuRouter from './food-menu/food-menu-router.js';
import userRouter from './user/user-router.js';
import authRouter from './auth/auth-router.js';

const router = express.Router();

// bind base url to routers
router.use('/menu', foodMenuRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);

export default router;
