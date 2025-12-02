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

// Admin only routes
orderRouter.route('/').get(authenticateToken, checkAdmin, getAllOrders);

orderRouter
  .route('/:id') // Get order by id with authentication
  .get(authenticateToken, checkAdmin, getOrdersById)
  .put(putOrder)
  .delete(deleteOrder);

orderRouter
  .route('/:id/details')
  .get(authenticateToken, checkAdmin, getOrderDetails);

orderRouter.route('/user/:userId').get(getUsersOrders);

export default orderRouter;
