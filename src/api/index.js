import express from 'express';
import foodMenuRouter from './food-menu/food-menu-router.js';

import orderRouter from './orders/order-router.js';

const router = express.Router();

// bind base url to routers
router.use('/menu', foodMenuRouter);
//router.use("/user", userRouter);

router.use('/orders', orderRouter);

export default router;
