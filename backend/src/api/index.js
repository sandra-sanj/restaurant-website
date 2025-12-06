import express from 'express';
import foodMenuRouter from './food-menu/food-menu-router.js';
import userRouter from './user/user-router.js';
import authRouter from './auth/auth-router.js';

import orderRouter from './orders/order-router.js';
import allergenRouter from './food-menu/allergen-router.js';
import categoryRouter from './food-menu/category-router.js';
import lunchRouter from './food-menu/lunch-special-router.js';
import weatherRouter from './weather-api/weather-router.js';

const router = express.Router();

// bind base url to routers
router.use('/menu', foodMenuRouter);
router.use('/users', userRouter);
router.use('/auth', authRouter);

router.use('/orders', orderRouter);
router.use('/allergens', allergenRouter);
router.use('/categories', categoryRouter);
router.use('/lunch', lunchRouter);
router.use('/weather', weatherRouter);

export default router;
