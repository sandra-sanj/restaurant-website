import express from 'express';

import {
  getAllOrders,
  getOrderDetails,
  getOrdersById,
  getUsersOrders,
  postOrder,
  putOrder,
  deleteOrder,
} from './order-controller.js';

import {authenticateToken} from '../../middlewares/authentication.js';
import {checkAdmin} from '../../middlewares/check-admin.js';

const orderRouter = express.Router();

// Public route (no auth required)
orderRouter.route('/').post(postOrder); // Guest can order

// Protected route (user must be logged in), users own orders
orderRouter.route('/user/:userId').get(authenticateToken, getUsersOrders);

// Admin only routes (admin can view all orders)
orderRouter.route('/').get(authenticateToken, checkAdmin, getAllOrders);

//Admin oly routes for specific order
orderRouter
  .route('/:id')
  .get(authenticateToken, checkAdmin, getOrdersById)
  .put(authenticateToken, checkAdmin, putOrder)
  .delete(authenticateToken, checkAdmin, deleteOrder);

orderRouter
  .route('/:id/details')
  .get(authenticateToken, checkAdmin, getOrderDetails);

export default orderRouter;
